/* eslint-disable no-console */
// @flow
import dotenv from 'dotenv'

dotenv.config()

// Variáveis de ambiente, acessadas via process.env, devem ser
// definidas no arquivo .env.

// verifica se todas as variáveis de ambiestão definidas

let todasDefinidas = true

if (process.env.PORTA === undefined) {
  console.log('Falta definir variável PORTA no arquivo .env')
  todasDefinidas = false
}

if (!todasDefinidas) {
  process.exit(1)
}

const PORTA: number = parseInt(process.env.PORTA, 10)

export {PORTA}