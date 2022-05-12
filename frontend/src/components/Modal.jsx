import { useState } from "react";
import { Dialog } from "@headlessui/react";
import PropTypes from "prop-types";

function Modal({ title }) {
  console.log(title);
  let [isOpen, setIsOpen] = useState(false);

  const save = () => {
    console.log("saved");
  };
  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => save()}> Save</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
};

export default Modal;
