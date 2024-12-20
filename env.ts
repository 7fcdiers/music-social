/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import env from '#start/env/index'

export default env.rules({
	HOST: env.schema.string({ format: 'host' }),
	PORT: env.schema.number(),
	APP_KEY: env.schema.string(),
	APP_NAME: env.schema.string(),
  DRIVE_DISK: env.schema.enum(['local'] as const),
	NODE_ENV: env.schema.enum(['development', 'production', 'test'] as const),
  DB_CONNECTION: env.schema.string(),
  // MYSQL_HOST: Env.schema.string({ format: 'host' }),
  // MYSQL_PORT: Env.schema.number(),
  // MYSQL_USER: Env.schema.string(),
  // MYSQL_PASSWORD: Env.schema.string.optional(),
  // MYSQL_DB_NAME: Env.schema.string(),
  // PG_HOST: Env.schema.string({ format: 'host' }),
  // PG_PORT: Env.schema.number(),
  // PG_USER: Env.schema.string(),
  // PG_PASSWORD: Env.schema.string.optional(),
  // PG_DB_NAME: Env.schema.string(),
})
