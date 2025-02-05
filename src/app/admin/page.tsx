import { AdminCard } from "../ui/components/card";

const adminCardItems = [
    {
        number: '23',
        label: 'liters',
        iconLink: '/icons/droplet.png',
        title: 'clean water distributed',
        className: 'bg-blue-800 text-blue-800'
    },
    {
        number: '70',
        label: 'plastics',
        iconLink: '/icons/plastic-bottle.png',
        title: 'PET Bottles Recycled',
        className: 'bg-blue-600 text-blue-600'
    },
    {
        number: '3',
        label: 'kilograms',
        iconLink: '/icons/carbon-footprint.png',
        title: 'carbon footprints reduced',
        className: 'bg-green-600 text-green-600'
    },
    {
        number: '0',
        label: 'NTU',
        iconLink: '/icons/carbon-footprint.png',
        title: 'turbidity clarity',
        className: 'bg-green-800 text-green-800'
    },
]

export default function AdminPage() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex gap-4">
                {adminCardItems.map((item, idx) => (
                    <AdminCard 
                        key={idx}
                        className={`${item.className} w-[301px] h-[187px]`}
                        number={item.number} 
                        label={item.label} 
                        iconLink={item.iconLink} 
                        title={item.title} />
                ))}
            </div>
        </div>
    )
}