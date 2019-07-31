// @flow

import './env'

import https from 'https'
import fs from 'fs'
import path from 'path'
import express from 'express'


const PORTA = parseInt(process.env.PORTA, 10)
const opcoes = {
  key: fs.readFileSync(path.resolve(__dirname, '../cert/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../cert/cert.pem'))
}

const app = express()


app.use(express.static(path.resolve(__dirname, '../publico')))


const server = https.createServer(opcoes, app)

// eslint-disable-next-line no-console
server.listen(PORTA, () => console.log(`Servidor no ar na porta ${PORTA}...`))
