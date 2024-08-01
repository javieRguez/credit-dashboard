export type PagedData<T> = {
    data: T[];
    totalPages: number;
};
export const getPaginate = <T>(data: T[], page: number, itemsPerPage: number): PagedData<T> => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return {
        data: paginatedData,
        totalPages: totalPages
    };
};

export const nextPage = <T>(data: T[], currentPage: number, itemsPerPage: number): PagedData<T> => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const nextPage = currentPage < totalPages ? currentPage + 1 : currentPage;
    return getPaginate(data, nextPage, itemsPerPage);
}

export const prevPage = <T>(data: T[], currentPage: number, itemsPerPage: number): PagedData<T> => {
    const prevPage = currentPage > 1 ? currentPage - 1 : currentPage;
    return getPaginate(data, prevPage, itemsPerPage);
}