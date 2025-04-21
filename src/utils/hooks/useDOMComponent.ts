import { useState } from "react";

type DomStates = {
  isLoaded: boolean;
};

type DomOptions = import("expo/dom").DOMProps;

export const useDOMComponent = (): [DomStates, DomOptions] => {
  const [isLoaded, setIsLoaded] = useState(false);
  return [
    {
      isLoaded,
    },
    {
      matchContents: true,
      onLoadEnd: () => {
        setIsLoaded(true);
      },
    },
  ];
};
