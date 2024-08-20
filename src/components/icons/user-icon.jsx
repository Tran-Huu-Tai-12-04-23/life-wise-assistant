const UserIcon = ({ size, color, ...props }) => (
  <svg
    width={size || 17}
    height={size || 17}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.59033 8.30245C6.52239 8.29565 6.44085 8.29565 6.36611 8.30245C4.749 8.24809 3.46482 6.92315 3.46482 5.29244C3.46482 3.62777 4.81015 2.27564 6.48162 2.27564C8.1463 2.27564 9.49842 3.62777 9.49842 5.29244C9.49163 6.92315 8.20745 8.24809 6.59033 8.30245Z"
      stroke={color || '#787486'}
      strokeWidth={1.35892}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5164 3.63456C12.8346 3.63456 13.8945 4.70131 13.8945 6.01267C13.8945 7.29685 12.8753 8.34321 11.6047 8.39078C11.5504 8.38398 11.4892 8.38398 11.4281 8.39078"
      stroke={color || '#787486'}
      strokeWidth={1.35892}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.19303 10.8097C1.54874 11.9104 1.54874 13.7042 3.19303 14.7981C5.06155 16.0483 8.12591 16.0483 9.99442 14.7981C11.6387 13.6974 11.6387 11.9036 9.99442 10.8097C8.13271 9.56625 5.06834 9.56625 3.19303 10.8097Z"
      stroke={color || '#787486'}
      strokeWidth={1.35892}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.8278 14.5059C13.317 14.404 13.779 14.2069 14.1595 13.9148C15.2195 13.1198 15.2195 11.8085 14.1595 11.0135C13.7858 10.7281 13.3306 10.5379 12.8482 10.4292"
      stroke={color || '#787486'}
      strokeWidth={1.35892}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default UserIcon;
