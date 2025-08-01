const Button = ({
  first = false,
  last = false,
  selected,
  handleSelection,
  children,
}) => {
  let className = first ? "first" : last ? "last" : "middle";
  className += selected ? " selected" : "";
  return (
    <button className={className} onClick={() => handleSelection(children)}>
      {children}
    </button>
  );
};

export default Button;
