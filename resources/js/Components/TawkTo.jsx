import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

function cleanupTawkTo() {
    const elements = document.querySelectorAll('[class*="tawk-"], iframe[title*="chat"], #tawk-script');
    elements.forEach(element => element.remove());
    
    delete window.Tawk_API;
    delete window.Tawk_LoadStart;
}

export default function TawkTo() {
    const { auth } = usePage().props;

    useEffect(() => {
        // Initialize and set visitor data first
        window.Tawk_API = window.Tawk_API || {};
        
        // Set visitor information before loading the script
        if (auth && auth.user) {
            window.Tawk_API.visitor = {
                name: `${auth.user.firstName} ${auth.user.lastName}`,
                email: auth.user.email,
                phone: auth.user.phone,
                // You can add more visitor properties here
                hash: 'optional-hash-value' // If you're using secure mode
            };
        }

        // Set the load start time
        window.Tawk_LoadStart = new Date();

        // Create and append the script
        const script = document.createElement("script");
        script.id = 'tawk-script';
        script.async = true;
        script.src = 'https://embed.tawk.to/673211fe4304e3196ae02e0d/1icdpciq7';
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        
        script.onload = () => {
            console.log('Tawk.to script loaded successfully');
            
            const showWidget = () => {
                if (window.Tawk_API && window.Tawk_API.showWidget) {
                    // Additional configurations can be set here
                    window.Tawk_API.onLoad = function() {
                        console.log('Chat widget loaded');
                        window.Tawk_API.showWidget();
                    };
                } else {
                    setTimeout(showWidget, 100);
                }
            };

            showWidget();
        };

        // Check if script already exists and remove it
        const existingScript = document.getElementById('tawk-script');
        if (existingScript) {
            existingScript.remove();
        }

        // Add the script to the document
        document.head.appendChild(script);

        // Cleanup on unmount
        return () => {
            cleanupTawkTo();
        };
    }, [auth]); // Add auth as a dependency

    return null;
}

export { cleanupTawkTo };