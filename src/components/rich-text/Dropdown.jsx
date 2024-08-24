export const Dropdown = ({ list, className }) => (
  <select className={className}>
    {Array.isArray(list) && list.map((item, index) => <option key={index} value={item} />)}
  </select>
);

export default Dropdown;
