import nodemailer from 'nodemailer'
import { getEmailCredentials } from './database.js'
const sleep = ms => new Promise((resolve) => { setTimeout(resolve, ms); });

let mail = null
    .then(({ email, password }) => {
        console.log(email, password)
        
        return mail.verify()
    })
    .then(value => console.log(value))

export async function getTransport() {
    if (mail !== null) return mail
    const { email, password } = await getEmailCredentials()
    mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    }, {
        from: email,
    })
    try {
        await mail.verify()
    } catch (e) {
        console.error('SMTP service validation failed:', e)
        return null
    }
    return mail
}