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
        const loadTawkTo = (retryCount = 0) => {
            try {
                // Clear any existing Tawk instances
                cleanupTawkTo();

                // Initialize Tawk variables
                window.Tawk_API = window.Tawk_API || {};
                window.Tawk_LoadStart = new Date();

                // Set visitor information
                if (auth?.user) {
                    window.Tawk_API.visitor = {
                        name: `${auth.user.firstName} ${auth.user.lastName}`,
                        email: auth.user.email,
                        phone: auth.user.phone || "",
                    };
                }

                // Create script element
                const script = document.createElement("script");
                script.id = "tawk-script";
                script.async = true;
                script.defer = true; // Add defer attribute
                script.src =
                    "https://embed.tawk.to/673211fe4304e3196ae02e0d/1icdpciq7";
                script.charset = "UTF-8";
                script.setAttribute("crossorigin", "anonymous");

                // Add error handling
                const handleError = (error) => {
                    console.error("Tawk.to script error:", error);
                    if (retryCount < 3) {
                        console.log(
                            `Retrying Tawk.to load (attempt ${
                                retryCount + 1
                            }/3)`
                        );
                        setTimeout(
                            () => loadTawkTo(retryCount + 1),
                            2000 * (retryCount + 1)
                        );
                    }
                };

                script.onload = () => {
                    console.log("Tawk.to script loaded successfully");
                    if (window.Tawk_API) {
                        window.Tawk_API.onLoad = function () {
                            console.log("Tawk.to widget loaded");
                        };
                        window.Tawk_API.onError = handleError;
                    }
                };

                script.onerror = handleError;

                // Append script to document
                document.body.appendChild(script);
            } catch (error) {
                console.error("Error in TawkTo setup:", error);
                handleError(error);
            }
        };

        // Initial load
        loadTawkTo();

        // Cleanup on unmount
        return () => {
            cleanupTawkTo();
        };
    }, [auth]);

    return null;
}

export { cleanupTawkTo };
