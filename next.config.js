module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URL: "mongodb://localhost:27017/airbnd",
    ORIGIN: "http://localhost:3000",
    // ORIGIN: "https://airbnd-delta.vercel.app",

    STRIPE_API_KEY:
      "pk_test_51K9hT0IeR8FoxQ9Hzejepxy9SyjkHxrOKItBfRZ1GuAtIIDBk3fmlULN3l9MhfQy7zaGeKNTZ8CsBPn5c2TUotvy00xDtlMPyu",
    STRIPE_SECRET_KEY:
      "sk_test_51K9hT0IeR8FoxQ9HM2sO7XxOGhVRYJ6v0HPoeN2gji9mF0odZ2FYtpsRTbBusTpzVUDgWMaWQZzugXRvzngYuVbF00uC2rOUah",
    STRIPE_WEBHOOK_SECRET: "bravo-blithe-kudos-upbeat"
  },
  images: {
    domains: ["res.cloudinary.com"]
  }
};
