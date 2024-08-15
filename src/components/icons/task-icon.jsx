
const TaskIcon = ({size, color, ...props}) => (
  <svg
    width={size || 17}
    height={size || 17}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.77139 6.15303H12.3386"
      stroke={color || "#787486"}
      strokeWidth={1.35892}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.70144 6.15304L5.21103 6.66263L6.73982 5.13385"
      stroke={color || "#787486"}
      strokeWidth={1.35892}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.77139 10.9093H12.3386"
      stroke={color || "#787486"}
      strokeWidth={1.35892}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.70144 10.9092L5.21103 11.4188L6.73982 9.89006"
      stroke={color || "#787486"}
      strokeWidth={1.35892}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.48162 15.0675H10.5584C13.9557 15.0675 15.3146 13.7086 15.3146 10.3113V6.23456C15.3146 2.83727 13.9557 1.47835 10.5584 1.47835H6.48162C3.08432 1.47835 1.7254 2.83727 1.7254 6.23456V10.3113C1.7254 13.7086 3.08432 15.0675 6.48162 15.0675Z"
      stroke={color || "#787486"}
      strokeWidth={1.35892}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default TaskIcon;
