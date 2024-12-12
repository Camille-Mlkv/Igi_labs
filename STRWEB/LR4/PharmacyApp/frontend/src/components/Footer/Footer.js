import React from 'react'

export const Footer = () => {
    return (
        <footer
            style={{
                width: "100%",
                position: "relative",
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px 0",
                background: "linear-gradient(90deg, #2ecc71, #27ae60)",
                color: "#fff",
                fontSize: "16px",
                boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
            }}
        >
            © {new Date().getFullYear()} LifeLine. All rights reserved.
        </footer>
      );
}
