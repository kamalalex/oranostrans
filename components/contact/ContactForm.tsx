'use client'

export default function ContactForm({ dict }: { dict: any }) {
    return (
        <form className="space-y-8 bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] border border-border shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">
                        {dict.contact.form.name}
                    </label>
                    <input
                        type="text"
                        placeholder={dict.contact.form.placeholder_name}
                        className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">
                        {dict.contact.form.email}
                    </label>
                    <input
                        type="email"
                        placeholder={dict.contact.form.placeholder_email}
                        className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">
                        {dict.contact.form.phone}
                    </label>
                    <input
                        type="text"
                        placeholder={dict.contact.form.placeholder_phone}
                        className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">
                        {dict.contact.form.subject}
                    </label>
                    <input
                        type="text"
                        placeholder={dict.contact.form.placeholder_subject}
                        className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider text-muted ml-1">
                    {dict.contact.form.message}
                </label>
                <textarea
                    rows={6}
                    placeholder={dict.contact.form.placeholder_message}
                    className="w-full px-6 py-4 rounded-2xl border border-border bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]"
            >
                {dict.contact.form.send}
            </button>
        </form>
    )
}
