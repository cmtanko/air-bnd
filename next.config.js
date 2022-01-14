module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URL: "mongodb://localhost:27017/airbnd",
    ORIGIN_LOCAL: "http://localhost:3000",
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET
  },
  images: {
    domains: ["res.cloudinary.com", "i.pinimg.com", "media.cntraveler.com", "news.airbnb.com", "links.papareact.com"]
  }
};
