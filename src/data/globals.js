export let SERVER_URL = "";

if (import.meta.env.DEV) SERVER_URL = "http://localhost:3000";
if (import.meta.env.PROD) SERVER_URL = "https://visualize-api.onrender.com";
