

export interface PaginationProps {
    size: "sm" | "lg";
    totalPages: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    changeToPrevPage: () => void;
    changeToNextPage: () => void;
}

