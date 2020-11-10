import Head from 'next/head'
import useSWR from 'swr'
import jwtDecode from 'jwt-decode'
import { request } from 'graphql-request'
import { useEffect } from 'react'

import Header from '../components/Header'
import { useStateValue } from '../components/StateProvider'
import Carousel from '../components/Carousel'

const READ_PRODUCTS_QUERY = /* GraphQL */ `
    {
      readProducts {
        _id
        title
        description
        published
        user {
            _id
            email
            username
        }
      }
    }
`

const productsFetcher = query => request('/api/products', query)

export default function Home() {
  const [, dispatch] = useStateValue()
  const { data, error } = useSWR(READ_PRODUCTS_QUERY, productsFetcher) 

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
      {data && <Carousel products={data.readProducts} />}
    </div>
  )
}
