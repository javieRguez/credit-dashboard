import { FC } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { CardProps } from "./card.config";

const CardComponent: FC<CardProps> = (props) => {
  return (
    <Card
      style={{
        width: "18rem",
      }}
    >
      <CardBody>
        <CardTitle tag="h6">{props.title}</CardTitle>
        <h4>{props.amount}</h4>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
