import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModals = () => {

    const [isOpen, setIsOpen] = useState(true);

    const onCloseModal = () => {
        console.log('Modal closed');
        setIsOpen(false);
    }

    return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >
        <h2>Hello</h2>
        <hr />
        <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum odio ad necessitatibus, unde deserunt doloremque reiciendis aliquam tempora alias quos cumque molestias atque quas porro voluptas eius esse quaerat nam?
        </p>
        <button onClick={onCloseModal}>Close</button>

    </Modal>
    )
}
