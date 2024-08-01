import { Col, Row, Button } from "reactstrap";
import {
  InputFileComponent,
  PaginationComponent,
  TableComponent,
  WeatherComponent,
} from "../../components";
import ModalComponent from "../../components/modal";
import { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import {
  Client,
  DataExcel,
  dataMapping,
  headsWithKeysClients,
} from "./dashboard.config";
import {
  getPaginate,
  PagedData,
  nextPage,
  prevPage,
} from "../../helpers/paginated";
import CreditCharts from "./charts";
import { numberToPrice } from "../../helpers/currency";
import ExchangeRate from "./exchangeRate";
import Finances from "./finances";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [clients, setClients] = useState<Client[]>([]);
  const [pagedData, setPagedData] = useState<PagedData<Client>>({
    data: [],
    totalPages: 1,
  });
  const itemsPerPage = 10;

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
    const paginate = getPaginate(clients, page, itemsPerPage);
    setPagedData(paginate);
  };

  const changeToNextPage = () => {
    const numberPagedData = nextPage(clients, page, itemsPerPage);
    setPagedData(numberPagedData);
  };
  const changeToPrevPage = () => {
    const numberPagedData = prevPage(clients, page, itemsPerPage);
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
      <h6>Para iniciar la visualización de datos presione en cargar datos.</h6>
      <Button color="primary" size="lg" onClick={toggleModal}>
        Cargar datos
      </Button>
      <Row className="mt-3">
        <Col md="9">
          <h3 className="mt-5">Tipo de Cambio</h3>

          <ExchangeRate />
        </Col>
        <Col md="3">
          <div className="position-relative">
            <h5>Clima</h5>
            <WeatherComponent />
          </div>
        </Col>
      </Row>

      <h3 className="mt-5">Finanzas</h3>
      <Finances clients={clients} />
      <h3 className="mt-5">Gráficas</h3>
      <CreditCharts clients={clients} />
      <h3 className="mt-5">Clientes</h3>
      <TableComponent
        headsWithKeys={headsWithKeysClients}
        data={pagedData.data.map((client) => ({
          ...client,
          currentBalance: numberToPrice(parseFloat(client.currentBalance)),
          creditLimit: numberToPrice(parseFloat(client.creditLimit)),
          defeatedBalance: numberToPrice(parseFloat(client.defeatedBalance)),
        }))}
      />
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
