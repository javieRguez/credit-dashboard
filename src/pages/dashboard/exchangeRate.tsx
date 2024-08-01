import { FC, useEffect, useState } from "react";
import { Alert, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { PaginationComponent, TableComponent } from "../../components";
import { headsWithKeysExchangeRate } from "./dashboard.config";
import { isNullOrEmpty } from "../../helpers/isNullOrEmpty";
import {
  getPaginate,
  nextPage,
  PagedData,
  prevPage,
} from "../../helpers/paginated";

interface ExchangeRate {
  startDate: string;
  endDate: string;
  tokenbmx: string;
}

const ExchangeRate: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [exchangeRates, setExchangeRates] = useState<any>(null);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({
    startDate: "",
    endDate: "",
    tokenbmx: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [fixes, setFixes] = useState<any[]>([]);
  const [pagedData, setPagedData] = useState<PagedData<any>>({
    data: [],
    totalPages: 1,
  });
  const itemsPerPage = 10;
  const url = import.meta.env.VITE_EXCHANGE_RATE_API_URL;

  useEffect(() => {
    if (fixes.length > 0) {
      createPagination(fixes);
    }
  }, [page, fixes]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${url}?startDate=${exchangeRate?.startDate}&endDate=${exchangeRate?.endDate}`,
          {
            headers: {
              Authorization: `Bearer ${exchangeRate?.tokenbmx}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }

        const data = await response.json();
        setError(null);
        setFixes(data?.bmx.series[0].datos);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch exchange rate");
      } finally {
        setLoading(false);
      }
    };

    if (
      !isNullOrEmpty(exchangeRate?.startDate) &&
      !isNullOrEmpty(exchangeRate?.endDate) &&
      !isNullOrEmpty(exchangeRate?.tokenbmx)
    ) {
      setLoading(true);
      fetchData();
    }
  }, [exchangeRate]);

  if (loading) return <p>Loading...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExchangeRate({
      ...exchangeRate,
      [e.target.name]: e.target.value,
    });
  };

  const createPagination = (fixes: any[]) => {
    const paginate = getPaginate(fixes, page, itemsPerPage);
    setPagedData(paginate);
  };

  const changeToNextPage = () => {
    const numberPagedData = nextPage(fixes, page, itemsPerPage);
    setPagedData(numberPagedData);
  };

  const changeToPrevPage = () => {
    const numberPagedData = prevPage(fixes, page, itemsPerPage);
    setPagedData(numberPagedData);
  };

  return (
    <div className="container-fluid">
      {error && (
        <Alert color="danger">This is a primary alert — check it out!</Alert>
      )}
      <h6 className="text-secondary">FIX - MXN por USD -</h6>
      <Row>
        <Col md="2">
          <FormGroup>
            <Label for="startDate">Fecha Inicio</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={exchangeRate.startDate}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md="2">
          <FormGroup>
            <Label for="endDate">Fecha Final</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={exchangeRate.endDate}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup className="w-25">
        <Label for="tokenbmx">Token</Label>
        <Input
          id="tokenbmx"
          name="tokenbmx"
          placeholder="Ingrese el token"
          type="text"
          onChange={handleChange}
          value={exchangeRate.tokenbmx}
        />
      </FormGroup>
      <div className="w-50">
        <TableComponent
          headsWithKeys={headsWithKeysExchangeRate}
          data={pagedData.data ?? []}
        />
        {fixes.length > 0 && (
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
    </div>
  );
};

export default ExchangeRate;
