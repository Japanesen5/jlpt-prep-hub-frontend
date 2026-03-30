import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GameButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "accent" | "success" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  isFullWidth?: boolean;
}

export const GameButton = React.forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant = "primary", size = "md", isFullWidth, children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-primary text-primary-foreground border-primary-dark shadow-chunky-primary hover:brightness-110",
      secondary: "bg-secondary text-secondary-foreground border-secondary-dark shadow-chunky-secondary hover:brightness-110",
      accent: "bg-accent text-accent-foreground border-accent-dark shadow-chunky-accent hover:brightness-105",
      success: "bg-success text-white border-success-dark shadow-chunky-success hover:brightness-110",
      ghost: "bg-transparent text-foreground hover:bg-muted border-transparent shadow-none active:translate-y-0",
      outline: "bg-white text-foreground border-border shadow-chunky-muted hover:bg-gray-50",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm border-b-[3px]",
      md: "px-6 py-3 text-base border-b-[4px]",
      lg: "px-8 py-4 text-lg border-b-[6px]",
      icon: "p-3 border-b-[4px] aspect-square flex items-center justify-center",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ y: 4, boxShadow: "0 0px 0 0" }}
        className={cn(
          "relative font-display font-bold rounded-2xl transition-filter border-2 active:shadow-none inline-flex items-center justify-center gap-2 outline-none focus-visible:ring-4 ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          isFullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
GameButton.displayName = "GameButton";
