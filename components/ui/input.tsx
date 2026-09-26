import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full h-14 md:h-16 px-6 bg-white border rounded-2xl focus-visible:ring-2 focus-visible:ring-red-500/10 focus-visible:border-red-500 outline-none transition-all duration-300 text-sm md:text-base font-medium placeholder:text-gray-300",
          error ? "border-red-500 bg-red-50/10" : "border-gray-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
