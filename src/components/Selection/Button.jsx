
const Button = ({ first = false, last = false, handleSelection, children }) => {
  let className = first ? "first" : last ? "last" : "middle";
  return (
    <button className={className} onClick={handleSelection}>
      {children}
    </button>
  );
};

export default Button;
