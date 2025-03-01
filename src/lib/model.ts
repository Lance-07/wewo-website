interface TableData {
    id: number;
    date: string;
    waterDistribution: number,
    totalBottles: number,
    co2: number,
    bottles: {
        small: number,
        medium: number,
        large: number
    }
}

interface Article {
    id: number;
    title: string;
    image: string;
    description: string;
}