import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ModalProps } from "./modal.config";
import { FC } from "react";

const ModalComponent: FC<ModalProps> = ({
  title,
  isOpen,
  toggle,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponent;
