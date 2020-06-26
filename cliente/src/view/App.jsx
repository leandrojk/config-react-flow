// @flow
import React, {useReducer, useEffect} from 'react'

import 'bulma/css/bulma.min.css'

import Login from './Login.jsx'
import Detalhes from './Detalhes.jsx'

type Estado = {|
  login: string,
  minimo: 3,
  maximo: 10,
  quando: string | void
|}

type Acao =
    {| type: 'REGISTRE_LOGIN', login: string |}
  | {| type: 'APAGUE_LOGIN' |}
  | {| type: 'REGISTRE_INICIO', quando: string |}

type AlteraEstado = {| 
  apagaLogin: void => void, 
  registraLogin: string => void,
  loginValido: void => boolean 
|}

type Modelo = [Estado, AlteraEstado]



const estadoInicial: Estado = {
  login: '',
  minimo: 3,
  maximo: 10,
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

  function loginValido() {
    return estado.login.length >= estado.minimo && estado.login.length <= estado.maximo
  }

  return [estado, {apagaLogin, registraLogin, loginValido}]
}



function App() {
  const [estado, {apagaLogin, registraLogin, loginValido}] = useModelo()
  

  return (
    <div className='container is-fluid'>
      <div className='message is-black'>
        <div className='message-header'>
            UFSC - CTC - INE - INE5646 :: Config React - Bulma - Flow
        </div>
        <div className='message-body has-background-grey-light'>
          <Login 
            loginAtual={estado.login}
            loginValido={loginValido()}
            onApagaLogin={apagaLogin}
            onMudaLogin={registraLogin}
          />
          <Detalhes
            minimo={estado.minimo}
            maximo={estado.maximo}
            login={estado.login}
            loginValido={loginValido()}
            quando={estado.quando}
          />
        </div>
      </div>
    </div>
  )
}

export default App
