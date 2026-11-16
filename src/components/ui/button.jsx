import * as React from "react";
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent font-semibold whitespace-nowrap transition-[transform,background-color,border-color,color,box-shadow,opacity] duration-150 ease-out outline-none select-none focus-visible:ring-2 focus-visible:ring-maroon/30 focus-visible:ring-offset-2 focus-visible:ring-offset-paper active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55 disabled:active:scale-100 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-maroon text-primary-foreground shadow-[0_8px_20px_-12px_rgba(153,0,0,0.55)] hover:bg-[#7a0000] hover:shadow-[0_10px_24px_-12px_rgba(153,0,0,0.6)]",
        outline:
          "border-brown/20 bg-card text-brown shadow-none hover:border-maroon/35 hover:bg-secondary hover:text-brown-deep",
        secondary:
          "bg-secondary text-brown shadow-none hover:bg-accent hover:text-brown-deep",
        ghost:
          "text-brown shadow-none hover:bg-secondary hover:text-brown-deep",
        destructive:
          "bg-destructive/10 text-destructive shadow-none hover:bg-destructive/20 focus-visible:ring-destructive/30",
        link: "h-auto rounded-none border-transparent bg-transparent px-0 py-0 font-semibold text-maroon shadow-none underline-offset-4 hover:text-maroon/80 hover:underline active:scale-100",
      },
      size: {
        default: "h-10 min-h-10 gap-2 px-4 text-sm",
        xs: "h-7 min-h-7 gap-1 rounded-md px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 min-h-9 gap-1.5 px-3.5 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 min-h-12 gap-2 px-6 text-base",
        icon: "size-10",
        "icon-xs": "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
