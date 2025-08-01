import Button from "./Button";
import "./Selection.css";

const Selection = ({
  className,
  items,
  selectedItems,
  multiple = true,
  handleSelectionChange,
}) => {

  function handleSelection(item) {
    // when multiple selection allowed
    if (multiple) {
      if (selectedItems.includes(item)) {
        handleSelectionChange([...selectedItems].filter((val)=>val!=item));
      } else {
        handleSelectionChange([...selectedItems, item])
      }
    }
    // when only one selection is allowed
    else {
      handleSelectionChange([item])
    }
  }



  return (
    <div className={`${className} selection`}>
      {items.map((item, index) => {
        return (
          <Button
            first={index == 0}
            last={index == items.length - 1}
            selected={selectedItems.includes(item)}
            handleSelection={handleSelection}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};

export default Selection;
