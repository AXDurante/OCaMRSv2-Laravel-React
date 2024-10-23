import { useState } from "react";

export default function LoginButton({ className = '', disabled, children, ...props }) {
    const handleClick = (event) => {
        const button = event.currentTarget;

        // Remove any existing ripple elements
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        // Create a new ripple element
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.className = 'ripple';
        button.appendChild(ripple);
    };

    return (
        <button
            type="submit" // Ensure it submits the form
            className={`theButton ${className}`}
            onClick={handleClick}
            disabled={disabled}
            {...props} // Spread additional props like event handlers
        >
            {children}
        </button>
    );
}
