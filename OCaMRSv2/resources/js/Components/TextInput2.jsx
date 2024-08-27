

import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput2({ type = 'text', className = '', isFocused = false, ...props }, ref) {
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
            className={
                'inputText3' 
            }
            ref={input}
        />
    );
});
