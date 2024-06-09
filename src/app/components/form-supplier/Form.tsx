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
      <div className={styles.formField}>
        <label htmlFor="name">Nome:</label>
        <Input
          type="text"
          name="name"
          placeholder="Digite o nome do fornecedor"
          value={formDataSupplier.name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="cnpj">CNPJ:</label>
        <Input
          type="text"
          name="cnpj"
          placeholder="Digite o CNPJ do fornecedor"
          value={formDataSupplier.cnpj}
          onChange={handleChange}
          maxLength={14}
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="reason_social">Razão Social:</label>
        <Input
          type="text"
          name="reason_social"
          placeholder="Digite a razão social do fornecedor"
          value={formDataSupplier.reason_social}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="address">Endereço:</label>
        <Input
          type="text"
          name="address"
          placeholder="Digite o endereço do fornecedor"
          value={formDataSupplier.address}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formField}>
        {" "}
        <label htmlFor="telephone">Telefone:</label>
        <Input
          type="text"
          name="telephone"
          placeholder="Digite o telefone do fornecedor"
          value={formDataSupplier.telephone}
          onChange={handleChange}
          maxLength={11}
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="email">Email:</label>
        <Input
          type="email"
          name="email"
          placeholder="Digite o email do fornecedor"
          value={formDataSupplier.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="responsible">Responsável:</label>
        <Input
          type="text"
          name="responsible"
          placeholder="Digite o nome do responsável pelo fornecedor"
          value={formDataSupplier.responsible}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Form;
