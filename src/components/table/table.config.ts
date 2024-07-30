
interface Item {
    key: string;
    label: string;
}
export interface TableProps<T> {
    headsWidthKeys: Item[];
    data: T[];
}