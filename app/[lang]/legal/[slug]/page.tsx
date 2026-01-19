import { getDictionary } from '@/lib/get-dictionary'
import ReactMarkdown from 'react-markdown'

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
        <main className="flex-grow py-24 bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-border p-8 md:p-16 shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-black mb-12 text-primary tracking-tight">{legalInfo.title}</h1>
                    <div className="prose-custom">
                        <ReactMarkdown>
                            {legalInfo.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </main>
    )
}
