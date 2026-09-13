import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import trash from "../trash.svg"

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length == 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The cart is Empty!</div>
            </div>
        )
    }
    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem('userEmail');
        try {
            let response = await fetch(`${import.meta.env.VITE_API_URL}/api/orderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });

            const result = await response.json();
            // console.log("checkout result:", result);

            if (response.ok && result.success) {
                dispatch({ type: "DROP" });
            } else {
                console.error("Checkout failed:", result);
            }
        } catch (error) {
            console.error("Checkout request failed:", error);
        }
    }
    let totalPrice = data.reduce((total, food) => total + (food.unitPrice * food.qty), 0);
    return (
        <div>
            <div className="container m-auto mt-5 cart-table-wrap" style={{ paddingBottom: "100px" }}>
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
                <div><button className="checkout-btn" onClick={handleCheckOut}>Checkout</button></div>
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
            .checkout-btn:hover {
                transform: translateY(-1px);
            }
        `}</style>
        </div>
    )
}