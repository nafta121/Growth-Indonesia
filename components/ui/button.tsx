import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl md:rounded-3xl text-sm md:text-base font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-xl active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:w-5 [&_svg]:h-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-red-600 text-white hover:bg-red-700 hover:shadow-red-600/30 focus:ring-red-600 focus:ring-offset-[#0A1628]",
        outline:
          "border-2 border-gray-200 bg-white text-gray-900 hover:border-red-500 hover:text-red-600 hover:bg-gray-50 focus:ring-red-500 shadow-sm",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900 shadow-none",
      },
      size: {
        default: "px-12 py-5 lg:py-6",
        sm: "px-6 py-3 rounded-xl md:rounded-2xl text-xs",
        lg: "px-14 py-6 md:py-8 lg:py-10 text-base md:text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
