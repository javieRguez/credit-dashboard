export interface ModalProps {
    isOpen: boolean;
    toggle: () => void;
    title: string;
    children?: React.ReactNode;
}