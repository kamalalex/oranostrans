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

        // Generate Quote Reference
        const orderRef = `QT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`

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

        // 1. Notification Email to ORANOS TRANS
        const mailOptions = {
            from: `"ORANOS TRANS" <${process.env.SMTP_USER || 'contact@oranostrans.com'}>`,
            to: process.env.CONTACT_EMAIL || 'kamal@oranostrans.com, rmi.search@gmail.com',
            replyTo: data.email,
            subject: `Nouvelle Demande de Devis [${orderRef}] - ORANOS TRANS`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Nouvelle Demande de Devis</h2>
                    <p style="font-size: 16px; font-weight: bold; color: #2563eb;">Référence : ${orderRef}</p>
                    
                    <h3 style="color: #444;">1. Cargaison</h3>
                    <p><strong>Départ :</strong> ${data.departure}</p>
                    <p><strong>Arrivée :</strong> ${data.arrival}</p>
                    <p><strong>Nature :</strong> ${data.nature}</p>
                    <p><strong>Poids :</strong> ${data.weight} Kg</p>
                    <p><strong>Dimensions :</strong> ${data.dimensions || 'N/A'} m3</p>
                    <p><strong>Nb Palettes :</strong> ${data.palettes || 'N/A'} Palettes</p>

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

        // 2. Acknowledgment Email to Client
        const greeting = (data.name && data.name !== 'N/A') ? `Bonjour ${data.name},` : "Bonjour,";
        const ackMailOptions = {
            from: `"ORANOS TRANS" <kamal@oranostrans.com>`,
            to: data.email,
            replyTo: 'kamal@oranostrans.com',
            subject: `Accusé de réception - Votre demande de devis [${orderRef}] chez ORANOS TRANS`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #2563eb; margin: 0;">Merci de votre confiance</h2>
                        <p style="color: #888; margin-top: 5px;">Référence de votre demande : <strong>${orderRef}</strong></p>
                    </div>
                    <p>${greeting}</p>
                    <p>Nous avons bien reçu votre demande de devis via notre site web.</p>
                    <p>Le traitement de votre demande est en cours et notre équipe vous contactera dans les plus brefs délais pour vous proposer une solution adaptée à vos besoins.</p>
                    <br>
                    <p>Cordialement,</p>
                    <p style="margin-bottom: 5px;"><strong>L'équipe ORANOS TRANS</strong></p>
                    <a href="https://www.oranostrans.com" style="color: #2563eb; text-decoration: none; font-weight: bold;">www.oranostrans.com</a>
                </div>
            `,
        }

        await transporter.sendMail(ackMailOptions).catch(err => console.error('Ack email failed:', err))

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Email Error:', error)
        return NextResponse.json(
            { error: 'Failed to send email', details: error.message },
            { status: 500 }
        )
    }
}
