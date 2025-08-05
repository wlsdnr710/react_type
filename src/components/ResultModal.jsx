const ResultModal = ({ ref, close }) => {

  return (
    <dialog ref={ref}>
      temporary text
      <button onClick={close}>close</button>
    </dialog>
  );
};

export default ResultModal;
