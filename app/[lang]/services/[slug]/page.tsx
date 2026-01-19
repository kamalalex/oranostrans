import { getDictionary } from '@/lib/get-dictionary'
import Link from 'next/link'
import { Metadata } from 'next'
import Image from 'next/image'

type Props = {
    params: Promise<{ lang: 'en' | 'fr'; slug: string }>
}

const heroImages: Record<string, string> = {
    'transport-local': '/images/services/local-transport-hero.jpg',
    'transport-routier': '/images/services/road-transport-hero.jpg',
    'transport-maritime': '/images/services/sea-transport-hero.jpg',
    'transport-aerien': '/images/services/air-transport-hero.jpg',
}

export async function generateStaticParams() {
    const langs = ['en', 'fr']
    const slugs = [
        'transport-local',
        'transport-routier',
        'transport-maritime',
        'transport-aerien'
    ]

    return langs.flatMap((lang) =>
        slugs.map((slug) => ({ lang, slug }))
    )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params
    const dict = await getDictionary(lang)

    const services = dict.services as any
    const serviceKey = Object.keys(services).find(
        (key) => services[key].slug === slug
    )

    if (!serviceKey) return { title: 'Service Not Found' }

    const service = services[serviceKey]

    return {
        title: service.meta.title,
        description: service.meta.description,
        openGraph: {
            title: service.meta.title,
            description: service.meta.description,
            url: `https://oranos-trans.com/${lang}/services/${slug}`,
            type: 'website',
        }
    }
}

export default async function ServicePage({ params }: Props) {
    const { lang, slug } = await params
    const dict = await getDictionary(lang)

    const services = dict.services as any
    const serviceKey = Object.keys(services).find(
        (key) => services[key].slug === slug
    )

    if (!serviceKey) {
        return (
            <main className="flex-grow flex items-center justify-center">
                <h1 className="text-4xl font-bold">Service non trouvé</h1>
            </main>
        )
    }

    const service = services[serviceKey]
    const heroImage = heroImages[slug]

    return (
        <main className="flex-grow">
            {/* Hero Section for Service */}
            <section className="bg-zinc-950 text-white py-24 md:py-32 relative overflow-hidden flex items-center min-h-[50vh]">
                {heroImage && (
                    <>
                        <Image
                            src={heroImage}
                            alt={service.title}
                            fill
                            className="object-cover object-center opacity-90"
                            priority
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-10" />
                    </>
                )}

                <div className="container mx-auto px-4 relative z-20">
                    <Link
                        href={`/${lang}`}
                        className="inline-flex items-center text-primary font-bold mb-8 hover:translate-x-[-4px] transition-transform"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {dict.navigation.home}
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                        {service.title}
                    </h1>
                    <p className="text-2xl text-zinc-300 max-w-2xl leading-relaxed font-medium">
                        {service.description}
                    </p>
                </div>

                {!heroImage && (
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-32" />
                )}
            </section>

            {/* Content Section */}
            <section className="py-24 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-primary">
                            {lang === 'fr' ? 'À propos de ce service' : 'About this service'}
                        </h2>
                        <p className="text-xl text-muted leading-relaxed mb-10">
                            {service.long_description}
                        </p>

                        <div className="space-y-4">
                            {service.features.map((feature: string, index: number) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-zinc-50 dark:bg-zinc-900 p-12 rounded-[2rem] border border-border shadow-2xl relative">
                        <h3 className="text-2xl font-bold mb-6">
                            {lang === 'fr' ? 'Demander un devis pour ce service' : 'Request a quote for this service'}
                        </h3>
                        <p className="mb-8 text-muted">
                            {lang === 'fr'
                                ? 'Nos experts vous recontacteront sous 24h avec une solution adaptée.'
                                : 'Our experts will get back to you within 24h with a tailored solution.'}
                        </p>
                        <Link
                            href={`/${lang}/get-quote`}
                            className="block w-full text-center bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                        >
                            {dict.navigation.quote}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-primary text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        {lang === 'fr'
                            ? 'Prêt à optimiser votre logistique ?'
                            : 'Ready to optimize your logistics?'}
                    </h2>
                    <Link
                        href={`/${lang}/get-quote`}
                        className="inline-block bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all"
                    >
                        {lang === 'fr' ? 'Contactez-nous aujourd\'hui' : 'Contact us today'}
                    </Link>
                </div>
            </section>
        </main>
    )
}
