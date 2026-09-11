import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors([])

        try {
            const response = await fetch('http://localhost:5001/api/loginuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const json = await response.json()
            console.log(json)

            if (json.errors) {
                setErrors(json.errors.map((err) => err.msg))
            } else if (json.success) {
                if (json.authToken) {
                    localStorage.setItem('userEmail', credentials.email);
                    localStorage.setItem('authToken', json.authToken);
                    console.log('Just set token, reading back:', localStorage.getItem('authToken'));
                }
                navigate('/')
            } else {
                setErrors(['Invalid email or password.'])
            }
        } catch (err) {
            setErrors(['Could not reach the server. Please try again.'])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-wrap">
            <div className="glow glow-1" />
            <div className="glow glow-2" />
            <div className="glow glow-3" />

            <div className="login-card">
                <div className="brand">
                    Swift<span>Serve</span>
                </div>
                <p className="tagline">Welcome back. Let's get you fed.</p>

                {errors.length > 0 && (
                    <div className="error-box">
                        {errors.map((msg, i) => (
                            <p key={i}>{msg}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="glass-field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="glass-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Your password"
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>

                <p className="switch-line">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>

            <style>{`
                .login-wrap {
                    min-height: 100vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    background: radial-gradient(circle at 20% 20%, #3a2a1f 0%, #1c1c1e 55%, #0f0f10 100%);
                    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
                    padding: 24px;
                }

                .glow {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(70px);
                    opacity: 0.55;
                    z-index: 0;
                }
                .glow-1 {
                    width: 420px;
                    height: 420px;
                    background: #ff6b35;
                    top: -120px;
                    left: -100px;
                    animation: drift1 14s ease-in-out infinite;
                }
                .glow-2 {
                    width: 360px;
                    height: 360px;
                    background: #ffb347;
                    bottom: -140px;
                    right: -80px;
                    animation: drift2 18s ease-in-out infinite;
                }
                .glow-3 {
                    width: 260px;
                    height: 260px;
                    background: #ff8f65;
                    top: 40%;
                    right: 10%;
                    opacity: 0.35;
                    animation: drift3 16s ease-in-out infinite;
                }

                @keyframes drift1 {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(40px, 30px); }
                }
                @keyframes drift2 {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-30px, -40px); }
                }
                @keyframes drift3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(20px, -20px) scale(1.08); }
                }

                .login-card {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    max-width: 400px;
                    padding: 40px 32px 32px;
                    border-radius: 28px;
                    background: rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(28px) saturate(160%);
                    -webkit-backdrop-filter: blur(28px) saturate(160%);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    box-shadow:
                        0 8px 32px rgba(0, 0, 0, 0.35),
                        inset 0 1px 0 rgba(255, 255, 255, 0.25);
                }

                .brand {
                    text-align: center;
                    font-size: 28px;
                    font-weight: 700;
                    color: #f5f5f5;
                    letter-spacing: -0.02em;
                }
                .brand span {
                    color: #ff6b35;
                }

                .tagline {
                    text-align: center;
                    color: rgba(255,255,255,0.6);
                    font-size: 13.5px;
                    margin: 6px 0 28px;
                }

                .error-box {
                    background: rgba(255, 80, 80, 0.12);
                    border: 1px solid rgba(255, 80, 80, 0.35);
                    border-radius: 12px;
                    padding: 10px 14px;
                    margin-bottom: 18px;
                }
                .error-box p {
                    color: #ff8a8a;
                    font-size: 12.5px;
                    margin: 2px 0;
                }

                .glass-field {
                    margin-bottom: 18px;
                }
                .glass-field label {
                    display: block;
                    font-size: 12.5px;
                    font-weight: 600;
                    color: rgba(255,255,255,0.75);
                    margin-bottom: 6px;
                    letter-spacing: 0.02em;
                }
                .glass-field input {
                    width: 100%;
                    padding: 13px 16px;
                    border-radius: 14px;
                    border: 1px solid rgba(255,255,255,0.16);
                    background: rgba(255,255,255,0.06);
                    color: #fff;
                    font-size: 15px;
                    outline: none;
                    box-sizing: border-box;
                    backdrop-filter: blur(10px);
                    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
                }
                .glass-field input::placeholder {
                    color: rgba(255,255,255,0.35);
                }
                .glass-field input:focus {
                    border-color: #ff6b35;
                    background: rgba(255,255,255,0.1);
                    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.25);
                }

                .login-btn {
                    width: 100%;
                    margin-top: 8px;
                    padding: 14px;
                    border: none;
                    border-radius: 16px;
                    background: linear-gradient(135deg, #ff6b35 0%, #ff8f5c 100%);
                    color: #1c1c1e;
                    font-weight: 700;
                    font-size: 15.5px;
                    cursor: pointer;
                    box-shadow: 0 6px 20px rgba(255, 107, 53, 0.35);
                    transition: transform 0.15s ease, box-shadow 0.15s ease;
                }
                .login-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 24px rgba(255, 107, 53, 0.45);
                }
                .login-btn:active {
                    transform: translateY(0);
                }
                .login-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }

                .switch-line {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 13.5px;
                    color: rgba(255,255,255,0.55);
                }
                .switch-line a {
                    color: #ff6b35;
                    font-weight: 600;
                    text-decoration: none;
                }
                .switch-line a:hover {
                    text-decoration: underline;
                }

                @media (max-width: 420px) {
                    .login-card {
                        padding: 32px 22px 26px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .glow-1, .glow-2, .glow-3 {
                        animation: none;
                    }
                }
            `}</style>

        </div>
    )
}