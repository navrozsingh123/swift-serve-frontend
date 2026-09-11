import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyOrder = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:5001/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            if (!res.ok) {
                throw new Error(`Server responded with status ${res.status}`);
            }

            const response = await res.json();
            setOrderData(response);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
            setError("Could not load your orders. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMyOrder();
    }, []);

    if (loading) {
        return (
            <div className="orders-page">
                <Navbar />
                <div className="state-message">Loading your orders...</div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="orders-page">
                <Navbar />
                <div className="state-message error">{error}</div>
                <Footer />
            </div>
        );
    }

    const hasOrders = orderData && orderData.orderData && Array.isArray(orderData.orderData.order_data) && orderData.orderData.order_data.length > 0;

    return (
        <div className="orders-page">
            <Navbar />

            <div className="orders-wrap">
                <h1 className="orders-title">My Orders</h1>

                {hasOrders ? (
                    orderData.orderData.order_data.slice(0).reverse().map((orderGroup, groupIndex) => {
                        const dateEntry = orderGroup.find(item => item.Order_date);
                        const items = orderGroup.filter(item => !item.Order_date);
                        const orderTotal = items.reduce((sum, item) => sum + (item.unitPrice ? item.unitPrice * item.qty : (item.price || 0)), 0);

                        return (
                            <div className="order-block" key={groupIndex}>
                                <div className="order-block-header">
                                    <span className="order-date">
                                        {dateEntry ? dateEntry.Order_date : "Order"}
                                    </span>
                                    <span className="order-total">Total: ₹{orderTotal}</span>
                                </div>

                                <div className="order-items-grid">
                                    {items.map((arrayData, itemIndex) => (
                                        <div className="order-item-card" key={itemIndex}>
                                            <img
                                                src={arrayData.img}
                                                alt={arrayData.name}
                                                className="order-item-img"
                                            />
                                            <div className="order-item-body">
                                                <h3 className="order-item-name">{arrayData.name}</h3>
                                                <div className="order-item-meta">
                                                    <span className="pill">{arrayData.qty}x</span>
                                                    <span className="pill">{arrayData.size}</span>
                                                </div>
                                                <div className="order-item-price">
                                                    ₹{arrayData.unitPrice ? arrayData.unitPrice * arrayData.qty : arrayData.price}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="state-message">You haven't placed any orders yet.</div>
                )}
            </div>

            <Footer />

            <style>{`
                .orders-page {
                    min-height: 100vh;
                    background: #16171a;
                    padding-top: 80px;
                }

                .orders-wrap {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 40px 24px 80px;
                }

                .orders-title {
                    color: #fff;
                    font-size: 30px;
                    font-weight: 700;
                    margin-bottom: 28px;
                    letter-spacing: -0.02em;
                }

                .state-message {
                    text-align: center;
                    color: rgba(255,255,255,0.6);
                    font-size: 16px;
                    padding: 80px 20px;
                }

                .state-message.error {
                    color: #ff8a8a;
                }

                .order-block {
                    margin-bottom: 36px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 20px;
                    padding: 20px;
                    backdrop-filter: blur(12px);
                }

                .order-block-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 16px;
                    margin-bottom: 18px;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .order-date {
                    color: #ffb98a;
                    font-weight: 600;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                }

                .order-total {
                    color: #fff;
                    font-weight: 700;
                    font-size: 16px;
                }

                .order-items-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 18px;
                }

                .order-item-card {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 16px;
                    overflow: hidden;
                    transition: transform 0.15s ease, border-color 0.2s ease;
                }

                .order-item-card:hover {
                    transform: translateY(-3px);
                    border-color: rgba(255, 107, 53, 0.4);
                }

                .order-item-img {
                    width: 100%;
                    height: 130px;
                    object-fit: cover;
                    display: block;
                }

                .order-item-body {
                    padding: 14px 16px 16px;
                }

                .order-item-name {
                    color: #fff;
                    font-size: 16px;
                    font-weight: 600;
                    margin: 0 0 10px;
                }

                .order-item-meta {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 10px;
                }

                .pill {
                    background: rgba(255,255,255,0.08);
                    color: rgba(255,255,255,0.75);
                    font-size: 12px;
                    font-weight: 600;
                    padding: 4px 10px;
                    border-radius: 999px;
                    text-transform: capitalize;
                }

                .order-item-price {
                    color: #ff8f5c;
                    font-weight: 700;
                    font-size: 16px;
                }

                @media (max-width: 480px) {
                    .orders-title {
                        font-size: 24px;
                    }
                    .order-block-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 6px;
                    }
                }
            `}</style>
        </div>
    )
}