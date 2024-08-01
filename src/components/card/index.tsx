import { FC } from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { CardProps } from "./card.config";
import { numberToPrice } from "../../helpers/currency";

const CardComponent: FC<CardProps> = ({ title, subtitle, amount }) => {
  const amountCurrency = numberToPrice(amount);
  return (
    <Card className="w-100 h-100">
      <CardBody>
        <CardTitle tag="h6">{title}</CardTitle>
        <CardSubtitle tag="span">{subtitle}</CardSubtitle>
        <h4>{amountCurrency}</h4>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
