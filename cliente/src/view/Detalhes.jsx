//@flow
import React from 'react'

type Props = {|
  minimo: number,
  maximo: number,
  quando: ?string,
  login: string,
  loginValido: boolean
|}

const Detalhes = (props: Props) => {
  const corMessage = props.login.length === 0 ? 
    'message is-danger' : props.loginValido ? 
      'message is-link' : 'message is-warning'

  return (
    <div className={corMessage}>
      <div className='message-header'>
      Detalhes
      </div>
      <div className='message-body'>
        {
          props.quando !== undefined && 
        <h3 className='is-size-3'>Iniciado em: {props.quando}</h3>
        }
        <h3 className='is-size-3'>Mínimo - Máximo: {props.minimo} - {props.maximo}</h3>
        {
          props.login.length === 0 &&
        <h3 className='is-size-3'>Login informado: sem login definido</h3>
        }
        {
          props.login.length > 0 &&
        <h3 className='is-size-3'>Login informado: {props.login}</h3>
        }
        <h3 className='is-size-3'>Tamanho: {props.login.length}</h3>
      </div>
    </div>
  )
}

export default Detalhes