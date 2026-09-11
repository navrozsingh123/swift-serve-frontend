import React from 'react'
import ReactDOM from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '55%',
    left: '50%',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
    backdropFilter: 'blur(24px) saturate(180%)',
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    height: '85%',
    width: '90%',
    overflowY: 'auto',
    borderRadius: '20px',
    padding: '20px',
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .55)',
    zIndex: 1000
}

export default function Modal({ children, onClose }) {
    return ReactDOM.createPortal(
        <>
            <div style={OVERLAY_STYLES} onClick={onClose} />
            <div style={MODAL_STYLES}>
                <button
                    className="btn btn-danger"
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        zIndex: 1001,
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    X
                </button>
                {children}
            </div>
        </>,
        document.getElementById('cart-root')
    )
}