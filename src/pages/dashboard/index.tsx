import { Col, Row, Button } from "reactstrap";
import {
  CardComponent,
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
  headsWidthKeys,
  highestCurrentBalance,
  lowerCurrentBalance,
  PersonBalance,
  sumAvailableBalance,
  sumCreditLimit,
  sumCurrentBalance,
  sumDefeatedBalance,
} from "./dashboard.config";
import {
  getPaginate,
  PagedData,
  nextPage,
  prevPage,
} from "../../helpers/paginated";
import CreditCharts from "./charts";
import { numberToPrice } from "../../helpers/currency";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [clients, setClients] = useState<Client[]>([]);
  const [pagedData, setPagedData] = useState<PagedData<Client>>({
    data: [],
    totalPages: 10,
  });
  const [personHighestBalance, setPersonHighestBalance] =
    useState<PersonBalance>();
  const [personLowerBalance, setPersonLowerBalance] = useState<PersonBalance>();

  useEffect(() => {
    if (clients.length > 0) {
      setPersonHighestBalance(highestCurrentBalance(clients));
      setPersonLowerBalance(lowerCurrentBalance(clients));
    }
  }, [clients]);
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
      <div style={{ textAlign: "end" }}>
        <WeatherComponent />
      </div>
      <h3 className="mt-5">Finanzas</h3>
      <Row>
        <Col md="2">
          <CardComponent
            title="Mayor Saldo Actual"
            subtitle={personHighestBalance?.name}
            amount={personHighestBalance?.amount ?? 0}
          />
        </Col>
        <Col md="2">
          <CardComponent
            title="Menor Saldo Actual"
            subtitle={personLowerBalance?.name}
            amount={personLowerBalance?.amount ?? 0}
          />
        </Col>
        <Col md="2">
          <CardComponent
            title="Saldo Actual"
            amount={sumCurrentBalance(clients)}
          />
        </Col>
        <Col md="2">
          <CardComponent
            title="Límite de crédito"
            amount={sumCreditLimit(clients)}
          />
        </Col>
        <Col md="2">
          <CardComponent
            title="Saldo Vencido"
            amount={sumDefeatedBalance(clients)}
          />
        </Col>
        <Col md="2">
          <CardComponent
            title="Saldo Disponible"
            amount={sumAvailableBalance(clients)}
          />
        </Col>
      </Row>
      <h3 className="mt-5">Gráficas</h3>
      <CreditCharts clients={clients} />
      <h3 className="mt-5">Clientes</h3>
      <TableComponent
        headsWidthKeys={headsWidthKeys}
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
