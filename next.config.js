/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  images: {
    domains: ['www.google.com', 'firebasestorage.googleapis.com'],
  },

  env : {
    FIREBASE_API_KEY: process.env.NEXT_PUBLIC_APIKEY,
    AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    PROJECT_ID: process.env.NEXT_PUBLIC_PROJECTID,
    STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    APP_ID: process.env.NEXT_PUBLIC_APPID,
  }

}