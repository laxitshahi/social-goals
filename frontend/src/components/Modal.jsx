import { useState } from "react";
import { Dialog } from "@headlessui/react";
import PropTypes from "prop-types";

function Modal({ title, open }) {
  console.log(title);
  let [isOpen, setIsOpen] = useState(open);

  const save = () => {
    console.log("saved");
  };

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="z-50">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm text-center rounded shadow-xl bg-tertiary">
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description></Dialog.Description>

            <section className="formCard">
              <form onSubmit={save}>
                <input className="mr-4 border" />

                <input className="ml-2 border" />

                <button
                  className="p-1 formButton"
                  type="submit"
                  onSubmit={save}
                >
                  Save
                </button>
                <button
                  className="p-1 formButton"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </form>
            </section>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
};

export default Modal;
