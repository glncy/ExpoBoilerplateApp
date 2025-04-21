import { LucideIcon } from "lucide-react-native";
import React from "react";

import Icons from "@/src/components/atoms/Icon/list";
import { iconWithClassName } from "@/src/utils/reusables/iconWithClassName";

// cssInterop
Object.values(Icons).forEach((item: LucideIcon) => iconWithClassName(item));

const createIconListRecord = (): Record<
  keyof typeof Icons,
  keyof typeof Icons
> => {
  return Object.keys(Icons).reduce((acc, key) => {
    acc[key as keyof typeof Icons] = key as keyof typeof Icons;
    return acc;
  }, {} as Record<keyof typeof Icons, keyof typeof Icons>);
};

export const IconList = createIconListRecord();
export type IconListType = keyof typeof IconList;

export interface IconProps {
  icon: IconListType;
}

type Props = React.ComponentProps<LucideIcon> & IconProps;

const Icon = ({ icon, ...props }: Props) => {
  const IconComponent = Icons[icon];
  return <IconComponent {...props} />;
};

export default Icon;
