import app from '@adonisjs/core/services/app'
import env from '#start/env'
import { DatabaseConfig } from "@adonisjs/lucid/database";
import { defineConfig } from "@adonisjs/lucid";

const databaseConfig = defineConfig({
  connection: env.get('DB_CONNECTION'),

  connections: {
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: app.tmpPath('db.sqlite3'),
      },
      pool: {
        afterCreate: (conn, cb) => {
          conn.run('PRAGMA foreign_keys=true', cb)
        },
      },
      migrations: {
        naturalSort: true,
      },
      useNullAsDefault: true,
      healthCheck: false,
      debug: false,
    },
  },
})

export default databaseConfig
