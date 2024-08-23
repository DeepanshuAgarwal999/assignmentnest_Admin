import { DocumentDuplicateIcon, HomeIcon } from "@heroicons/react/24/outline";
import { ChartNoAxesCombined } from "lucide-react";

export const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Quote",
    href: "/quote",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Stats",
    href: "/stats",
    icon: ChartNoAxesCombined,
  },
];
