import { FC } from "react";
import { FormGroup, Input } from "reactstrap";
import { InputFileProps } from "./inputFile.config";

const InputFileComponent: FC<InputFileProps> = ({ handleFileUpload }) => {
  return (
    <FormGroup>
      <Input type="file" onChange={handleFileUpload} />
    </FormGroup>
  );
};

export default InputFileComponent;
