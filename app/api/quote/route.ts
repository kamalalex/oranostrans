import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()

        // Extract fields
        const data: any = {}
        formData.forEach((value, key) => {
            if (key !== 'files') {
                data[key] = value
            }
        })

        const files = formData.getAll('files') as File[]

        // Transporter configuration
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.hostinger.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true,
            auth: {
                user: process.env.SMTP_USER || 'contact@oranostrans.com',
                pass: process.env.SMTP_PASS,
            },
        })

        // Prepare attachments
        const attachments = await Promise.all(
            files.map(async (file) => {
                const buffer = Buffer.from(await file.arrayBuffer())
                return {
                    filename: file.name,
                    content: buffer,
                }
            })
        )

        // Email content
        const mailOptions = {
            from: `"ORANOS TRANS" <${process.env.SMTP_USER || 'contact@oranostrans.com'}>`,
            to: process.env.CONTACT_EMAIL || 'contact@oranostrans.com',
            replyTo: data.email,
            subject: `Nouveau Devis : ${data.departure} ➔ ${data.arrival} (${data.company || data.name})`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Nouvelle Demande de Devis</h2>
                    
                    <h3 style="color: #444;">1. Cargaison</h3>
                    <p><strong>Départ :</strong> ${data.departure}</p>
                    <p><strong>Arrivée :</strong> ${data.arrival}</p>
                    <p><strong>Nature :</strong> ${data.nature}</p>
                    <p><strong>Poids :</strong> ${data.weight}</p>
                    ${data.dimensions ? `<p><strong>Dimensions :</strong> ${data.dimensions}</p>` : ''}
                    ${data.palettes ? `<p><strong>Nb Palettes :</strong> ${data.palettes}</p>` : ''}

                    <h3 style="color: #444;">2. Transport</h3>
                    <p><strong>Type :</strong> ${data.transportType}</p>
                    ${data.truckType ? `<p><strong>Camion :</strong> ${data.truckType}</p>` : ''}
                    ${data.trailerType ? `<p><strong>Remorque :</strong> ${data.trailerType}</p>` : ''}

                    <h3 style="color: #444;">3. Contact Client</h3>
                    <p><strong>Nom :</strong> ${data.name}</p>
                    <p><strong>Email :</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                    <p><strong>Téléphone :</strong> ${data.phone}</p>
                    ${data.company ? `<p><strong>Société :</strong> ${data.company}</p>` : ''}

                    <p style="margin-top: 30px; font-size: 12px; color: #888;">Ce message a été envoyé depuis le formulaire de devis d'ORANOS TRANS.</p>
                </div>
            `,
            attachments,
        }

        await transporter.sendMail(mailOptions)

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Email Error:', error)
        return NextResponse.json(
            { error: 'Failed to send email', details: error.message },
            { status: 500 }
        )
    }
}
