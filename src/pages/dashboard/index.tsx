import { Col, Row, Button } from "reactstrap";
import {
  CardComponent,
  InputFileComponent,
  PaginationComponent,
  TableComponent,
} from "../../components";
import ModalComponent from "../../components/modal";
import { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import {
  Client,
  DataExcel,
  dataMapping,
  headsWidthKeys,
} from "./dashboard.config";
import {
  getPaginate,
  PagedData,
  nextPage,
  prevPage,
} from "../../helpers/paginated";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [clients, setClients] = useState<Client[]>([]);
  const [pagedData, setPagedData] = useState<PagedData<Client>>({
    data: [],
    totalPages: 10,
  });

  useEffect(() => {
    if (pagedData.data.length > 0) {
      createPagination(clients);
    }
  }, [page]);
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
        createPagination(formattedData);
        toggleModal();
      }
    };
    reader.readAsArrayBuffer(file);
  };
  const createPagination = (clients: Client[]) => {
    const paginate = getPaginate(clients, page, 10);
    setPagedData(paginate);
  };

  const changeToNextPage = () => {
    const numberPagedData = nextPage(clients, page, 10);
    setPagedData(numberPagedData);
  };
  const changeToPrevPage = () => {
    const numberPagedData = prevPage(clients, page, 10);
    setPagedData(numberPagedData);
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
      <TableComponent headsWidthKeys={headsWidthKeys} data={pagedData.data} />
      {pagedData.data.length > 0 && (
        <PaginationComponent
          page={page}
          totalPages={pagedData.totalPages}
          setPage={setPage}
          size="sm"
          changeToNextPage={changeToNextPage}
          changeToPrevPage={changeToPrevPage}
        />
      )}
    </div>
  );
};

export default Dashboard;
