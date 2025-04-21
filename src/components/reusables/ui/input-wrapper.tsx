import * as React from "react";
import { View, ViewProps } from "react-native";
import { cn } from "@/src/utils/reusables/utils";

const InputWrapper = React.forwardRef<React.ElementRef<typeof View>, ViewProps>(
  ({ className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(
          "rounded-md border border-input bg-background h-12 justify-center px-3",
          className
        )}
        {...props}
      />
    );
  }
);

InputWrapper.displayName = "InputWrapper";

export { InputWrapper };
