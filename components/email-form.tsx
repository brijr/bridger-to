"use client";

const source = "https://bridger.to";
const userGroup = "bridger.to";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { ArrowRight } from "lucide-react";

import useMeasure from "react-use-measure";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const transition = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.4,
};

export function EmailForm({ label }: { label?: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, bounds] = useMeasure();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          source: source,
          userGroup: userGroup,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      const data = await response.json();
      console.log("Submitted email:", values.email, "Contact ID:", data.id);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting email:", error);
      form.setError("email", {
        type: "manual",
        message: "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MotionConfig transition={transition}>
      <motion.div
        animate={{ height: bounds.height > 0 ? bounds.height : undefined }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
      >
        <div ref={ref}>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  ...transition,
                  duration: transition.duration / 2,
                }}
              >
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          {label && (
                            <FormLabel className="text-muted-foreground">
                              {label}
                            </FormLabel>
                          )}
                          <FormControl>
                            <input
                              type="email"
                              placeholder="your@email.com"
                              className="w-full bg-transparent border-b border-input pb-2 text-base focus:outline-none focus:border-foreground transition-colors duration-400 placeholder:text-muted-foreground/50"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="sr-only">
                            Enter your email address to subscribe.
                          </FormDescription>
                          <FormMessage className="text-sm text-destructive" />
                        </FormItem>
                      )}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-400 disabled:opacity-50"
                    >
                      <ArrowRight
                        strokeWidth={1.5}
                        size={16}
                        className="group-hover:translate-x-0.5 transition-transform duration-400"
                      />
                      <span>{isLoading ? "Subscribing..." : "Subscribe"}</span>
                    </button>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="thank-you"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ...transition,
                  duration: transition.duration / 2,
                  delay: transition.duration / 2,
                }}
              >
                <p className="text-muted-foreground">
                  Thank you for subscribing.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
