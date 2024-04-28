import React, { ReactNode } from "react";
import { cn } from "../../../lib/cn";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected?: boolean;
}
export const PrimaryButton: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        " py-1 flex justify-center items-center gap-2 px-4 bg-blue text-white rounded-lg  text-md capitalize text-center",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
