import { createContext, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { pageTitles } from '../pageTitles'

const CartUIContext = createContext()

export const CartUIProvider = ({ children }) => {
    const [cartView, setCartView] = useState(false)
    const location = useLocation()

    const openCart = () => {
        setCartView(true)
        document.title = "SwiftServe"
    }

    const closeCart = () => {
        setCartView(false)
        document.title = pageTitles[location.pathname] || "SwiftServe"
    }

    return (
        <CartUIContext.Provider value={{ cartView, openCart, closeCart }}>
            {children}
        </CartUIContext.Provider>
    )
}

export const useCartUI = () => useContext(CartUIContext)