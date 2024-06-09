import styles from "./Form.module.css";
import { Input } from "antd";

interface FormProps {
  formDataSupplier: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const Form = ({ formDataSupplier, handleChange }: FormProps) => {
  return (
    <div className={styles.container}>
      <Input
        type="text"
        name="name"
        placeholder="Nome"
        value={formDataSupplier.name}
        onChange={handleChange}
      />

      <Input
        type="number"
        name="cnpj"
        placeholder="Cnpj"
        value={formDataSupplier.cnpj}
        onChange={handleChange}
      />
      <Input
        type="name"
        name="reason_social"
        placeholder="Razão social"
        value={formDataSupplier.reason_social}
        onChange={handleChange}
      />
      <Input
        type="name"
        name="address"
        placeholder="Endereço"
        value={formDataSupplier.address}
        onChange={handleChange}
      />
      <Input
        type="name"
        name="telephone"
        placeholder="Telefone"
        value={formDataSupplier.telephone}
        onChange={handleChange}
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formDataSupplier.email}
        onChange={handleChange}
      />
      <Input
        type="name"
        name="responsible"
        placeholder="resposável"
        value={formDataSupplier.responsible}
        onChange={handleChange}
      />
    </div>
  );
};

export default Form;
