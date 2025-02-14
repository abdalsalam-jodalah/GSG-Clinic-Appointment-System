interface IProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = (props: IProps) => {
  if (!props.isOpen) return null;

  return (
    <div>
      <p >Are you sure you want to save?</p>
      <div >
        <button onClick={props.onCancel} >Cancel</button>
        <button onClick={props.onConfirm} >Save</button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
