import { getDictionary } from '@/lib/get-dictionary'

export default async function LegalPage({
    params,
}: {
    params: Promise<{ lang: 'en' | 'fr'; slug: string }>;
}) {
    const { lang, slug } = await params
    const dict = await getDictionary(lang)

    const mapping: { [key: string]: string } = {
        'privacy-policy': 'privacy',
        'terms-conditions': 'terms',
        'mentions-legales': 'mentions'
    }

    const key = mapping[slug]
    const legalInfo = key ? (dict.legal as any)[key] : null

    if (!legalInfo) {
        return (
            <main className="flex-grow flex items-center justify-center">
                <h1 className="text-4xl font-bold text-muted">Page non trouvée</h1>
            </main>
        )
    }

    return (
        <main className="flex-grow py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-extrabold mb-12 text-primary">{legalInfo.title}</h1>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-xl text-muted leading-relaxed whitespace-pre-wrap">
                        {legalInfo.content}
                    </p>
                    <div className="mt-12 p-8 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-border">
                        <p className="text-sm text-zinc-500 italic">
                            {lang === 'fr'
                                ? "Ceci est une version simplifiée des mentions légales pour démonstration."
                                : "This is a simplified version of the legal notice for demonstration."}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
