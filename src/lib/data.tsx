import { AArrowDown, CloudSunRain, Droplet, HousePlus, Leaf, LeafyGreen, Recycle, RefreshCw, Sprout, ThermometerSun, Trash, TrendingUpDown, UsersRound } from "lucide-react";

export interface IconItem {
  icon: React.ReactNode,
  label: string,
}

export interface CarouselItem {
  title: string,
  description: string,
  image: string,
}

export interface FaqsItem {
  header: string, content: string
}


export const iconItems: { [key: string]: IconItem[] } = {
  "clean-water": [
    {
      icon: <UsersRound color="white" />,
      label: 'Community Impact'
    },
    {
        icon: <HousePlus color="white" />,
        label: 'Reservoir Filling'
    },
    {
        icon: <Leaf color="white" />,
        label: 'Sustainability'
    },
    {
        icon: <Droplet color="white" />,
        label: 'Water Accessibility'
    },
  ],
  'recycled-plastic': [
    {
      icon: <Trash color="white" />,
      label: 'Waste Reduction'
    },
    {
        icon: <LeafyGreen color="white" />,
        label: 'Green Initiative'
    },
    {
        icon: <RefreshCw color="white" />,
        label: 'Circular Economy'
    },
    {
        icon: <Recycle color="white" />,
        label: 'Waste Recycling'
    },
  ],
  'reduced-carbon': [
    {
      icon: <ThermometerSun color="white" />,
      label: 'Greenhouse gasses'
    },
    {
        icon: <TrendingUpDown color="white" />,
        label: 'Emissions Reduction'
    },
    {
        icon: <CloudSunRain color="white" />,
        label: 'Climate Action'
    },
    {
        icon: <Sprout color="white" />,
        label: 'Eco-Friendly'
    },
  ]
}

export const carouselItems: CarouselItem[] = [
  {
    title: 'Turning Waste Into Water: A Sustainable Solution for Everyone',
    description: 'WEWO provides access to clean, non-potable water for everyone, addressing water scarcity while promoting sustainability.',
    image: '/images/hero-bg.png'
  },
  {
    title: 'Community Driven Act to Reduce Plastic Bottle: An Efficient Way',
    description: 'WEWO accepts and collects PET bottles as a form of exchange for clean, non-potable water - encouraging individuals to recycle plastic waste.',
    image: '/images/hero-bg-2.png'
  },
  {
    title: 'Helping to Lower Carbon Footprints: A Bold Movement for Home',
    description: 'WEWO is a bold initiative aimed at reducing the carbon footprint on Earth by encouraging the collection of plastic bottles.',
    image: '/images/hero-bg-3.png'
  }
]

export const cardItems: CarouselItem[] = [
  {
    title: 'Less Plastic, Cleaner Earth', 
    description: 'Plastic waste is one of the biggest threats to our planet, polluting oceans and harming ecosystems. WEWO combats this by collecting and recycling plastic bottles, ensuring they are repurposed instead of discarded.', 
    image: '/images/less_plastic.png'
  },
  {
    title: 'More Water for Everyone', 
    description: 'Access to water is a fundamental need, yet many communities struggle with shortages. WEWO addresses this by collecting rainwater and purifying it into clean, non-potable water. ', 
    image: '/images/more_water.png'
  },
  {
    title: 'Saving the Planet from Pollution', 
    description: 'Pollution affects everyone, from the air we breathe to the water we drink. By recycling bottles, WEWO reduces plastic waste and its harmful effects on the environment. ', 
    image: '/images/saving_planet.png'
  },
  {
    title: 'Helping Communities in Need', 
    description: 'Many people live without access to clean, reliable water, impacting their health and quality of life. WEWO provides a practical solution, making water collection and distribution more efficient. ', 
    image: '/images/helping_communities.png'
  },
  {
    title: 'A Smarter Way to Recycle', 
    description: 'By linking recycling to clean water distribution, the system motivates individuals to participate actively in sustainability. It’s an innovative approach that turns small actions into big results, fostering a culture of environmental responsibility.', 
    image: '/images/a_smarter_way.png'
  },
]

export const faqItems: FaqsItem[] = [
  {
    header: 'What is WEWO, and how does it work?',
    content: 'Learn about WEWO\'s system that converts recyclable materials into non-potable water using IoT Technology.'
  },
  {
    header: 'Where can I find a WEWO station near me?',
    content: 'Locate WEWO installations in schools, public parks, malls, and other community spaces.'
  },
  {
    header: 'What types of recyclable materials does WEWO accept?',
    content: 'Understand the recyclable items, such as plastic bottles, that WEWO collects in exchange for water.'
  },
  {
    header: 'What can WEWO\'s water be used for?',
    content: 'Discover suitable applications for WEWO\'s non-potable water, such as cleaning irrigation, and other everyday uses.'
  },
  {
    header: 'Can individuals or organizations partner with WEWO?',
    content: 'Learn how to collaborate with WEWO to increase access and environmental impact.'
  },
  {
    header: 'What should I do if a WEWO station isn’t working?',
    content: 'Find out how to report issues or request assistance for repairs and maintenance.'
  },
]

export const articlesDataForCards: Article[] = [
  {
    id: 1,
    title: "The Water Conservation",
    image: "/illustrations/WewoImpactPageIMG1.png",
    description:
      "The Philippines is classified as a country experiencing high water stress, a demand for water exceeds supply",
  },
  {
    id: 2,
    title: "Battles Against Bottles",
    image: "/illustrations/WewoImpactPageIMG2.png",
    description:
      "Plastic pollution has become one of the most alarming environmental challenges of our time.",
  },
  {
    id: 3,
    title: "Reduced Carbon Footprint",
    image: "/illustrations/WewoImpactPageIMG3.png",
    description:
      "Waste management and water conservation strategies can reduce carbon emissions by up to 20% in urban areas.",
  },
  {
    id: 4,
    title: "Community Engagement",
    image: "/illustrations/WewoImpactPageIMG4.png",
    description:
      "Sustainability awareness through community engagement programs.",
  },
];