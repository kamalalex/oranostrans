import { getDictionary } from '@/lib/get-dictionary'
import AdvancedQuoteForm from '@/components/quote/AdvancedQuoteForm'

export default async function QuotePage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params as { lang: 'en' | 'fr' }
    const dict = await getDictionary(lang)

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950/50 py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                        {dict.quote.title}
                    </h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto">
                        {dict.quote.subtitle}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <AdvancedQuoteForm dict={dict} lang={lang} />
                </div>
            </div>
        </main>
    )
}
