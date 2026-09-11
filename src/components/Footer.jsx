import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#2b2b2b', color: '#f0f0f0' }} className="mt-5">
            <div className="container py-5">
                <div className="row gy-4">

                    {/* Brand */}
                    <div className="col-md-4">
                        <h4 className="fw-bold mb-3">
                            Swift<span style={{ color: '#ff6b35' }}>Serve</span>
                        </h4>
                        <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                            Fresh food, delivered fast. Order from your favorite local restaurants in minutes.
                        </p>
                        <div className="d-flex gap-3 mt-3">
                            <a href="#" className="text-light fs-5"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-light fs-5"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-light fs-5"><i className="bi bi-twitter-x"></i></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-2">
                        <h6 className="fw-semibold mb-3">Company</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
                            <li className="mb-2"><Link to="/menu" className="text-secondary text-decoration-none">Menu</Link></li>
                            <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none">About Us</Link></li>
                            <li className="mb-2"><Link to="/contact" className="text-secondary text-decoration-none">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-md-3">
                        <h6 className="fw-semibold mb-3">Support</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/faq" className="text-secondary text-decoration-none">FAQs</Link></li>
                            <li className="mb-2"><Link to="/orders" className="text-secondary text-decoration-none">Track Order</Link></li>
                            <li className="mb-2"><Link to="/help" className="text-secondary text-decoration-none">Help Center</Link></li>
                            <li className="mb-2"><Link to="/terms" className="text-secondary text-decoration-none">Terms & Privacy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-3">
                        <h6 className="fw-semibold mb-3">Get in Touch</h6>
                        <p className="text-secondary mb-2" style={{ fontSize: '0.9rem' }}>
                            <i className="bi bi-envelope me-2"></i>support@swiftserve.com
                        </p>
                        <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                            <i className="bi bi-telephone me-2"></i>+91 98765 43210
                        </p>
                    </div>

                </div>

                <hr className="my-4 opacity-100" style={{ borderColor: '#444' }} />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-secondary" style={{ fontSize: '0.85rem' }}>
                    <span>© {new Date().getFullYear()} SwiftServe. All rights reserved.</span>
                    <span>Made with ❤️ for food lovers</span>
                </div>
            </div>
        </footer>
    )
}