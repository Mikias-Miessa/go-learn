module.exports = {
  env:{
    ATLAS_MONGO_URI : "mongodb+srv://natty:wZycRUgZM8CqPY74@cluster0.ndidq.mongodb.net/gobeze?retryWrites=true&w=majority",
jwtSecret : "secrettoken"

  },
  reactStrictMode: false,
  images: {
    domains: ['images.unsplash.com','gobeze.com','localhost']
},
async headers() {
  return [
    {
      // matching all API routes
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
      ]
    }
  ]
}
};
