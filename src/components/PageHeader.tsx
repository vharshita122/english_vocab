"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8 sm:mb-10"
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-purple">
          {eyebrow}
        </p>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
        {description}
      </p>
    </motion.header>
  );
}
