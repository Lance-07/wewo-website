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
    description: 'By linking recycling to clean water distribution, the system motivates individuals to participate actively in sustainability. It\’s an innovative approach that turns small actions into big results, fostering a culture of environmental responsibility.', 
    image: '/images/a_smarter_way.png'
  },
]

export const faqItems: FaqsItem[] = [
  {
    header: 'What is WEWO, and how does it work?',
    content: 'WEWO (Water Efficiency with Waste Optimization) is an IoT-powered rainwater purification system designed to tackle water scarcity and plastic waste. It collects and filters rainwater for non-potable use while integrating a reverse vending machine that accepts plastic bottles in exchange for clean water. The system also monitors water quality and collected waste in real-time for efficient operation.'
  },
  {
    header: 'Where can I find a WEWO station near me?',
    content: 'WEWO stations will be deployed in schools, public parks, malls, barangay halls, and residential areas. You can check our official website or social media pages for an updated list of locations.'
  },
  {
    header: 'What types of recyclable materials does WEWO accept?',
    content: 'Currently, WEWO only accepts plastic bottles (PET bottles of various sizes). Future updates may expand to include other recyclable materials, so stay tuned!'
  },
  {
    header: 'What can WEWO\'s water be used for?',
    content: 'WEWO provides non-potable water, which can be used for cleaning, flushing toilets, watering plants, industrial applications, and other general purposes. It is not safe for drinking but serves as an alternative water source during shortages.'
  },
  {
    header: 'Can individuals or organizations partner with WEWO?',
    content: 'Yes! We welcome partnerships with schools, businesses, local governments, and environmental organizations to expand WEWO\’s reach and impact. If you\’re interested in collaboration, please contact us through our website or social media.'
  },
  {
    header: 'What should I do if a WEWO station isn\’t working?',
    content: 'If you encounter a malfunctioning WEWO station, please report the issue through our website, app (if available), or contact our support team. Providing details like location and the problem encountered will help us resolve the issue faster.'
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