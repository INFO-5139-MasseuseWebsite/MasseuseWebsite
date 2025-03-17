import { EmailClient } from "@azure/communication-email";
import html_entities from 'html-entities'
import fs from 'node:fs'
import path from 'path'

const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];
if (!connectionString)
    throw 'No COMMUNICATION_SERVICES_CONNECTION_STRING found in environment variables'
const client = new EmailClient(connectionString);

export async function formatEmailFile(filePath, params) {
    let stylesheet = fs.readFileSync(path.resolve(import.meta.dirname, './email/style.css'), { encoding: 'utf8' })
    let file = fs.readFileSync(path.resolve(import.meta.dirname, filePath), { encoding: 'utf8' })
    return file.replace(/\$\s*\{\s*(\w+)\s*\}/g, (substring, key) => {
        if (key === 'stylesheet')
            return stylesheet
        else
            return html_entities.encode(params[key] ?? key.toUpperCase())
    })
}

export async function sendEmail(to, subject, emailPath, params) {
    const emailHtml = await formatEmailFile(emailPath, params)
    const emailMessage = {
        senderAddress: "DoNotReply@7bae2829-7bfa-4985-b1c6-18f2e0f92e5d.azurecomm.net",
        content: {
            subject: subject,
            html: emailHtml,
        },
        recipients: {
            to: [{ address: to }],
        },
    };

    const poller = await client.beginSend(emailMessage);
    const result = await poller.pollUntilDone();
}
