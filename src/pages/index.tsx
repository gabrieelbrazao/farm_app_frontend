import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import Aside from '../components/aside'
import Farms from '../components/farms'
import Home from '../components/home'
import { RootState } from '../store'
import api from '../services/api'
import { useEffect } from 'react'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/producers')

  return {
    props: { data: data.data }
  }
}

interface Iprops {
  data: {
    id: string
    farm_name: string
    producer_name: string
  }
}

const Index: React.FC<Iprops> = ({ data }) => {
  const { TAB } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'SET_FARMS', data })
  }, [])

  return (
    <>
      <Head>
        <title>Farm App</title>
      </Head>

      <div style={{ display: 'flex' }}>
        <Aside />
        {TAB === 1 ? <Home /> : <Farms />}
      </div>
    </>
  )
}

export default Index
