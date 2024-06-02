export let SERVER_URL = "";

console.log(import.meta.env.DEV);
console.log(import.meta.env.PROD);

if (import.meta.env.PROD)
  SERVER_URL =
    "https://visualize-hvfrepmbh-yohannes-takatas-projects.vercel.app/3000";
if (import.meta.env.DEV) SERVER_URL = "http://localhost:3000";
