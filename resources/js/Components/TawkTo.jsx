import { useEffect } from 'react';

function cleanupTawkTo() {
    const elements = document.querySelectorAll('[class*="tawk-"], iframe[title*="chat"], #tawk-script');
    elements.forEach(element => element.remove());
    
    delete window.Tawk_API;
    delete window.Tawk_LoadStart;
}

export default function TawkTo() {
    useEffect(() => {
        // Check if Tawk is already initialized
        if (!window.Tawk_API) {
            console.log('TawkTo component mounted');
            
            // Initialize Tawk variables
            window.Tawk_API = window.Tawk_API || {};
            window.Tawk_LoadStart = new Date();

            // Create and append the script immediately
            const script = document.createElement("script");
            script.id = 'tawk-script';
            script.async = true;
            script.src = 'https://embed.tawk.to/673211fe4304e3196ae02e0d/1icdpciq7';
            script.charset = 'UTF-8';
            script.setAttribute('crossorigin', '*');
            
            // Add event listeners to monitor script loading
            script.onload = () => {
                console.log('Tawk.to script loaded successfully');
                
                // Ensure the widget is shown after script loads
                if (window.Tawk_API) {
                    window.Tawk_API.onLoad = function() {
                        console.log('Chat widget loaded');
                        window.Tawk_API.showWidget();
                    };

                    // Fallback to show widget if it's not visible after a short delay
                    setTimeout(() => {
                        if (window.Tawk_API && window.Tawk_API.showWidget) {
                            window.Tawk_API.showWidget();
                        }
                    }, 1000);
                }
            };
            
            script.onerror = (error) => {
                console.error('Error loading Tawk.to script:', error);
            };

            // Insert the script at the beginning of the head for faster loading
            const firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(script, firstScript);
        } else {
            // If Tawk_API exists, ensure the widget is shown
            if (window.Tawk_API && window.Tawk_API.showWidget) {
                window.Tawk_API.showWidget();
            }
        }

        // Cleanup function
        return () => {
            cleanupTawkTo();
        };
    }, []);

    return null;
}

export { cleanupTawkTo };