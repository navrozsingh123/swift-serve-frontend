import { useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart();
    const options = props.options;
    const priceOptions = Object.keys(options);

    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(priceOptions[0]);

    const totalPrice = parseInt(options[size]) * quantity;
    const handleAddToCart = async (e) => {
        const unitPrice = parseInt(options[size]);
        let food = null;
        for (const item of data) {
            if (item.id === props.foodItem._id && item.size === size) {
                food = item;
                break;
            }
        }

        if (food) {
            await dispatch({ type: "UPDATE", id: props.foodItem._id, size: size, qty: quantity });
        } else {
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, unitPrice: unitPrice, qty: quantity, size: size, img: props.foodItem.img });
        }

        flyToCart(e);
    }

    const flyToCart = (e) => {
        const cartBtn = document.getElementById('floating-cart-btn');
        if (!cartBtn) return;

        const startRect = e.currentTarget.getBoundingClientRect();
        const endRect = cartBtn.getBoundingClientRect();

        const flyer = document.createElement('div');
        flyer.style.position = 'fixed';
        flyer.style.left = `${startRect.left + startRect.width / 2 - 10}px`;
        flyer.style.top = `${startRect.top + startRect.height / 2 - 10}px`;
        flyer.style.width = '20px';
        flyer.style.height = '20px';
        flyer.style.borderRadius = '50%';
        flyer.style.background = 'linear-gradient(135deg, #ff6b35 0%, #ff8f5c 100%)';
        flyer.style.zIndex = '2000';
        flyer.style.transition = 'transform 0.6s cubic-bezier(0.3, 0, 0.6, 1), opacity 0.6s ease';
        flyer.style.pointerEvents = 'none';
        document.body.appendChild(flyer);

        const deltaX = (endRect.left + endRect.width / 2) - (startRect.left + startRect.width / 2);
        const deltaY = (endRect.top + endRect.height / 2) - (startRect.top + startRect.height / 2);

        requestAnimationFrame(() => {
            flyer.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.3)`;
            flyer.style.opacity = '0.3';
        });
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1.15)';
            setTimeout(() => cartBtn.style.transform = 'scale(1)', 150);
            flyer.remove();
        }, 600);
    }

    return (
        <div>
            <div
                className="glass-card mt-3"
                style={{ width: '18rem', overflow: 'hidden' }}
            >
                <img
                    src={props.foodItem.img}
                    className="card-img-top"
                    alt={props.foodItem.name}
                    style={{ height: '180px', width: '100%', objectFit: 'cover' }}
                />
                <div className="card-body text-white">
                    <h5 className="card-title-fancy">{props.foodItem.name}</h5>
                    <div className="d-flex align-items-center flex-wrap">
                        <div className="qty-stepper m-2">
                            <button
                                type="button"
                                className="qty-btn"
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                disabled={quantity <= 1}
                            >
                                −
                            </button>
                            <span className="qty-value">{quantity}</span>
                            <button
                                type="button"
                                className="qty-btn"
                                onClick={() => setQuantity(q => Math.min(20, q + 1))}
                                disabled={quantity >= 20}
                            >
                                +
                            </button>
                        </div>
                        <select
                            className="glass-select m-2"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>
                        <div className="fw-bold ms-2 fs-5" style={{ color: '#ff8f65' }}>₹{totalPrice}</div>
                    </div>
                    <hr style={{ borderColor: 'rgba(255,255,255,0.15)' }} />
                    <button className="glass-cta-btn w-100" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>

            <style>{`
                .glass-card {
                    border-radius: 20px;
                    background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%);
                    backdrop-filter: blur(24px) saturate(180%);
                    -webkit-backdrop-filter: blur(24px) saturate(180%);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                }
                .glass-card:hover {
                    transform: translateY(-4px);
                    border-color: rgba(255, 107, 53, 0.35);
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 107, 53, 0.15);
                }

                .glass-select {
                    background: rgba(255, 255, 255, 0.06);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    border-radius: 10px;
                    padding: 5px 10px;
                    font-weight: 500;
                    font-size: 14px;
                }
                .glass-select option {
                    background: #1c1c1e;
                    color: #fff;
                }

                .glass-cta-btn {
                    padding: 10px;
                    border-radius: 14px;
                    font-weight: 600;
                    font-size: 15px;
                    color: #fff;
                    background: linear-gradient(135deg, rgba(255,107,53,0.35) 0%, rgba(255,143,92,0.35) 100%);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 107, 53, 0.4);
                    box-shadow: 0 4px 14px rgba(255, 107, 53, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15);
                    transition: transform 0.15s ease, background 0.2s ease, box-shadow 0.2s ease;
                }
                .glass-cta-btn:hover {
                    background: linear-gradient(135deg, rgba(255,107,53,0.55) 0%, rgba(255,143,92,0.55) 100%);
                    transform: translateY(-1px);
                    box-shadow: 0 6px 18px rgba(255, 107, 53, 0.3);
                }
                    .card-title-fancy {
                    font-family: 'Georgia', 'Times New Roman', serif;
                    font-style: italic;
                    font-size: 20px;
                    font-weight: 700;
                    letter-spacing: 0.03em;
                    color: #fff;
                    text-align: left;
                    padding-left: 14px;
                    margin: 10px 0 14px;
                    background: linear-gradient(135deg, #ffffff 0%, #ffb347 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                    .qty-stepper {
                    display: inline-flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.06);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    border-radius: 20px;
                    overflow: hidden;
                    height: 34px;
                }
                .qty-btn {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: #fff;
                    font-size: 16px;
                    font-weight: 600;
                    width: 32px;
                    height: 34px;
                    line-height: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.15s ease;
                }
                .qty-btn:hover:not(:disabled) {
                    background: rgba(255, 107, 53, 0.3);
                }
                .qty-btn:active:not(:disabled) {
                    background: rgba(255, 107, 53, 0.45);
                }
                .qty-btn:focus {
                    outline: none;
                    box-shadow: none;
                }
                .qty-btn:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
                .qty-value {
                    min-width: 22px;
                    text-align: center;
                    font-weight: 600;
                    font-size: 14px;
                    color: #fff;
                    padding: 0 2px;
                }
            `}</style>
        </div>
    )
}