'use client'

import { useState } from 'react'
import Link from 'next/link'

interface AdvancedQuoteFormProps {
    dict: any
    lang: string
}

export default function AdvancedQuoteForm({ dict, lang }: AdvancedQuoteFormProps) {
    const [formData, setFormData] = useState({
        departure: '',
        arrival: '',
        nature: '',
        weight: '',
        dimensions: '',
        palettes: '',
        transportType: '',
        truckType: '',
        trailerType: '',
        name: '',
        email: '',
        phone: '',
        company: '',
    })

    const [files, setFiles] = useState<File[]>([])
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files)
            const oversized = selectedFiles.some(file => file.size > 10 * 1024 * 1024)
            if (oversized) {
                alert(lang === 'fr' ? 'Certains fichiers dépassent la limite de 10 Mo' : 'Some files exceed the 10MB limit')
                return
            }
            setFiles(selectedFiles)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        try {
            const data = new FormData()
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value)
            })
            files.forEach(file => {
                data.append('files', file)
            })

            const response = await fetch('https://formspree.io/f/rmi.search@gmail.com', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.ok) {
                setStatus('success')
                window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
                const errorData = await response.json()
                console.error('Submission failed:', errorData)
                setStatus('error')
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <div className="bg-white dark:bg-zinc-900 p-12 rounded-[2.5rem] border border-green-500/50 shadow-2xl text-center space-y-6">
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-bold">{dict.quote.status.success}</h3>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-primary font-bold hover:underline"
                >
                    {lang === 'fr' ? 'Envoyer une autre demande' : 'Send another request'}
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-12 bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] border border-border shadow-2xl">

            {/* 1. Informations Cargaison */}
            <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold">{dict.quote.sections.cargo}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.departure}</label>
                        <input required name="departure" value={formData.departure} onChange={handleChange} type="text" className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.arrival}</label>
                        <input required name="arrival" value={formData.arrival} onChange={handleChange} type="text" className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.nature}</label>
                    <input required name="nature" value={formData.nature} onChange={handleChange} type="text" className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.weight}</label>
                        <input required name="weight" value={formData.weight} onChange={handleChange} type="text" className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.dimensions}</label>
                        <input name="dimensions" value={formData.dimensions} onChange={handleChange} type="text" className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.palettes}</label>
                        <input name="palettes" value={formData.palettes} onChange={handleChange} type="number" className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
                    </div>
                </div>
            </div>

            {/* 2. Type de Transport & Matériel */}
            <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 11-2 0 1 1 0 012 0zm9 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold">{dict.quote.sections.transport}</h3>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.transport_type}</label>
                    <select
                        required
                        name="transportType"
                        value={formData.transportType}
                        onChange={handleChange}
                        className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                    >
                        <option value="">-- {lang === 'fr' ? 'Sélectionner' : 'Select'} --</option>
                        <option value="road_national">{dict.quote.options.transport.road_national}</option>
                        <option value="road_international">{dict.quote.options.transport.road_international}</option>
                        <option value="sea_international">{dict.quote.options.transport.sea_international}</option>
                        <option value="air_international">{dict.quote.options.transport.air_international}</option>
                    </select>
                </div>

                {/* Conditional Field: National Road */}
                {formData.transportType === 'road_national' && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.truck_type}</label>
                        <select
                            required
                            name="truckType"
                            value={formData.truckType}
                            onChange={handleChange}
                            className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                        >
                            <option value="">-- {lang === 'fr' ? 'Sélectionner' : 'Select'} --</option>
                            {Object.entries(dict.quote.options.trucks).map(([key, label]: [string, any]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Conditional Field: International Road */}
                {formData.transportType === 'road_international' && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.trailer_type}</label>
                        <select
                            required
                            name="trailerType"
                            value={formData.trailerType}
                            onChange={handleChange}
                            className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                        >
                            <option value="">-- {lang === 'fr' ? 'Sélectionner' : 'Select'} --</option>
                            {Object.entries(dict.quote.options.trailers).map(([key, label]: [string, any]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* 3. Documents & Pièces Jointes */}
            <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.414a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold">{dict.quote.sections.documents}</h3>
                </div>

                <div className="relative group">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        accept=".pdf,.xls,.xlsx,.csv"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-border group-hover:border-primary rounded-[2rem] p-12 text-center transition-all bg-zinc-50 dark:bg-zinc-800/50">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <p className="font-bold text-xl mb-2">{dict.quote.fields.docs_label}</p>
                        <p className="text-muted">{dict.quote.fields.docs_info}</p>

                        {files.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-3 justify-center">
                                {files.map((file, i) => (
                                    <div key={i} className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        {file.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 4. Informations Contact */}
            <div className="space-y-8">
                <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold">{dict.quote.sections.client}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.name}</label>
                        <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.email}</label>
                        <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.phone}</label>
                        <input required name="phone" value={formData.phone} onChange={handleChange} type="text" className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">{dict.quote.fields.company}</label>
                        <input name="company" value={formData.company} onChange={handleChange} type="text" className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 outline-none focus:border-primary transition-all" />
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-border">
                {/* GDPR & Submit */}
                <div className="flex items-start gap-4 mb-8">
                    <input required type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                    <p className="text-sm text-muted italic">
                        {dict.quote.fields.gdpr}
                        <Link href={`/${lang}/legal/privacy-policy`} className="text-primary hover:underline ml-1 font-bold">
                            {lang === 'fr' ? 'Consulter notre politique' : 'Read our policy'}
                        </Link>
                    </p>
                </div>

                {/* Protection Anti-Spam (Simple Honeypot) */}
                <div className="hidden">
                    <input name="bot_field" tabIndex={-1} autoComplete="off" />
                </div>

                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-primary text-white py-6 rounded-[2rem] font-bold text-2xl hover:bg-blue-600 transition-all shadow-2xl shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4"
                >
                    {status === 'sending' ? (
                        <>
                            <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {dict.quote.status.sending}
                        </>
                    ) : (
                        <>
                            {dict.quote.fields.submit}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </>
                    )}
                </button>
            </div>

            {status === 'error' && (
                <p className="text-red-500 font-bold text-center">{dict.quote.status.error}</p>
            )}
        </form>
    )
}
