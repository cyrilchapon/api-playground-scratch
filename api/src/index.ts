import { appEnv } from './env'
import http from 'http'

import express from 'express'
import cors from 'cors'

import { router as restRouter } from './rest/routes'
import * as middlewares from './middlewares'
import { prismaClientSingleton } from './database'

const prisma = prismaClientSingleton()

const app = express()

if (appEnv.NODE_ENV === 'development') {
  app.set('json spaces', 2)
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Bind router
app.use(restRouter)

// Default to 404
app.use(middlewares.notFoundHandler)

// Error handlers
app.use(middlewares.error.logger)
app.use(middlewares.error.bodyParserToBoom)
app.use(middlewares.error.prismaToBoom)
app.use(middlewares.error.handleBoom)

const go = async (): Promise<void> => {
  await prisma.$connect()

  try {
    const server = http.createServer(app)
    server.listen(appEnv.PORT, function () {
      console.log(`Magic happens on port ${appEnv.PORT}`)
    })

    await new Promise((resolve, reject) => {
      server.on('close', resolve)
      server.on('error', reject)
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

void go()
