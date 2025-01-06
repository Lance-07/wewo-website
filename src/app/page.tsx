import Button from "@/app/components/button";
import { DynamicCard, HorizontalCard, SimpleCard } from "@/app/components/card";
import { iconItems } from "@/lib/data";

export default function HomePage() {
    return (
        <main className="bg-stone-200 flex justify-center items-center gap-4 flex-col py-8">
            <div className="flex flex-col justify-center items-center gap-2">
                <Button label={'Learn More'} />
                <Button type={'secondary'} label={'Learn More'} />
                <div className="flex gap-4">
                    <SimpleCard number={'23'}
                        baseColor={'#4987B0'}
                        label={"liters"}
                        iconLink={'droplet.png'}
                        title={'clean water distributed'}
                        description={'Like filling thousands of water bottles, ensuring access to life’s most vital resource.'}
                    />
                    <SimpleCard number={'70'}
                        baseColor={'#7CBA5A'}
                        label={"plastics"}
                        iconLink={'plastic-bottle.png'}
                        title={'PET bottles recycled'}
                        description={'Like filling thousands of water bottles, ensuring access to life’s most vital resource.'}
                    />
                    <SimpleCard number={'3'}
                        baseColor={'#4668B2'}
                        label={"kilograms"}
                        iconLink={'carbon-footprint.png'}
                        title={'carbon footprints reduced'}
                        description={'Like filling thousands of water bottles, ensuring access to life’s most vital resource.'}
                    />  
                </div>
            </div>
            <div className="flex gap-4">
                <DynamicCard 
                    imgSrc={'/sample-image-1.png'} 
                    title='collect plastic' 
                    description='Deposit plastic bottles into the Reverse Vending Machine (RVM) to start the recycling process.'
                    baseColor="blue"
                />
                <DynamicCard 
                    imgSrc={'/sample-image-2.png'} 
                    title='collect plastic' 
                    description='Deposit plastic bottles into the Reverse Vending Machine (RVM) to start the recycling process.'
                    baseColor="green"
                />
                <DynamicCard 
                    imgSrc={'/sample-image-3.png'} 
                    title='collect plastic' 
                    description='Deposit plastic bottles into the Reverse Vending Machine (RVM) to start the recycling process.'
                    baseColor="darkBlue"
                />
            </div>
            <div className="flex gap-4">
                <HorizontalCard  
                    imgSrc={'/sample-image-3.png'} 
                    title='clean water distributed' 
                    description='Accommodating 1,000 liters of clean water is like filling a community reservoir, ensuring vital access for all.'
                    baseColor="blue"
                    iconItems={iconItems['cleanWater']}
                />
                <HorizontalCard  
                    imgSrc={'/sample-image-1.png'} 
                    title='recycled plastic bottles' 
                    description='Recycling 1,000 bottles may seem small, but it’s like clearing a mountain of waste—every bottle counts toward a greener planet.'
                    baseColor="green"
                    iconItems={iconItems['recycledPlastic']}
                />
                <HorizontalCard  
                    imgSrc={'/sample-image-2.png'} 
                    title='reduced carbon footprint on earth' 
                    description='Cutting 1,000 kilograms of emissions is like removing 5 cars from the road for a year, helping clean the air and promote a greener future.'
                    baseColor="darkBlue"
                    iconItems={iconItems['reducedCarbon']}
                />
            </div>
        </main>
    )
}