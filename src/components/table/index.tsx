import { Table } from "reactstrap";
import { TableProps } from "./table.config";

const TableComponent = <T extends Record<string, any>>({
  headsWithKeys,
  data,
}: TableProps<T>): JSX.Element => {
  return (
    <Table size="sm" striped className="mt-5">
      <thead>
        <tr>
          {headsWithKeys.map((item, index) => (
            <th key={index}>{item.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((dataElement, index) => {
          return (
            <tr key={index}>
              {headsWithKeys.map(({ key }, index) => (
                <td className="text-lowercase" key={index}>
                  {dataElement[key]}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableComponent;
