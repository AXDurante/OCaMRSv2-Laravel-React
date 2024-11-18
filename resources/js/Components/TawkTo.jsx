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
        // Add error handling and retry logic
        const loadTawkTo = (retryCount = 0) => {
            try {
                window.Tawk_API = window.Tawk_API || {};
                window.Tawk_LoadStart = new Date();

                // Set visitor information before loading the script
                if (auth && auth.user) {
                    window.Tawk_API.visitor = {
                        name: `${auth.user.firstName} ${auth.user.lastName}`,
                        email: auth.user.email,
                        phone: auth.user.phone,
                    };
                }

                const script = document.createElement("script");
                script.id = "tawk-script";
                script.async = true;
                // Use direct widget URL format
                script.src =
                    "https://embed.tawk.to/673211fe4304e3196ae02e0d/1icdpciq7";
                script.charset = "UTF-8";
                script.setAttribute("crossorigin", "anonymous"); // Changed from "*"

                script.onload = () => {
                    console.log("Tawk.to script loaded successfully");
                    if (window.Tawk_API) {
                        window.Tawk_API.onLoad = function () {
                            console.log("Chat widget loaded");
                        };
                    }
                };

                script.onerror = (error) => {
                    console.error("Error loading Tawk.to script:", error);
                    // Retry logic
                    if (retryCount < 3) {
                        setTimeout(() => loadTawkTo(retryCount + 1), 2000);
                    }
                };

                // Clean up any existing script
                const existingScript = document.getElementById("tawk-script");
                if (existingScript) {
                    existingScript.remove();
                }

                document.head.appendChild(script);
            } catch (error) {
                console.error("Error in TawkTo setup:", error);
            }
        };

        loadTawkTo();

        return () => {
            cleanupTawkTo();
        };
    }, [auth]);

    // Simplified return - we don't need the script tag here
    return <div id="tawk-test"></div>;
}

export { cleanupTawkTo };
