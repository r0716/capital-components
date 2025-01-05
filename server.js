import express from 'express'; 
import cors from 'cors';
import fetch from 'node-fetch';
import path from 'path'; // To handle file paths

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import dotenv from 'dotenv';
dotenv.config();


// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// // 🛠️ Serve static files from the 'public' and 'dist' folders
// app.use(express.static(path.join(__dirname, 'public'))); // index.html, css, js files
// app.use('/dist', express.static(path.join(__dirname, 'dist'))); // Allow access to /dist/bundle.js

app.use((req, res, next) => {
    if (req.path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});


app.use(express.static(path.join(__dirname, 'dist'))); 
app.use(express.static(path.join(__dirname, 'public'))); 


// 🔐 Securely store this key in environment variables (e.g., .env file)
const ADYEN_API_KEY = process.env.ADYEN_API_KEY || 'your-api-key-here';

// 1️⃣ Create an endpoint for the frontend to call to create a session
app.post('/create-session', async (req, res) => {
    try {
        const response = await fetch('https://test.adyen.com/authe/api/v1/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': ADYEN_API_KEY
            },
            body: JSON.stringify({
                allowOrigin: 'www.adyen.com',
                product: 'platform',
                policy: {
                    resources: [
                        {
                            accountHolderId: 'AH3297F223228F5LP8VLJFTK3',
                            type: 'accountHolder'
                        }
                    ],
                    roles: ['Capital Component: Manage']
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to create session: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Session Created:', data);
        res.json(data);
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: error.message });
    }
});

// Handle any requests that aren't for static files by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
