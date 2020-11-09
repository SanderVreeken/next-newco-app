import Head from 'next/head'
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'

import Header from '../components/Header'
import { useStateValue } from '../components/StateProvider'

export default function Home() {
  const [, dispatch] = useStateValue()

  useEffect(() => {
    if (localStorage.getItem('AUTHORIZATION_TOKEN')) {
      const token = jwtDecode(localStorage.getItem('AUTHORIZATION_TOKEN'))
      if (token.exp * 1000 < Date.now()) {
        localStorage.removeItem('AUTHORIZATION_TOKEN')
      } else {
        dispatch({
            type: 'UPDATE_USER',
            item: token,
        })
      }
    }
  }, [dispatch])

  return (
    <div>
      <Header /> 
    </div>
  )
}
