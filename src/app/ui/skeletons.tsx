import clsx from "clsx";

const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
    return (
        <div className={`${shimmer} flex gap-2 rounded-lg p-2 flex-col shadow-card-shadow w-[280px] sm:w-[320px] md:w-[240px] lg:w-[270px] h-[150px] md:h-[187px] animate-pulse bg-gray-100`}>
            <div className="h-2/3 flex justify-center gap-4 items-center bg-gray-50">
                <div className="bg-gray-300 h-10 w-1/3 rounded-lg"></div>
                <div className="bg-gray-300 h-20 w-1/5 rounded-lg"></div>
            </div>
            <div className="h-1/3 flex justify-center items-center gap-4 bg-gray-200">
                <div className="bg-gray-300 rounded-full w-5 h-5"></div>
                <div className="bg-gray-300 w-1/2 rounded-lg h-5"></div>
            </div>
        </div>
    )
}

export function CardSkeletons(){
    return (
        <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </>
    )
}

export function PieSkeleton() {
    return (
        <div className={`${shimmer} bg-gray-100 shadow-card-shadow gap-4 p-4 flex rounded-lg w-full h-[291px]`}>
            <div className="flex flex-col w-1/2 gap-4">
                <div className="w-9/12 h-1/5 bg-gray-200"></div>
                <div className="w-11/12 h-4/5 bg-gray-200"></div>
                <div className="w-8/12 h-2/5 bg-gray-200"></div>
                <div className="w-8/12 h-2/5 bg-gray-200"></div>
                <div className="w-8/12 h-2/5 bg-gray-200"></div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <div className="bg-gray-200 w-[200px] h-[200px] rounded-full relative">
                    <div className="bg-gray-50 w-[100px] h-[100px] rounded-full absolute inset-[50px]"></div>
                </div>
            </div>
        </div>
    )
}

export function BackwashIndSkeleton() {
    return (
        <div className={`${shimmer} bg-gray-100 flex gap-4 flex-col p-4 w-full h-[291px] shadow-card-shadow rounded-lg`}>
            <div className="bg-gray-200 w-6/12 h-1/6"></div>
            <div className="bg-gray-200 w-11/12 h-1/6"></div>
            <div className="flex gap-2 h-1/6">
                <div className="rounded-md size-[34px] bg-gray-200"></div>
                <div className="flex flex-col w-full gap-2">
                    <div className="bg-gray-200 h-2/6 w-3/12"></div>
                    <div className="bg-gray-200 h-2/6 w-8/12"></div>
                </div>
            </div>
            <div className="flex gap-2 h-1/6">
                <div className="rounded-md size-[34px] bg-gray-200"></div>
                <div className="flex flex-col w-full gap-2">
                    <div className="bg-gray-200 h-2/6 w-6/12"></div>
                    <div className="bg-gray-200 h-2/6 w-10/12"></div>
                </div>
            </div>
            <div className="flex gap-2 h-1/6">
                <div className="rounded-md size-[34px] bg-gray-200"></div>
                <div className="flex flex-col w-full gap-2">
                    <div className="bg-gray-200 h-2/6 w-6/12"></div>
                    <div className="bg-gray-200 h-2/6 w-11/12"></div>
                </div>
            </div>
        </div>
    )
}

export function BottleBinIndSkeleton() {
    return (
        <div className={`${shimmer} bg-gray-100 w-full h-[291px] p-4 gap-4 shadow-card-shadow rounded-lg flex flex-col`}>
            <div className="bg-gray-200 w-6/12 h-[24px]"></div>
            <div className="bg-gray-200 w-11/12 h-[20px]"></div>
            <div className="flex gap-2">
                <div className="rounded-md size-[34px] bg-gray-200"></div>
                <div className="flex flex-col w-full gap-2">
                    <div className="bg-gray-200 h-2/6 w-2/12"></div>
                    <div className="bg-gray-200 h-2/6 w-4/12"></div>
                </div>
            </div>
            <div className="flex gap-2">
                <div className="rounded-md size-[34px] bg-gray-200"></div>
                <div className="flex flex-col w-full gap-2">
                    <div className="bg-gray-200 h-2/6 w-6/12"></div>
                    <div className="bg-gray-200 h-2/6 w-3/12"></div>
                </div>
            </div>
        </div>
    )
}

export function TableRowSkeleton() {
    return (
        <tr className="[&>td>div>div]:rounded-md [&>td>div:first-child]:flex [&>td>div:first-child]:justify-center">
            <td className="whitespace-nowrap px-3 py-2">
                <div>
                    <div className="bg-gray-100 h-6 w-28"></div>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-2">
                <div>
                    <div className="bg-gray-100 h-6 w-32"></div>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-2">
                <div>
                    <div className="bg-gray-100 h-6 w-20"></div>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-2">
                <div>
                    <div className="bg-gray-100 h-6 w-24"></div>
                </div>
            </td>
        </tr>
    );
}

export function TableSkeleton() {
    return (
        <tr className="[&>td>div>div]:rounded-md [&>td>div:first-child]:flex [&>td>div:first-child]:justify-center">
            <td className="whitespace-nowrap px-3 py-2">
                <div>
                    <div className="bg-gray-100 h-6 w-28"></div>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-2">
                <div>
                    <div className="bg-gray-100 h-6 w-32"></div>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-2">
                <div>
                    <div className="bg-gray-100 h-6 w-20"></div>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-2">
                <div>
                    <div className="bg-gray-100 h-6 w-24"></div>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-2">
                <div>
                    <div className="bg-gray-100 h-6 w-32"></div>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-2">
                <div>
                    <div className="bg-gray-100 h-6 w-20"></div>
                </div>
            </td>
            <td className="whitespace-nowrap px-3 py-2">
                <div>
                    <div className="bg-gray-100 h-6 w-24"></div>
                </div>
            </td>
        </tr>
    );
}

export function PaginationSkeleton() {
    return (
        <div className="inline-flex animate-pulse">
            {/* Left Arrow */}
            <div className="flex h-10 w-10 items-center justify-center rounded-md border mr-2 md:mr-4 bg-gray-200" />

            <div className="flex -space-x-px">
                {/* Generate 5 skeleton numbers */}
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={clsx(
                            'flex h-10 w-10 items-center justify-center border bg-gray-200',
                            {
                                'rounded-l-md': i === 0,
                                'rounded-r-md': i === 4,
                            }
                        )}
                    />
                ))}
            </div>

            {/* Right Arrow */}
            <div className="flex h-10 w-10 items-center justify-center rounded-md border ml-2 md:ml-4 bg-gray-200" />
        </div>
    );
}