"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const RADAR_KEY = process.env.NEXT_PUBLIC_RADAR_PUBLISHABLE_KEY ?? "";

type Suggestion = {
  formattedAddress: string;
  postalCode: string;
};

type AddressAutocompleteProps = {
  id: string;
  value: string;
  onChange: (address: string) => void;
  onSelect?: (suggestion: Suggestion) => void;
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
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 3 || !RADAR_KEY) {
      setSuggestions([]);
      return;
    }

    try {
      const params = new URLSearchParams({
        query,
        country: "US",
        layers: "address",
        limit: "5",
      });

      const res = await fetch(
        `https://api.radar.io/v1/search/autocomplete?${params}`,
        { headers: { Authorization: RADAR_KEY } },
      );

      if (!res.ok) return;

      const data = await res.json();
      setSuggestions(
        (data.addresses ?? []).map((a: Record<string, string>) => ({
          formattedAddress: a.formattedAddress,
          postalCode: a.postalCode,
        })),
      );
      setIsOpen(true);
    } catch {
      /* gracefully degrade to plain text input */
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const handleSelect = (suggestion: Suggestion) => {
    onChange(suggestion.formattedAddress);
    onSelect?.(suggestion);
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
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

  // No API key = render plain input with browser autocomplete
  if (!RADAR_KEY) {
    return (
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
        autoComplete="street-address"
        {...ariaProps}
      />
    );
  }

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
      {isOpen && suggestions.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
        >
          {suggestions.map((s, i) => (
            <li
              key={s.formattedAddress}
              id={`${id}-option-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={() => handleSelect(s)}
              className={`cursor-pointer px-4 py-2.5 text-sm ${
                i === activeIndex ? "bg-blue-light font-semibold text-gray-900" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {s.formattedAddress}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
