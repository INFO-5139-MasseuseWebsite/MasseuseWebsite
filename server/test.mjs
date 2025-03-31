import { rmtRejectAppointment } from "./database.mjs";

rmtRejectAppointment('debug', 'cd4064bc-34f0-4a39-9d49-ba971d1bc806', 'Cause f@ck you lmao')
.catch(e=>console.error(e))