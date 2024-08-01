import { Col, Row } from "reactstrap";
import { CardComponent } from "../../components";
import {
  Client,
  highestCurrentBalance,
  lowerCurrentBalance,
  PersonBalance,
  sumAvailableBalance,
  sumCreditLimit,
  sumCurrentBalance,
  sumDefeatedBalance,
} from "./dashboard.config";
import { FC, useEffect, useState } from "react";

interface FinancesProps {
  clients: Client[];
}
const Finances: FC<FinancesProps> = ({ clients }) => {
  const [personHighestBalance, setPersonHighestBalance] =
    useState<PersonBalance>();
  const [personLowerBalance, setPersonLowerBalance] = useState<PersonBalance>();

  useEffect(() => {
    if (clients.length > 0) {
      setPersonHighestBalance(highestCurrentBalance(clients));
      setPersonLowerBalance(lowerCurrentBalance(clients));
    }
  }, [clients]);
  return (
    <>
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
    </>
  );
};

export default Finances;
