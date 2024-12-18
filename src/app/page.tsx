import Button from "@/app/components/button";
import Card from "@/app/components/card";

export default function HomePage() {
    return (
        <main className="bg-stone-200 h-screen flex justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center gap-2">
                <Button label={'Learn More \u003E'} />
                <Button type={'secondary'} label={'Learn More \u003E'} />
            </div>
            <div className="flex gap-4">
                <Card number={'23'}
                      baseColor={'#4987B0'}
                      label={"liters"}
                      iconLink={'droplet.png'}
                      title={'clean water distributed'}
                      description={'Like filling thousands of water bottles, ensuring access to life’s most vital resource.'}
                />
                <Card number={'70'}
                      baseColor={'#7CBA5A'}
                      label={"plastics"}
                      iconLink={'plastic-bottle.png'}
                      title={'PET bottles recycled'}
                      description={'Like filling thousands of water bottles, ensuring access to life’s most vital resource.'}
                />
                <Card number={'3'}
                      baseColor={'#4668B2'}
                      label={"kilograms"}
                      iconLink={'carbon-footprint.png'}
                      title={'carbon footprints reduced'}
                      description={'Like filling thousands of water bottles, ensuring access to life’s most vital resource.'}
                />
            </div>
        </main>
    )
}