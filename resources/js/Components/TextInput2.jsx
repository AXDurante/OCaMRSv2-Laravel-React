import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput2(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={`form-control w-100 inputText3 ${className}`} // Keep 'inputText3' class
            ref={input}
        />
    );
});
