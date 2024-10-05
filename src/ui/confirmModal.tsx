import React from 'react';
import { Modal, Button } from 'rsuite';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, onClose, onConfirm, title = 'Confirm Action', message = 'Are you sure?' }) => {
  return (
    <Modal className='mt-20 mb-10 min-h-[150px]' open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm} appearance="primary" className='px-6 bg-[#28a745] hover:bg-[#1caf68]'>
          Confirm
        </Button>
        <Button onClick={onClose} appearance="subtle" className='px-6'>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
