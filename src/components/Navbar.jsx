import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import { useCart, useDispatchCart } from '../components/ContextReducer'
import { useCartUI } from '../components/CartUIContext'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const cartData = useCart()
    const cartCount = cartData.reduce((sum, item) => sum + item.qty, 0)
    const location = useLocation()
    const navigate = useNavigate()
    const { openCart } = useCartUI()
    const dispatch = useDispatchCart()

    // Read during render instead of syncing into state from an effect, so the
    // navbar can never show a stale logged-in/logged-out state for one frame.
    const authToken = localStorage.getItem("authToken")

    // Close the mobile menu on navigation, using the "adjust state during
    // render" pattern rather than an effect.
    const [lastPath, setLastPath] = useState(location.pathname)
    if (lastPath !== location.pathname) {
        setLastPath(location.pathname)
        setMenuOpen(false)
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userEmail")
        // The cart lives above the router, so without this the next person to
        // log in on this browser would inherit the previous user's items.
        dispatch({ type: "DROP" })
        navigate("/login")
    }

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark fixed-top"
            style={{ backgroundColor: '#ff6b35' }}
        >
            <div className="container-fluid px-4">
                <Link className="navbar-brand fs-2 fw-bold" to="/">
                    Swift<span style={{ color: '#2b2b2b' }}>Serve</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-controls="navbarNav"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        <li className="nav-item">
                            <Link className="nav-link fw-medium" aria-current="page" to="/">Home</Link>
                        </li>
                        {authToken ?
                            <li className="nav-item ms-lg-2">
                                <Link className="nav-link fw-medium" to="/myOrders">My Orders</Link>
                            </li>
                            : null
                        }

                        {!authToken ?
                            <>
                                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                                    <Link className="glass-auth-btn d-block d-lg-inline-block text-center" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                                    <Link className="glass-auth-btn glass-auth-btn-solid d-block d-lg-inline-block text-center" to="/signup">
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item ms-lg-2">
                                    <span className="nav-link fw-medium" style={{ cursor: 'pointer' }} onClick={openCart}>
                                        My Cart{" "}
                                        {cartCount > 0 && (
                                            <Badge pill bg="light" text="dark">
                                                {cartCount}
                                            </Badge>
                                        )}
                                    </span>
                                </li>
                                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                                    <button
                                        className="glass-auth-btn glass-auth-btn-solid border-0 d-block d-lg-inline-block w-100"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>

            <style>{`
                .glass-auth-btn {
                    padding: 9px 22px;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 14.5px;
                    text-decoration: none;
                    color: #fff;
                    background: rgba(255, 255, 255, 0.16);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.35);
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
                    transition: transform 0.15s ease, background 0.2s ease, box-shadow 0.2s ease;
                }
                .glass-auth-btn:hover {
                    color: #fff;
                    background: rgba(255, 255, 255, 0.26);
                    transform: translateY(-1px);
                }

                .glass-auth-btn-solid {
                    background: rgba(43, 43, 43, 0.55);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15);
                }
                .glass-auth-btn-solid:hover {
                    background: rgba(43, 43, 43, 0.7);
                    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
                }

                @media (max-width: 991px) {
                    .glass-auth-btn {
                        flex: 1;
                        text-align: center;
                    }
                }
            `}</style>
        </nav>
    )
}