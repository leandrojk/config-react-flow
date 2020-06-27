// @flow

import {PORTA} from './env'

import https from 'https'
import fs from 'fs'
import path from 'path'
import express from 'express'


const opcoes = {
  key: fs.readFileSync(path.resolve(__dirname, '../cert/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../cert/cert.pem'))
}

const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../publico')))

app.get('/limites', (req, res) => {
  // esperar 2 segundos para responder
  setTimeout(() => res.json({min: 3, max: 10}), 2000)
})

const server = https.createServer(opcoes, app)

// eslint-disable-next-line no-console
server.listen(PORTA, () => console.log(`Servidor no ar na porta ${PORTA}...`))
