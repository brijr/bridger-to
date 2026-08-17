"use client";

import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const EMAIL = "bt@wip.is";

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
      aria-label="Copy email address"
      className={cn(className, "z-50")}
    >
      <span className="relative size-[1.2rem]">
        <Mail
          className={cn(
            "absolute inset-0 size-[1.2rem] transition-[opacity,transform,filter] duration-200 ease-out",
            copied
              ? "scale-[0.25] opacity-0 blur-[4px]"
              : "scale-100 opacity-100 blur-0",
          )}
        />
        <Check
          className={cn(
            "absolute inset-0 size-[1.2rem] transition-[opacity,transform,filter] duration-200 ease-out",
            copied
              ? "scale-100 opacity-100 blur-0"
              : "scale-[0.25] opacity-0 blur-[4px]",
          )}
        />
      </span>
      <span className="sr-only">Copy email</span>
    </Button>
  );
}
