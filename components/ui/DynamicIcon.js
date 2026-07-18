import * as Icons from "lucide-react";
import { CircleDot } from "lucide-react";

export function DynamicIcon({ name, className, strokeWidth }) {
  const Icon = Icons[name] || CircleDot;
  return <Icon className={className} strokeWidth={strokeWidth} />;
}
