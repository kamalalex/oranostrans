'use client'

import Image from 'next/image'

interface ClientSliderProps {
    title: string
}

const clients = [
    { name: 'CMA CGM', logo: '/images/clients/cma-cgm.png' },
    { name: 'Samsung', logo: '/images/clients/samsung.png' },
    { name: 'BYD', logo: '/images/clients/byd.png' },
    { name: 'Daikin', logo: '/images/services/air-transport-hero.jpg' }, // Placeholder for variety
    { name: 'Cosco', logo: '/images/services/sea-transport-hero.jpg' }, // Placeholder for variety
]

// To create a seamless loop, we repeat the clients array
const allClients = [...clients, ...clients, ...clients]

export default function ClientSlider({ title }: ClientSliderProps) {
    return (
        <section className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
            <div className="container mx-auto px-4 mb-16">
                <h2 className="text-4xl font-bold text-center">{title}</h2>
            </div>

            <div className="relative flex overflow-x-hidden">
                <div className="flex animate-scroll whitespace-nowrap">
                    {allClients.map((client, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center w-[250px] mx-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                        >
                            <div className="relative h-24 w-full aspect-[3/2]">
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
