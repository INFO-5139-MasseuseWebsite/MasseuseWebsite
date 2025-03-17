import { setRMTInfo } from "./database.js";
import { formatEmailFile, sendEmail } from "./email.js";

sendEmail('kitcat0962@gmail.com', "Test", './email/clientConfirm.html', {
    firstName: 'Katt',
    lastName:'Katakana',
})

formatEmailFile('./email/clientConfirm.html', {
    firstName: 'Katt',
    lastName:'Katakana',
}).then(console.log)

// setRMTInfo('debug', {
//     email: 'kitcat0962@gmail.com'
// })