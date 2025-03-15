import { formatEmailFile, sendEmail } from "./email.js";

sendEmail('kitcat0962@gmail.com', "Test", './email/clientConfirm.html', {
    firstName: 'Katt',
    lastName:'Katakana',
})