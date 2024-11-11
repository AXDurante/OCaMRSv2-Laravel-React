import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./bootstrap";
import "../css/app.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { useEffect } from "react";
import TawkTo from './Components/TawkTo';

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <GoogleFont />
                <TawkTo />
                <App {...props} />
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});

function GoogleFont() {
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
            "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap";
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return null;
}
