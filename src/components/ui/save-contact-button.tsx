"use client";

import { UserPlus } from "lucide-react";

import { cn } from "@/lib/utils";

type SaveContactButtonProps = {
  name: string;
  phone: string;
  email: string;
  title: string;
  org?: string;
  address?: string;
  className?: string;
  variant?: "light" | "dark";
};

function generateVCard({
  name,
  phone,
  email,
  title,
  org,
  address,
}: Omit<SaveContactButtonProps, "className" | "variant">) {
  const parts = name.split(" ");
  const firstName = parts[0] ?? name;
  const lastName = parts.slice(1).join(" ");

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    `N:${lastName};${firstName};;;`,
    `ORG:${org ?? "Allsberry Insurance Agency"}`,
    `TITLE:${title}`,
    `TEL;TYPE=WORK,VOICE:${phone}`,
    `EMAIL;TYPE=WORK:${email}`,
    address ? `ADR;TYPE=WORK:;;${address};;;;` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function SaveContactButton({
  name,
  phone,
  email,
  title,
  org,
  address,
  className,
  variant = "dark",
}: SaveContactButtonProps) {
  const handleDownload = () => {
    const vcard = generateVCard({ name, phone, email, title, org, address });
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name.replace(/\s+/g, "-").toLowerCase()}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition",
        variant === "dark"
          ? "border border-white/24 text-white hover:bg-white/10"
          : "border border-gray-200 text-gray-600 hover:border-blue hover:text-blue",
        className,
      )}
    >
      <UserPlus className="h-4 w-4" />
      Save Contact
    </button>
  );
}
