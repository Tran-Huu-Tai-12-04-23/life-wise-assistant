const FolderIcon = ({ size, color, ...props }) => (
  <svg
    width={size || 17}
    height={size || 16}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.3851 7.33325V11.3333C14.3851 13.9999 13.7184 14.6666 11.0518 14.6666H4.38509C1.71842 14.6666 1.05176 13.9999 1.05176 11.3333V4.66659C1.05176 1.99992 1.71842 1.33325 4.38509 1.33325H5.38509C6.38509 1.33325 6.60509 1.62659 6.98509 2.13325L7.98509 3.46659C8.23842 3.79992 8.38509 3.99992 9.05176 3.99992H11.0518C13.7184 3.99992 14.3851 4.66659 14.3851 7.33325Z"
      stroke={color || '#787486'}
      strokeMiterlimit={10}
    />
    <path
      d="M5.38501 1.33325H11.385C12.7183 1.33325 13.385 1.99992 13.385 3.33325V4.25325"
      stroke={color || '#787486'}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.38509 10H6.05176"
      stroke={color || '#787486'}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default FolderIcon;
