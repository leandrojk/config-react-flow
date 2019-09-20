// @flow
import React, {useReducer, useEffect} from 'react'

import 'bulma/css/bulma.min.css'

type Estado = {|
  nome: string,
  quando: string | void
|}

type Acao =
    {| type: 'REGISTRE_NOME', nome: string |}
  | {| type: 'APAGUE_NOME' |}
  | {| type: 'REGISTRE_INICIO', quando: string |}


type Dispatch = Acao => void
type Modelo = [Estado, Dispatch]


const estadoInicial = {
  nome: '',
  quando: undefined
}


function reducer(estado: Estado, acao: Acao): Estado {
  switch (acao.type) {
  case 'REGISTRE_NOME':
    return {...estado, nome: acao.nome}

  case 'APAGUE_NOME':
    return {...estado, nome: ''}

  case 'REGISTRE_INICIO':
    return {...estado, quando: acao.quando}

  default:
    throw new Error(`acao.type inválido: ${acao.type}`)
  }
}

function useModelo(): Modelo {

  const [estado, dispatch] = useReducer(reducer, estadoInicial)

  useEffect(() => {
    const quando = new Date().toLocaleTimeString()
    dispatch({type: 'REGISTRE_INICIO', quando})
  }, [])

  return [estado, dispatch]
}


function App () {
  const [estado, dispatch] = useModelo()
  
  return (
    <div className='container is-fluid'>
      <div className='message'>
        <div className='message-header'>
            UFSC - CTC - INE - INE5646 :: Config React - Bulma - Flow
        </div>
        <div className='message-body'>
          {estado.quando !== undefined && <h2>{estado.quando}</h2>}
          <h1>{estado.nome}</h1>
          <input 
            className='input is-danger'
            type='text' 
            value={estado.nome} 
            onChange={ev => dispatch({type: 'REGISTRE_NOME', nome: ev.target.value})}/>
          <button className='button is-success' onClick={() => dispatch({type: 'APAGUE_NOME'})}>Apagar</button>
        </div>
      </div>
    </div>
  )
  
}

export default App
