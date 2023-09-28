import { useContext, useEffect, useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { Route, Switch, useHistory } from 'react-router-dom'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import '../src/pages/responsive.css'
import './App.css'
import { CartMain } from './common/Cart/CartMain'
import Footer from './common/footer/Footer'
import { DrawerContent } from './common/header/Drawer'
import Header from './common/header/Header'
import Loading from './common/Loading/Loading'

import { ModalDeleteCart } from './components/wrapper/ModalDeleteCart'
import { ErrorModal, SuccessModal } from './components/wrapper/ModalOrder'
import { AppContext } from './context/AppProvider'
import Cart from './pages/CartPage'
import FailPaymentPage from './pages/FailPaymentPage'
import { FoodDetailPage } from './pages/FoodDetailPage'
import HomePage from './pages/HomePages'
import { MenuPage } from './pages/MenuPage'
import { NotFoundPage } from './pages/NotFoundPage'
import OrderLookupPage from './pages/OrderLookupPage'
import SchedulePage from './pages/SchedulePage'
import { SearchPage } from './pages/SearchPage'
import { ViewAllProductCatePage } from './pages/ViewAllProductCatePage'
import { ViewAllProductStorePage } from './pages/ViewAllProductStorePage'
import './util.css'
import PrivatePolicy from './pages/PrivatePolicy'
import { red } from '@mui/material/colors'
function App() {
  const {
    setMobileMode,
    isOpenDrawer,
    setIsOpenDrawer,
    isCartMain1,
    isCartMain2,
    isCartMain3,
    isLoadingMain,
    mobileMode,
    mode,
    isHeader,
  } = useContext(AppContext)
  const [vh, setVh] = useState(window.innerHeight)
  let history = useHistory()
  useEffect(() => {
    const updateVh = () => {
      setVh(window.innerHeight)
    }
    const documentHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
    }
    window.addEventListener('', documentHeight)
    documentHeight()

    return () => window.removeEventListener('resize', updateVh)
  }, [])
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 700) {
        setMobileMode(true)
      } else {
        setMobileMode(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setMobileMode])
  useEffect(() => {
    if (!isOpenDrawer) {
      document.body.style.overflow = 'auto'
      document.body.style.touchAction = 'auto'
    }
  }, [isOpenDrawer])

  useEffect(() => {
    if (!isOpenDrawer) {
      document.body.style.overflow = 'auto'
      document.body.style.touchAction = 'auto'
    }
  }, [isOpenDrawer])
  const toggleDrawer = () => {
    setIsOpenDrawer((prevState) => !prevState)
  }
  const renderCartMain = () => {
    if (mode === '1') {
      return isCartMain1 && <CartMain />
    } else if (mode === '2') {
      return isCartMain2 && <CartMain />
    } else {
      return isCartMain3 && <CartMain />
    }
  }
  return (
    <div
      className="root center_flex"
      style={{ height: mobileMode ? vh : null }}
    >
      {/* <MessengerCustomerChat pageId="100083337097834" appId="437264958531394" /> */}
      {/* LOGO */}
      <div className="logo-backround">
        <img
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            background: red,
          }}
          src="/images/logo_2.png"
          alt=""
          onClick={() => {
            history.push('/')
          }}
        />
      </div>

      {/* MAIN */}
      <div className="main" id="main">
        {SuccessModal()}
        {ErrorModal()}
        <ModalDeleteCart />
        <Loading isLoading={isLoadingMain} />
        {/* <LoadingMain isLoading={isLoadingMain} /> */}
        {isHeader && <Header />}
        <Drawer
          size={300}
          open={isOpenDrawer}
          duration={300}
          onClose={toggleDrawer}
          zIndex={9999}
          direction="right"
          className="drawer__container"
        >
          <DrawerContent />
        </Drawer>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/mode/:modeId" exact>
            <MenuPage />
          </Route>
          <Route path="/mode/:modeId/store/:storeId" exact>
            <ViewAllProductStorePage />
          </Route>
          <Route path="/mode/:modeId/cate/:cateId" exact>
            <ViewAllProductCatePage />
          </Route>
          <Route path="/order" exact>
            <OrderLookupPage />
          </Route>
          <Route path="/order/:order" exact>
            <OrderLookupPage />
          </Route>
          <Route path="/order/payment/failed">
            <FailPaymentPage />
          </Route>
          <Route path="/mode/:modeId/product/:id" exact>
            <FoodDetailPage />
          </Route>
          <Route path="/mode/:modeId/checkout" exact>
            <Cart />
          </Route>
          <Route path="/mode/:modeId/search" exact>
            <SearchPage />
          </Route>
          <Route path="/mode/:id/schedule" exact>
            <SchedulePage />
          </Route>
          <Route path="/policy">
            <PrivatePolicy></PrivatePolicy>
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        {renderCartMain()}
        <Footer className="d-block d-md-none d-lg-block" />
      </div>
    </div>
  )
}

export default App
