import { AArrowDown } from "lucide-react";

export interface IconItem {
  icon: React.ReactNode,
  label: string,
}

export const iconItems: { [key: string]: IconItem[] } = {
  cleanWater: [
    {
      icon: <AArrowDown color="white" />,
      label: 'Community Impact'
    },
    {
        icon: <AArrowDown color="white" />,
        label: 'Reservoir Filling'
    },
    {
        icon: <AArrowDown color="white" />,
        label: 'Sustainability'
    },
    {
        icon: <AArrowDown color="white" />,
        label: 'Water Accessibility'
    },
  ],
  recycledPlastic: [
    {
      icon: <AArrowDown color="white" />,
      label: 'Community Impact'
    },
    {
        icon: <AArrowDown color="white" />,
        label: 'Reservoir Filling'
    },
    {
        icon: <AArrowDown color="white" />,
        label: 'Sustainability'
    },
    {
        icon: <AArrowDown color="white" />,
        label: 'Water Accessibility'
    },
  ],
  reducedCarbon: [
    {
      icon: <AArrowDown color="white" />,
      label: 'Community Impact'
    },
    {
        icon: <AArrowDown color="white" />,
        label: 'Reservoir Filling'
    },
    {
        icon: <AArrowDown color="white" />,
        label: 'Sustainability'
    },
    {
        icon: <AArrowDown color="white" />,
        label: 'Water Accessibility'
    },
  ]
}

