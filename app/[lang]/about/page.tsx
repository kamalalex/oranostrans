import { getDictionary } from '@/lib/get-dictionary'

export default async function AboutPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params as { lang: 'en' | 'fr' }
    const dict = await getDictionary(lang)

    return (
        <main className="flex-grow">
            {/* Hero Section */}
            <section className="bg-primary text-white py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                        {dict.about.title}
                    </h1>
                    <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        {dict.about.subtitle}
                    </p>
                </div>
            </section>

            {/* History & Vision */}
            <section className="py-24 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-primary">{dict.about.history.title}</h2>
                        <p className="text-xl text-muted leading-relaxed">
                            {dict.about.history.content}
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-primary">{dict.about.vision.title}</h2>
                        <p className="text-xl text-muted leading-relaxed">
                            {dict.about.vision.content}
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-border">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16">{dict.about.values.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {dict.about.values.items.map((value: any, index: number) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="w-20 h-20 bg-primary text-white rounded-2xl flex items-center justify-center font-bold text-3xl mb-6 shadow-xl shadow-primary/20">
                                    {index + 1}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                                <p className="text-muted leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
