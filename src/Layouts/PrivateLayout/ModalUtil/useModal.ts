function UseModal() {
  const handleCloseModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const handleOpenModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };
  return {
    closeModal: handleCloseModal,
    showModal: handleOpenModal,
  };
}

export default UseModal;
