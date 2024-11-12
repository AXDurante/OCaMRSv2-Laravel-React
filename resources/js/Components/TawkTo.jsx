import { useEffect } from 'react';

export default function TawkTo() {
    useEffect(() => {
        console.log('TawkTo component mounted');
        
        var Tawk_API = window.Tawk_API || {};
        var Tawk_LoadStart = new Date();
        
        (function(){
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/673211fe4304e3196ae02e0d/1icdpciq7';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            console.log('Tawk.to script added to DOM');
        })();

        return () => {
            console.log('TawkTo component unmounted');
            delete window.Tawk_API;
            delete window.Tawk_LoadStart;
        };
    }, []);

    return null;
} 