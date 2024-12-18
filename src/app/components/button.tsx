import clsx from "clsx";

export default function Button({type = 'primary', label} : {type?: string, label: string}) {
    return (
        <button className={clsx(
            `bg-main-white rounded-[37px] px-4 py-2 inline-block min-w-[100px] overflow-hidden whitespace-nowrap hover:font-bold`,
            {
                'border-2 border-border-white hover:bg-hover-white hover:font-bold transition-all duration-300' : type === 'secondary'
            }
        )}>
            <p className={clsx(
                {
                    'font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4A6BB3] to-[#4A7F3B]': type === 'primary',
                    'text-[#344D80]': type === 'secondary'
                }
            )}>
                {label}
            </p>
        </button>
    )
}