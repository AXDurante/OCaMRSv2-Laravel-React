import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

function cleanupTawkTo() {
    const elements = document.querySelectorAll(
        '[class*="tawk-"], iframe[title*="chat"], #tawk-script'
    );
    elements.forEach((element) => element.remove());

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
            };
        }

        window.Tawk_LoadStart = new Date();

        const script = document.createElement("script");
        script.id = "tawk-script";
        script.async = true;
        script.src = "https://embed.tawk.to/673211fe4304e3196ae02e0d/1icdpciq7";
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");

        script.onload = () => {
            console.log("Tawk.to script loaded successfully");

            const showWidget = () => {
                if (window.Tawk_API && window.Tawk_API.showWidget) {
                    window.Tawk_API.onLoad = function () {
                        console.log("Chat widget loaded");
                        window.Tawk_API.showWidget();
                    };
                } else {
                    setTimeout(showWidget, 100);
                }
            };

            showWidget();
        };

        script.onerror = (error) => {
            console.error("Error loading Tawk.to script:", error);
        };

        const existingScript = document.getElementById("tawk-script");
        if (existingScript) {
            existingScript.remove();
        }

        document.head.appendChild(script);

        return () => {
            cleanupTawkTo();
        };
    }, [auth]); // Add auth as a dependency

    return (
        <div id="tawk-test">
            {/* This will help verify if the widget can load directly */}
            <script
                async
                src="https://embed.tawk.to/673211fe4304e3196ae02e0d/1icdpciq7"
            ></script>
        </div>
    );
}

export { cleanupTawkTo };
