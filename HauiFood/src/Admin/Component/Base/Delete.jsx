import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Đảm bảo truy cập an toàn

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="p-6 rounded-lg shadow-lg mx-auto mt-40 text-center bg-gradient-to-t from-yellow-300 to-green-400"
      overlayClassName="fixed inset-0 top-[-25%] bg-white/30 bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-lg font-semibold">Bạn có chắc chắn muốn xóa ?</h2>
      <p className="text-3xl text-red-500 text-center font-bold ">X</p>
      <div className="mt-4 flex justify-center gap-4">
        <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">
          Xóa
        </button>
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
          Hủy
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
