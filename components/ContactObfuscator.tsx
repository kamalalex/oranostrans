'use client'

import { useState, useEffect } from 'react'

interface ContactObfuscatorProps {
    type: 'email' | 'phone'
    value: string
    className?: string
    icon?: React.ReactNode
}

export default function ContactObfuscator({ type, value, className, icon }: ContactObfuscatorProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <span className={className}>
                {icon && <span className="inline-block mr-2">{icon}</span>}
                {/* Fallback for SEO or before hydration */}
                <span className="opacity-0 select-none">...</span>
            </span>
        )
    }

    const href = type === 'email' ? `mailto:${value}` : `tel:${value.replace(/\s/g, '')}`

    return (
        <a
            href={href}
            className={className}
        >
            {icon && <span className="inline-block mr-2">{icon}</span>}
            {value}
        </a>
    )
}
