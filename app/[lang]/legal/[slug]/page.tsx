import { getDictionary } from '@/lib/get-dictionary'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ContactObfuscator from '@/components/ContactObfuscator'

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
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                a: ({ href, children }) => {
                                    const linkText = typeof children === 'string' ? children : String(children)

                                    if (href?.startsWith('mailto:')) {
                                        return <ContactObfuscator type="email" value={href.replace('mailto:', '')} className="text-primary hover:underline" />
                                    }

                                    if (href?.startsWith('tel:')) {
                                        return <ContactObfuscator type="phone" value={href.replace('tel:', '')} className="text-primary hover:underline text-nowrap" />
                                    }

                                    if (linkText.includes('@')) {
                                        return <ContactObfuscator type="email" value={linkText} className="text-primary hover:underline" />
                                    }

                                    return <a href={href} className="text-primary hover:underline">{children}</a>
                                },
                                p: ({ children }) => {
                                    const processNode = (node: any): any => {
                                        if (typeof node === 'string') {
                                            // Non-capturing groups for internal parts, capturing group only for the whole number
                                            const phoneRegex = /(\+212\s?(?:6|7|5)\s?(?:\d\s?){8})/g
                                            const parts = node.split(phoneRegex)
                                            if (parts.length > 1) {
                                                return parts.map((part, i) => {
                                                    if (part.match(/^(\+212\s?(?:6|7|5)\s?(?:\d\s?){8})$/)) {
                                                        return <ContactObfuscator key={i} type="phone" value={part} className="text-nowrap" />
                                                    }
                                                    return part
                                                })
                                            }
                                        }
                                        return node
                                    }
                                    return <p>{Array.isArray(children) ? children.map(processNode) : processNode(children)}</p>
                                },
                                strong: ({ children }) => {
                                    const processNode = (node: any): any => {
                                        if (typeof node === 'string') {
                                            // Handle emails in strong tags
                                            if (node.includes('@')) {
                                                const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
                                                const parts = node.split(emailRegex)
                                                if (parts.length > 1) {
                                                    return parts.map((part, i) => {
                                                        if (part.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/i)) {
                                                            return <ContactObfuscator key={i} type="email" value={part} className="font-bold cursor-pointer" />
                                                        }
                                                        return part
                                                    })
                                                }
                                            }
                                            // Handle phones in strong tags
                                            const phoneRegex = /(\+212\s?(?:6|7|5)\s?(?:\d\s?){8})/g
                                            const parts = node.split(phoneRegex)
                                            if (parts.length > 1) {
                                                return parts.map((part, i) => {
                                                    if (part.match(/^(\+212\s?(?:6|7|5)\s?(?:\d\s?){8})$/)) {
                                                        return <ContactObfuscator key={i} type="phone" value={part} className="font-bold text-nowrap cursor-pointer" />
                                                    }
                                                    return part
                                                })
                                            }
                                        }
                                        return node
                                    }
                                    return <strong>{Array.isArray(children) ? children.map(processNode) : processNode(children)}</strong>
                                }
                            }}
                        >
                            {legalInfo.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </main>
    )
}
