'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher({ lang }: { lang: string }) {
    const pathname = usePathname()

    const redirectedPathname = (locale: string) => {
        if (!pathname) return '/'
        const segments = pathname.split('/')
        segments[1] = locale
        return segments.join('/')
    }

    return (
        <div className="flex gap-4 items-center font-medium">
            <Link
                href={redirectedPathname('fr')}
                className={`px-2 py-1 rounded transition-colors ${lang === 'fr' ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
            >
                FR
            </Link>
            <Link
                href={redirectedPathname('en')}
                className={`px-2 py-1 rounded transition-colors ${lang === 'en' ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
            >
                EN
            </Link>
        </div>
    )
}
