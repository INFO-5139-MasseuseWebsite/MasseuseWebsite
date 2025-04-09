import axios from "axios";


axios.get(`https://cmto.ca.thentiacloud.net/rest/public/profile/get/`, {
    params: {
        id: '61b33680a77193777c4b96b2'
    }
}).then(a => console.log(a.status, a.data))