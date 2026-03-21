"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type PlacePrediction = {
  placeId: string;
  text: { text: string };
  structuredFormat?: {
    mainText: { text: string };
    secondaryText: { text: string };
  };
};

export type ParsedAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  fullAddress: string;
};

type AddressAutocompleteProps = {
  id: string;
  value: string;
  onChange: (address: string) => void;
  onSelect?: (address: ParsedAddress) => void;
  placeholder?: string;
  className?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

export function AddressAutocomplete({
  id,
  value,
  onChange,
  onSelect,
  placeholder,
  className,
  ...ariaProps
}: AddressAutocompleteProps) {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const sessionTokenRef = useRef(crypto.randomUUID());

  const fetchPredictions = useCallback(async (input: string) => {
    if (input.length < 3) {
      setPredictions([]);
      setIsOpen(false);
      return;
    }

    try {
      const res = await fetch("/api/places/autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input,
          sessionToken: sessionTokenRef.current,
        }),
      });

      if (!res.ok) return;

      const data = await res.json();
      const items: PlacePrediction[] = (data.suggestions ?? []).map(
        (s: { placePrediction: PlacePrediction }) => s.placePrediction,
      );

      setPredictions(items);
      setIsOpen(items.length > 0);
      setActiveIndex(-1);
    } catch {
      /* gracefully degrade to plain text input */
    }
  }, []);

  const fetchDetails = useCallback(
    async (placeId: string): Promise<ParsedAddress | null> => {
      try {
        const params = new URLSearchParams({
          placeId,
          sessionToken: sessionTokenRef.current,
        });
        const res = await fetch(`/api/places/details?${params}`);
        if (!res.ok) return null;

        const data = await res.json();
        const result: ParsedAddress = {
          street: "",
          city: "",
          state: "",
          postalCode: "",
          fullAddress: data.formattedAddress ?? "",
        };

        let streetNumber = "";
        let streetName = "";

        for (const c of data.addressComponents ?? []) {
          const types: string[] = c.types;
          if (types.includes("street_number")) streetNumber = c.longText ?? "";
          else if (types.includes("route")) streetName = c.longText ?? "";
          else if (types.includes("locality") || types.includes("sublocality_level_1"))
            result.city = c.longText ?? "";
          else if (types.includes("administrative_area_level_1"))
            result.state = c.shortText ?? "";
          else if (types.includes("postal_code"))
            result.postalCode = c.longText ?? "";
        }

        result.street = [streetNumber, streetName].filter(Boolean).join(" ");
        return result;
      } catch {
        return null;
      }
    },
    [],
  );

  const handleSelect = useCallback(
    async (prediction: PlacePrediction) => {
      const details = await fetchDetails(prediction.placeId);

      if (details) {
        onChange(details.street || details.fullAddress);
        onSelect?.(details);
      } else {
        onChange(prediction.text.text);
        onSelect?.({
          street: prediction.structuredFormat?.mainText.text ?? prediction.text.text,
          city: "",
          state: "",
          postalCode: "",
          fullAddress: prediction.text.text,
        });
      }

      setPredictions([]);
      setIsOpen(false);
      setActiveIndex(-1);
      sessionTokenRef.current = crypto.randomUUID();
    },
    [fetchDetails, onChange, onSelect],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchPredictions(val), 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || predictions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, predictions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(predictions[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
        aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
        {...ariaProps}
      />
      {isOpen && predictions.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg"
        >
          {predictions.map((p, i) => (
            <li
              key={p.placeId}
              id={`${id}-option-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={() => handleSelect(p)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`cursor-pointer px-4 py-2.5 text-sm ${
                i === activeIndex
                  ? "bg-blue-light font-semibold text-gray-900"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {p.structuredFormat ? (
                <>
                  <span className="font-medium text-gray-900">
                    {p.structuredFormat.mainText.text}
                  </span>
                  <span className="ml-1 text-gray-500">
                    {p.structuredFormat.secondaryText.text}
                  </span>
                </>
              ) : (
                p.text.text
              )}
            </li>
          ))}
          <li className="border-t border-gray-100 px-4 py-2">
            <Image
              src="https://developers.google.com/static/maps/documentation/images/powered_by_google_on_white.png"
              alt="Powered by Google"
              width={120}
              height={14}
              className="h-3.5 w-auto"
              unoptimized
            />
          </li>
        </ul>
      )}
    </div>
  );
}
