
import Header from './Components/layout/header'
import Footer from './Components/layout/footer'
import { Outlet } from 'react-router-dom'
import { getAccountAPI } from './services/api.service'
import { AuthContext } from './Components/context/auth.context'
import { useContext, useEffect } from 'react'
import { Spin } from 'antd'
const App = () => {

  const { setUser, isAppLoading, setAppLoading } = useContext(AuthContext)

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    const res = await getAccountAPI()
    if (res.data) {
      setUser(res.data.user)
      // console.log(res.data)
    }
    setAppLoading(false)
  }

  return (
    <>
      {isAppLoading === true
        ?
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)"
        }}>
          <Spin />
        </div>

        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>

      }
    </>
  )
}

export default App
