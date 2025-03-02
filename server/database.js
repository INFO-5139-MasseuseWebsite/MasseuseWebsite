// https://getpantry.cloud/apiv1/pantry/YOUR_PANTRY_ID/basket/YOUR_BASKET_NAME

import axios from 'axios';

// remember to remove before commiting
const PANTRY_ID = "JohnDoe"

export async function addBooking(rmtID) {
    //verify time

    const result = await axios.put(`https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket/rmt_booking`, {
        [rmtID]: [{
            name: "test",
            process: "dunno"
        }],
    })
    console.log(result)
}
