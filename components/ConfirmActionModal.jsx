import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";

const ConfirmActionModal = ({
  showModal,
  onClose,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="flex h-[250px] w-[500px] flex-col justify-around rounded-2xl bg-secondary px-4">
        <div className="flex items-center justify-between">
          <div></div>
          <h1 className="text-primary">{title}</h1>
          <button
            className="text-2xl text-white hover:text-[#AAA]"
            onClick={() => onClose()}
            aria-label="Close modal"
          >
            <FaXmark />
          </button>
        </div>

        <div className="text-primary">
          {message.split("\n").map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>

        <div className="m-2 flex gap-2 place-self-end">
          <button
            className="mr-2 rounded-md bg-primary px-4 py-2 hover:bg-[#A2D004]"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmButtonText}
          </button>
          <button
            className="rounded-md border border-white px-4 py-2 text-white hover:text-[#AAA]"
            onClick={() => onCancel()}
          >
            {cancelButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;
