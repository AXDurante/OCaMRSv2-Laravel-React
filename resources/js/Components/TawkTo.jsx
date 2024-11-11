import { useEffect } from 'react';

export default function TawkTo() {
    useEffect(() => {
        // Replace TAWK_TO_PROPERTY_ID and TAWK_TO_WIDGET_ID with your actual values from Tawk.to dashboard
        var Tawk_API = window.Tawk_API || {};
        var Tawk_LoadStart = new Date();
        
        (function(){
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/673211fe4304e3196ae02e0d/1hpn0uu2k';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
        })();

        return () => {
            // Cleanup if needed
            delete window.Tawk_API;
            delete window.Tawk_LoadStart;
        };
    }, []);

    return null;
} 