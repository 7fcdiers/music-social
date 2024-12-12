import { defineConfig, services } from '@adonisjs/ally'
import env from '#start/env'

export default defineConfig({
  google: services.google({
    clientId: env.get('GOOGLE_CLIENT_ID')!,
    clientSecret: env.get('GOOGLE_CLIENT_SECRET')!,
    callbackUrl: env.get('GOOGLE_CALLBACK_URL')!,
  }),
  facebook: services.facebook({
    clientId: env.get('FB_CLIENT_ID')!,
    clientSecret: env.get('FB_CLIENT_SECRET')!,
    callbackUrl: env.get('FB_CALLBACK_URL')!,
  }),
})
