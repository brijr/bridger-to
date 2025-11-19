"use client";

import { Mail, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const EMAIL = "bt@wip.ac";

export function EmailCopyButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy email");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={copyEmail}
      className={className}
      aria-label="Copy email address"
    >
      {copied ? (
        <Check className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Mail className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Copy email</span>
    </Button>
  );
}
