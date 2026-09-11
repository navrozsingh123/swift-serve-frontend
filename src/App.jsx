import React, { useEffect } from 'react'
import Home from './screens/Home'
import Login from './screens/login'
import SignUp from './screens/Signup'
import MyOrder from './screens/MyOrder'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { CartProvider } from "./components/ContextReducer";
import { CartUIProvider, useCartUI } from './components/CartUIContext'
import Cart from './screens/Cart'
import Modal from './Modal'
import FloatingCart from './components/FloatingCart'
import { pageTitles } from './pageTitles'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation
} from 'react-router-dom';

function TitleUpdater() {
    const location = useLocation()

    useEffect(() => {
        document.title = pageTitles[location.pathname] || "SwiftServe"
    }, [location])

    return null
}

function GlobalCartModal() {
    const { cartView, closeCart } = useCartUI()
    return cartView ? <Modal onClose={closeCart}><Cart /></Modal> : null
}

function AppRoutes() {
    return (
        <>
            <TitleUpdater />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/myOrders" element={<MyOrder/>}/>
            </Routes>
            <FloatingCart />
            <GlobalCartModal />
        </>
    )
}

function App() {
    return (
        <CartProvider>
            <Router>
                <CartUIProvider>
                    <AppRoutes />
                </CartUIProvider>
            </Router>
        </CartProvider>
    )
}

export default App