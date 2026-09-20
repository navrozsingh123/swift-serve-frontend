import { useState } from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import { apiUrl, authHeaders } from '../api'
import trash from "../trash.svg"

export default function Cart() {
    const data = useCart();
    const dispatch = useDispatchCart();
    // Checkout feedback lives here rather than in console.error, and survives
    // the cart emptying itself on a successful order.
    const [status, setStatus] = useState(null);
    const [placing, setPlacing] = useState(false);

    const handleCheckOut = async () => {
        if (!localStorage.getItem('authToken')) {
            setStatus({ type: 'error', message: 'Please log in to place your order.' });
            return;
        }

        setPlacing(true);
        setStatus(null);

        try {
            // The account comes from the token, so no email is sent.
            const response = await fetch(apiUrl('/api/orderData'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeaders()
                },
                body: JSON.stringify({
                    order_data: data,
                    order_date: new Date().toDateString()
                })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                dispatch({ type: "DROP" });
                setStatus({ type: 'success', message: 'Order placed. Find it under My Orders.' });
            } else {
                setStatus({
                    type: 'error',
                    message: result.error || 'Checkout failed. Please try again.'
                });
            }
        } catch (error) {
            console.error("Checkout request failed:", error);
            setStatus({ type: 'error', message: 'Could not reach the server. Please try again.' });
        } finally {
            setPlacing(false);
        }
    }

    const totalPrice = data.reduce((total, food) => total + (food.unitPrice * food.qty), 0);
    return (
        <div>
            <div className="container m-auto mt-5 cart-table-wrap" style={{ paddingBottom: "100px" }}>
                {status && (
                    <div className={`checkout-status ${status.type}`}>{status.message}</div>
                )}

                {data.length === 0 ? (
                    <div className='m-5 w-100 text-center fs-3'>The cart is Empty!</div>
                ) : (
                    <>
                    <table className="table table-hover cart-glass-table">
                        <thead>
                            <tr className="text-white">
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Option</th>
                                <th scope="col">Amount</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody className="text-white">
                            {data.map((food, index) => (
                                <tr key={index} className="glass-row">
                                    <th scope="row">{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>
                                        <div className="qty-stepper">
                                            <button
                                                type="button"
                                                className="qty-btn"
                                                onClick={() => dispatch({ type: "DECREMENT", index: index })}
                                            >
                                                −
                                            </button>
                                            <span className="qty-value">{food.qty}</span>
                                            <button
                                                type="button"
                                                className="qty-btn"
                                                onClick={() => dispatch({ type: "INCREMENT", index: index })}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td>{food.size}</td>
                                    <td>₹{food.unitPrice * food.qty}</td>
                                    <td>
                                        <button type="button" className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index: index })}>
                                            <img src={trash} alt="Delete" width="20" height="20" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="glass-summary">
                        <h1>Total Price: ₹{totalPrice}</h1>
                    </div>
                    <div>
                        <button className="checkout-btn" onClick={handleCheckOut} disabled={placing}>
                            {placing ? 'Placing order...' : 'Checkout'}
                        </button>
                    </div>
                    </>
                )}
            </div>

            <style>{`
            .cart-glass-table {
                border-collapse: separate;
                border-spacing: 0 10px;
            }

            .cart-glass-table thead th {
                border: none;
                font-weight: 600;
                opacity: 0.7;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .glass-row {
                background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
                backdrop-filter: blur(16px) saturate(180%);
                -webkit-backdrop-filter: blur(16px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.18);
                box-shadow: 
                    0 4px 16px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.25),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.15);
                transition: transform 0.15s ease, border-color 0.2s ease, background 0.2s ease;
            }
            .glass-row:hover {
                transform: translateY(-2px);
                border-color: rgba(255, 107, 53, 0.4);
                background: linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%);
            }
            .glass-row td, .glass-row th {
                border: none;
                padding: 14px 12px;
                vertical-align: middle;
            }
            .glass-row td:first-child,
            .glass-row th:first-child {
                border-top-left-radius: 14px;
                border-bottom-left-radius: 14px;
            }
            .glass-row td:last-child {
                border-top-right-radius: 14px;
                border-bottom-right-radius: 14px;
            }

            .glass-summary {
                background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 16px;
                padding: 16px 20px;
                margin-top: 10px;
                color: #fff;
            }
            .glass-summary h1 {
                font-size: 22px;
                margin: 0;
            }

            .checkout-btn {
                width: 100%;
                margin-top: 14px;
                padding: 12px;
                border: none;
                border-radius: 16px;
                background: linear-gradient(135deg, #ff6b35 0%, #ff8f5c 100%);
                color: #1c1c1e;
                font-weight: 700;
                font-size: 15px;
                cursor: pointer;
                box-shadow: 0 6px 20px rgba(255, 107, 53, 0.35);
                transition: transform 0.15s ease;
            }
            .checkout-btn:hover:not(:disabled) {
                transform: translateY(-1px);
            }
            .checkout-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            .checkout-status {
                margin-top: 12px;
                padding: 10px 14px;
                border-radius: 12px;
                font-size: 13.5px;
                font-weight: 600;
            }
            .checkout-status.success {
                background: rgba(70, 200, 120, 0.12);
                border: 1px solid rgba(70, 200, 120, 0.35);
                color: #7ee2a8;
            }
            .checkout-status.error {
                background: rgba(255, 80, 80, 0.12);
                border: 1px solid rgba(255, 80, 80, 0.35);
                color: #ff8a8a;
            }
        `}</style>
        </div>
    )
}