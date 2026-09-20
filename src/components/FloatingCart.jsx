import { useCart } from './ContextReducer'
import { useCartUI } from './CartUIContext'

export default function FloatingCart() {
    const cartData = useCart()
    const cartCount = cartData.reduce((sum, item) => sum + item.qty, 0)
    const { openCart } = useCartUI()

    if (cartCount === 0) return null

    return (
        <button
            id="floating-cart-btn"
            onClick={openCart}
            aria-label="Open cart"
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff6b35 0%, #ff8f5c 100%)',
                border: 'none',
                boxShadow: '0 8px 24px rgba(255, 107, 53, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 900,
                transition: 'transform 0.15s ease',
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <span style={{ fontSize: '24px' }}>🛒</span>
            <span
                style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#fff',
                    color: '#ff6b35',
                    fontWeight: 700,
                    fontSize: '12px',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                }}
            >
                {cartCount}
            </span>
        </button>
    )
}