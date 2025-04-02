// import express from 'express';
// import fetch from 'node-fetch';

// const app = express();
// const port = 3000;

// app.use(express.json());

// app.get('/search', async (req, res) => {
//     const { keyword } = req.query;
//     const apiUrl = `https://cmto.ca.thentiacloud.net/rest/public/profile/search?keyword=${encodeURIComponent(keyword)}`;

//     try {
//         const response = await axios.get(apiUrl);
//         res.json(response.data); 
//     } catch (error) {
//         console.error('Error fetching from CMTO API:', error);
//         res.status(500).json({ error: "Error fetching data from CMTO API" });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });





// import corsAnywhere from 'cors-anywhere';

// const server = corsAnywhere.createServer({
//     originWhitelist: [], 
//     requireHeaders: ['origin', 'x-requested-with'],
//     removeHeaders: ['cookie', 'accept-encoding', 'x-amz-security-token']
// });

// const port = 5000; 

// server.listen(port, () => {
//     console.log(`CORS Anywhere proxy server is running at http://localhost:${port}`);
// });


// import express from 'express';
// import fetch from 'node-fetch';

// const app = express();
// const port = 3000;

// app.use((req, res, next) => {

//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5174');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });

// app.get('/search', async (req, res) => {
//     const { keyword } = req.query;
//     const apiUrl = `https://cmto.ca.thentiacloud.net/rest/public/profile/search/?keyword=${encodeURIComponent(keyword)}&skip=0&take=10&authorizedToPractice=0&acupunctureAuthorized=0&gender=all&registrationStatus=all&city=all&language=all&sortOrder=asc&sortField=lastname`;

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         console.error("API request error:", error);
//         res.status(500).json({ error: "Failed to fetch data from the API" });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });



// import express from 'express';
// import fetch from 'node-fetch';

// const app = express();
// const port = 3000;


// app.use((req, res, next) => {

//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5174');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// app.get('/search', async (req, res) => {
//     const { keyword } = req.query;
//     const apiUrl = `https://cmto.ca.thentiacloud.net/rest/public/profile/search/?keyword=${encodeURIComponent(keyword)}&skip=0&take=10&authorizedToPractice=0&acupunctureAuthorized=0&gender=all&registrationStatus=all&city=all&language=all&sortOrder=asc&sortField=lastname`;

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         res.json(data);  
//     } catch (error) {
//         console.error("API request error:", error);
//         res.status(500).json({ error: "Failed to fetch data from the API" });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });



// import express from 'express';
// import fetch from 'node-fetch';

// const app = express();
// const port = 3000;

// app.get('/search', async (req, res) => {
//     const { keyword } = req.query;
//     // const apiUrl = `https://cmto.ca.thentiacloud.net/rest/public/profile/search/?keyword=${encodeURIComponent(keyword)}&skip=0&take=10&authorizedToPractice=0&acupunctureAuthorized=0&gender=all&registrationStatus=all&city=all&language=all&sortOrder=asc&sortField=lastname`;

//     const apiUrl = `https://cmto.ca.thentiacloud.net/rest/public/profile/search/?keyword=${encodeURIComponent(keyword)}&skip=0&take=10&authorizedToPractice=0&acupunctureAuthorized=0&gender=all&registrationStatus=all&city=all&language=all&sortOrder=asc&sortField=lastname`;


//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();

//         res.json(data);
//     } catch (error) {
//         console.error("API request error:", error);
//         res.status(500).json({ error: "Failed to fetch data from the API" });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });




//         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5174');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//         res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//         res.json(data);  
//     } catch (error) {
//         console.error("API request error:", error);
//         res.status(500).json({ error: "Failed to fetch data from the API" });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });















// import express from 'express';
// import cors from 'cors';

// const app = express();

// app.use(cors({
//     origin: 'http://localhost:5174',  
//     methods: ['GET', 'POST'],  
//     credentials: true
// }));

// app.get('/search', (req, res) => {
//     const { keyword } = req.query;
// });

// app.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
// });














// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const app = express();


// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST'],
//   credentials: true
// }));


// app.options('*', cors());


// app.get('/api/search', async (req, res) => {
//   try {
//     const response = await axios.get('https://cmto.ca.thentiacloud.net/rest/public/profile/search/', {
//       params: req.query,
//       timeout: 10000
//     });
//     res.json(response.data);
//   } catch (error) {
//     console.error('Proxy error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = 3001;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Proxy server running on http://localhost:${PORT}`);
// });





















// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const app = express();

// app.use(cors());

// app.get('/api/search', async (req, res) => {
//   try {
//     const response = await axios.get(
//       'https://cmto.ca.thentiacloud.net/rest/public/profile/search/',
//       { params: req.query }
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = 3002;
// app.listen(PORT, () => {
//   console.log(`Proxy server running on http://localhost:${PORT}`);
// });