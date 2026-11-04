import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl md:rounded-3xl text-sm md:text-base font-bold transition-[transform,background-color,border-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:w-5 [&_svg]:h-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-dark text-white hover:bg-brand focus-visible:ring-focus focus-visible:ring-offset-navy",
        outline:
          "border-2 border-rule bg-paper text-ink hover:border-brand hover:text-brand-dark hover:bg-paper-2 focus-visible:ring-focus shadow-sm",
        ghost: "bg-transparent text-ink-2 hover:bg-paper-2 hover:text-ink shadow-none",
      },
      size: {
        default: "min-h-12 px-8 py-4 lg:py-5",
        sm: "min-h-11 px-5 py-2.5 rounded-xl md:rounded-2xl text-xs",
        lg: "min-h-14 px-10 py-5 md:py-6 text-base md:text-lg",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const compClassName = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        className: cn(compClassName, child.props.className),
        ref,
        ...props,
      });
    }

    return (
      <button
        className={compClassName}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
