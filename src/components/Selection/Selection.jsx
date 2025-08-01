import Button from "./Button";

const Selection = ({ list }) => {
  function handleSelection() {
    //
  }

  return (
    <>
      {list.map((item, index) => {
        return (
          <Button
            first={index == 0}
            last={index == list.length - 1}
            handleSelection={handleSelection}
          >
            {item}
          </Button>
        );
      })}
    </>
  );
};

export default Selection;
