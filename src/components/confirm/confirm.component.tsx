interface IProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = (props: IProps) => {
  if (!props.isOpen) return null;

  return (
    <div>
      <p>Are you sure you want to save this appointment?</p>
      <div className="flex justify-between">
        <button
          onClick={props.onCancel}
          className="bg-red-500 text-white p-2 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={props.onConfirm}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;
