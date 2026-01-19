import { getDictionary } from '@/lib/get-dictionary'
import Link from 'next/link'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: 'en' | 'fr' }
  const dict = await getDictionary(lang)

  const services = [
    {
      id: 'local',
      title: dict.services.local.title,
      description: dict.services.local.description,
      href: `/${lang}/services/transport-local`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'road',
      title: dict.services.road.title,
      description: dict.services.road.description,
      href: `/${lang}/services/transport-routier`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 11-2 0 1 1 0 012 0zm9 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      )
    },
    {
      id: 'sea',
      title: dict.services.sea.title,
      description: dict.services.sea.description,
      href: `/${lang}/services/transport-maritime`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293H9.414a1 1 0 01-.707-.293L6.293 13.293A1 1 0 005.586 13H4" />
        </svg>
      )
    },
    {
      id: 'air',
      title: dict.services.air.title,
      description: dict.services.air.description,
      href: `/${lang}/services/transport-aerien`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    }
  ]

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="/og-image.png"
            alt="ORANOS TRANS Logistics"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 z-10" />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              {dict.home.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-10 max-w-2xl leading-relaxed">
              {dict.home.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 font-bold">
              <Link
                href={`/${lang}/get-quote`}
                className="bg-primary hover:bg-blue-600 text-white px-10 py-4 rounded-full transition-all transform hover:scale-105 shadow-xl shadow-blue-500/40"
              >
                {dict.navigation.quote}
              </Link>
              <Link
                href="#services"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full transition-all"
              >
                {dict.home.hero.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (Replacing the form) */}
      <section className="py-24 bg-primary overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 italic">
            {lang === 'fr' ? 'Besoin d\'un transporteur fiable ?' : 'Need a reliable freight partner?'}
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
            {dict.quote.subtitle}
          </p>
          <Link
            href={`/${lang}/get-quote`}
            className="inline-block bg-white text-primary px-12 py-5 rounded-full font-black text-xl hover:bg-zinc-100 transition-all transform hover:scale-110 shadow-2xl"
          >
            {dict.quote.fields.submit}
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{dict.home.services_section.title}</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            {dict.home.services_section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group p-8 rounded-3xl border border-border bg-white dark:bg-zinc-900 hover:border-primary transition-all hover:shadow-2xl hover:shadow-primary/5 active:scale-95"
            >
              <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 flex items-center text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                {lang === 'fr' ? 'En savoir plus' : 'Learn more'}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
