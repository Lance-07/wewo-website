import { AArrowDown } from "lucide-react";

export interface IconItem {
  icon: React.ReactNode,
  label: string,
}

export interface CarouselItem {
  title: string,
  description: string,
  image: string,
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


// TODO: Add carousel items
export const carouselItems: CarouselItem[] = [
  {
    title: 'Turning Waste Into Water: A Sustainable Solution for Everyone',
    description: 'WEWO provides access to clean, non-potable water for everyone, addressing water scarcity while promoting sustainability.',
    image: '/images/hero-bg.png'
  },
  {
    title: 'Community Driven Act to Reduce Plastic Bottle: An Efficient Way',
    description: 'WEWO accepts and collects PET bottles as a form of exchange for clean, non-potable water - encouraging individuals to recycle plastic waste.',
    image: '/images/hero-bg.png'
  },
  {
    title: 'Helping to Lower Carbon Footprints: A Bold Movement for Home',
    description: 'WEWO is a bold initiative aimed at reducing the carbon footprint on Earth by encouraging the collection of plastic bottles.',
    image: '/images/hero-bg.png'
  }
]

