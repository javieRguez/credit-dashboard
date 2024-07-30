import { Col, Row, Button } from "reactstrap";
import {
  CardComponent,
  InputFileComponent,
  TableComponent,
} from "../../components";
import ModalComponent from "../../components/modal";
import { useState } from "react";
import { read, utils } from "xlsx";
import {
  Client,
  DataExcel,
  dataMapping,
  headsWidthKeys,
} from "./dashboard.config";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result;
      if (arrayBuffer) {
        const workbook = read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const dataExcel: DataExcel[] =
          utils.sheet_to_json<DataExcel>(worksheet);
        const formattedData = dataMapping(dataExcel);
        setClients(formattedData);
      }
    };
    reader.readAsArrayBuffer(file);
  };
  return (
    <div className=" m-5">
      <ModalComponent
        toggle={toggleModal}
        isOpen={isOpen}
        title="Seleccionar excel con información"
      >
        <InputFileComponent handleFileUpload={handleFileUpload} />
      </ModalComponent>
      <Button color="primary" size="lg" onClick={toggleModal}>
        Cargar Data
      </Button>
      <Row className="mt-5">
        <Col>
          <CardComponent title="Saldo Actual" amount={10000} />
        </Col>
        <Col>
          <CardComponent title="Saldo Actual" amount={10000} />
        </Col>
        <Col>
          <CardComponent title="Saldo Actual" amount={10000} />
        </Col>
        <Col>
          <CardComponent title="Saldo Actual" amount={10000} />
        </Col>
      </Row>
      <TableComponent headsWidthKeys={headsWidthKeys} data={clients} />
    </div>
  );
};

export default Dashboard;
