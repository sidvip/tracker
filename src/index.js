import { createClient } from '@vercel/postgres';
let isConnected = null;
const client = createClient({
    url: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE
});

chrome.webNavigation.onCompleted.addListener(async (details) => {
    console.log('onCompleted', details.url);
    if (!isConnected) {
        isConnected = await client.connect();
    }

    try {
        const { rows, fields } =
            await client.sql`INSERT INTO history (url, user_id) VALUES (${details.url}, 1);`;
        console.log(rows, fields);
    } finally {
        await client.end();
    }
});
