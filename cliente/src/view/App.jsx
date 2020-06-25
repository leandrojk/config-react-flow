// @flow
import React, {useReducer, useEffect} from 'react'

import 'bulma/css/bulma.min.css'

type Estado = {|
  login: string,
  minimo: 3,
  quando: string | void
|}

type Acao =
    {| type: 'REGISTRE_LOGIN', login: string |}
  | {| type: 'APAGUE_LOGIN' |}
  | {| type: 'REGISTRE_INICIO', quando: string |}

type AlteraEstado = {| 
  apagaLogin: void => void, 
  registraLogin: string => void 
|}

type Modelo = [Estado, AlteraEstado]



const estadoInicial: Estado = {
  login: '',
  minimo: 3,
  quando: undefined
}

function reducer(estado: Estado, acao: Acao): Estado {
  switch (acao.type) {
  case 'REGISTRE_LOGIN':
    return {...estado, login: acao.login.trim()}

  case 'APAGUE_LOGIN':
    return {...estado, login: ''}

  case 'REGISTRE_INICIO':
    return {...estado, quando: acao.quando}

  default:
    throw new Error(`acao.type inválido: ${acao.type}`)
  }
}

function useModelo(): Modelo {

  const [estado, dispatch] = useReducer<Estado,Acao>(reducer, estadoInicial)

  useEffect(() => {
    const quando = new Date().toLocaleTimeString()
    dispatch({type: 'REGISTRE_INICIO', quando})
  }, [])

  function apagaLogin() {
    dispatch({type: 'APAGUE_LOGIN'})
  }

  function registraLogin(login: string) {
    dispatch({type: 'REGISTRE_LOGIN', login})
  }

  return [estado, {apagaLogin, registraLogin}]
}


function App() {
  const [estado, {apagaLogin, registraLogin}] = useModelo()
  
  const loginValido = estado.login.length >= estado.minimo

  const corInput: string = !loginValido ? 
    'input is-danger has-background-danger-light' : 
    'input is-info'

  return (
    <div className='container is-fluid'>
      <div className='message is-black'>
        <div className='message-header'>
            UFSC - CTC - INE - INE5646 :: Config React - Bulma - Flow
        </div>
        <div className='message-body has-background-grey-light'>
          {
            estado.quando !== undefined && 
            <h3 className='is-size-3'>Iniciado em: {estado.quando}</h3>
          }
          {
            estado.login.length === 0 &&
            <h3 className='is-size-3'>Login informado: sem login definido</h3>
          }
          {
            estado.login.length > 0 &&
            <h1 className='is-size-1'>Login informado: {estado.login}</h1>
          }
          {
            loginValido &&
            <h2 className='is-size-2'>Tamanho: {estado.login.length}</h2>
          } 
          <input 
            className={corInput}
            placeholder='digite seu login'
            type='text' 
            value={estado.login} 
            onChange={ev => registraLogin(ev.target.value)}/>
          <button 
            className='button is-success' 
            disabled={estado.login.length < estado.minimo}
            onClick={apagaLogin}>
            Apagar
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
