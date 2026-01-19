import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header({ lang, dict }: { lang: string, dict: any }) {
    return (
        <header className="sticky top-0 z-50 glass">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href={`/${lang}`} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        O
                    </div>
                    <span className="font-bold text-2xl tracking-tight">ORANOS <span className="text-secondary">TRANS</span></span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 font-medium">
                    <Link href={`/${lang}`} className="hover:text-primary transition-colors">
                        {dict.navigation.home}
                    </Link>
                    <div className="group relative">
                        <button className="hover:text-primary transition-colors flex items-center gap-1">
                            {dict.navigation.services}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className="absolute top-full left-0 w-64 bg-white dark:bg-zinc-900 shadow-xl rounded-xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-border mt-2">
                            <Link href={`/${lang}/services/transport-local`} className="block px-6 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary">
                                {dict.services.local.title}
                            </Link>
                            <Link href={`/${lang}/services/transport-routier`} className="block px-6 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary">
                                {dict.services.road.title}
                            </Link>
                            <Link href={`/${lang}/services/transport-maritime`} className="block px-6 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary">
                                {dict.services.sea.title}
                            </Link>
                            <Link href={`/${lang}/services/transport-aerien`} className="block px-6 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary">
                                {dict.services.air.title}
                            </Link>
                        </div>
                    </div>
                    <Link href={`/${lang}/about`} className="hover:text-primary transition-colors">
                        {dict.navigation.about}
                    </Link>
                    <Link href={`/${lang}/contact`} className="hover:text-primary transition-colors">
                        {dict.navigation.contact}
                    </Link>
                </nav>

                <div className="flex items-center gap-6">
                    <LanguageSwitcher lang={lang} />
                    <Link
                        href={`/${lang}/contact`}
                        className="hidden lg:block bg-primary text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        {dict.navigation.quote}
                    </Link>
                </div>
            </div>
        </header>
    )
}
