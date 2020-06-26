//@flow

import React from 'react'

type Props = {|
  loginValido: boolean,
  loginAtual: string,
  onMudaLogin: string => void,
  onApagaLogin: void => void
|}


export default function Login (props: Props) {

  const corInput: string = !props.loginValido ? 
    'input is-danger has-background-danger-light' : 
    'input is-info'

  function onChange(ev: SyntheticInputEvent<HTMLInputElement>) {
    props.onMudaLogin(ev.currentTarget.value)
  }

  return (
    <div className='message is-info'>
      <div className='message-header'>
        Login
      </div>
      <div className='message-body'>
        <input 
          className={corInput}
          placeholder='digite seu login'
          type='text' 
          value={props.loginAtual} 
          onChange={onChange}/>
        <button 
          className='button is-success' 
          disabled={!props.loginValido}
          onClick={props.onApagaLogin}>
            Apagar
        </button>
      </div>
    </div>
  )
}