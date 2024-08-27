export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`titleLabel pb-1` + className}>
            {value ? value : children}
        </label>
    );
}
