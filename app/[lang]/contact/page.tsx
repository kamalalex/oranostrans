import { getDictionary } from '@/lib/get-dictionary'
import AdvancedQuoteForm from '@/components/quote/AdvancedQuoteForm'

export default async function ContactPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params as { lang: 'en' | 'fr' }
    const dict = await getDictionary(lang)

    return (
        <main className="flex-grow">
            <section className="bg-zinc-950 text-white py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                        {dict.contact.title}
                    </h1>
                    <p className="text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                        {dict.contact.subtitle}
                    </p>
                </div>
            </section>

            <section className="py-24 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <AdvancedQuoteForm dict={dict} lang={lang} />
                    </div>

                    <div className="space-y-12">
                        <div className="bg-zinc-950 text-white p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <h3 className="text-3xl font-bold mb-8 relative z-10">{dict.contact.info.title}</h3>
                            <div className="space-y-8 relative z-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">{lang === 'fr' ? 'Adresse' : 'Address'}</h4>
                                        <p className="text-zinc-400">{dict.contact.info.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">{lang === 'fr' ? 'Téléphone' : 'Phone'}</h4>
                                        <p className="text-zinc-400">{dict.contact.info.phone}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary rounded-full blur-[80px] opacity-20" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
