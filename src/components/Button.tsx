"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-green text-white shadow-md shadow-green/25 hover:bg-green-light active:bg-green-dark",
  secondary:
    "bg-purple-soft text-purple hover:bg-purple/15 border border-purple/20",
  ghost: "bg-transparent text-ink-muted hover:bg-cream-dark hover:text-ink",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", children, className = "", ...props },
    ref
  ) {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
