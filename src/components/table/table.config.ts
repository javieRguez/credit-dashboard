
interface Item {
    key: string;
    label: string;
}
export interface TableProps<T> {
    headsWithKeys: Item[];
    data: T[];
}