const ListIcon = ({ color, size, ...props }) => (
  <svg
    width={size || 36}
    height={size || 36}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6 10.5H30" stroke={color || '#65676D'} strokeWidth={2.25} strokeMiterlimit={10} />
    <path d="M6 18H30" stroke={color || '#65676D'} strokeWidth={2.25} strokeMiterlimit={10} />
    <path d="M6 25.5H30" stroke={color || '#65676D'} strokeWidth={2.25} strokeMiterlimit={10} />
  </svg>
);
export default ListIcon;
