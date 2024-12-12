import { defineConfig } from "@adonisjs/cors";

const corsConfig = defineConfig({
  enabled: true,
  origin: true, // ['http://localhost:3000'], // Allow all origins or specify an array of allowed origins
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH'],
  headers: true,
  exposeHeaders: [
    'cache-control',
    'content-language',
    'content-type',
    'expires',
    'last-modified',
    'pragma',
  ],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
