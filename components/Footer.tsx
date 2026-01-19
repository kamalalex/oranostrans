import Link from 'next/link'
import ContactObfuscator from './ContactObfuscator'

export default function Footer({ lang, dict }: { lang: string, dict: any }) {
    return (
        <footer className="bg-zinc-950 text-zinc-400 py-20 border-t border-zinc-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Col */}
                    <div className="space-y-6">
                        <Link href={`/${lang}`} className="flex items-center gap-3 group">
                            <img
                                src="/logo.png"
                                alt="ORANOS TRANS"
                                className="h-10 w-auto object-contain transition-transform group-hover:scale-110 brightness-0 invert"
                            />
                            <span className="font-bold text-2xl tracking-tighter text-white">
                                ORANOS <span className="text-secondary">TRANS</span>
                            </span>
                        </Link>
                        <p className="leading-relaxed">
                            {dict.home.hero.subtitle}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white text-lg mb-6 uppercase tracking-wider">{dict.navigation.services}</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href={`/${lang}/services/transport-local`} className="hover:text-primary transition-colors">
                                    {dict.services.local.title}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/services/transport-routier`} className="hover:text-primary transition-colors">
                                    {dict.services.road.title}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/services/transport-maritime`} className="hover:text-primary transition-colors">
                                    {dict.services.sea.title}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/services/transport-aerien`} className="hover:text-primary transition-colors">
                                    {dict.services.air.title}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-bold text-white text-lg mb-6 uppercase tracking-wider">Company</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href={`/${lang}/about`} className="hover:text-primary transition-colors">
                                    {dict.about.title}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/contact`} className="hover:text-primary transition-colors">
                                    {dict.contact.title}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/legal/privacy-policy`} className="hover:text-primary transition-colors">
                                    {dict.legal.privacy.title}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/legal/terms-conditions`} className="hover:text-primary transition-colors">
                                    {dict.legal.terms.title}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-white text-lg mb-6 uppercase tracking-wider">{dict.contact.info.title}</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-primary shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                <span>{dict.contact.info.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <ContactObfuscator
                                    type="phone"
                                    value={dict.contact.info.phone}
                                    className="hover:text-primary transition-colors flex items-center gap-3"
                                    icon={
                                        <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    }
                                />
                            </li>
                            <li className="flex items-center gap-3">
                                <ContactObfuscator
                                    type="email"
                                    value={dict.contact.info.email}
                                    className="hover:text-primary transition-colors flex items-center gap-3"
                                    icon={
                                        <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    }
                                />
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-900 flex flex-col lg:flex-row justify-between items-center gap-6 text-sm">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
                        <p suppressHydrationWarning>© {new Date().getFullYear()} ORANOS TRANS. All rights reserved.</p>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-zinc-500 whitespace-nowrap">
                            <span>RC : 32953</span>
                            <span>ICE : 003262477000082</span>
                            <span>CNSS : 1539568</span>
                        </div>
                    </div>
                    <div className="flex gap-8">
                        <Link href={`/${lang}/legal/mentions-legales`} className="hover:text-white transition-colors">
                            {dict.legal.mentions.title}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
