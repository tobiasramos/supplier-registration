"use client";
import { Button, Input, message, Modal } from "antd";
import { useState } from "react";
import { useStore } from "../../../../store";
import styles from "./AddSuppliers.module.css";

const AddSuppliers = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    handleCreateSuppliers();
  };
  const handleCancel = () => {
    setOpen(false);
    setFormData({
      name: "",
      cnpj: 0,
      reason_social: "",
      address: "",
      telephone: "",
      email: "",
      responsible: "",
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    cnpj: 0,
    reason_social: "",
    address: "",
    telephone: "",
    email: "",
    responsible: "",
  });

  const { createSuppliers } = useStore();

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Cadastro realizado com sucesso.",
    });
  };
  const error = (content?: string) => {
    messageApi.open({
      type: "error",
      content: "Não foi possível cadastrar o fornecedor",
    });
  };

  const validations = () => {
    const {
      name,
      cnpj,
      reason_social,
      address,
      telephone,
      email,
      responsible,
    } = formData;

    if (
      !name ||
      !cnpj ||
      !reason_social ||
      !address ||
      !telephone ||
      !email ||
      !responsible
    ) {
      error();
      return false;
    }
    return true;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateSuppliers = async () => {
    if (!validations()) {
      return;
    }
    try {
      await createSuppliers(formData);
      success();
      setFormData({
        name: "",
        cnpj: 0,
        reason_social: "",
        address: "",
        telephone: "",
        email: "",
        responsible: "",
      });
      setOpen(false);
    } catch (err) {
      error("Os campos não podem estar vazios. Por favor, preencha-os.");
    }
  };

  const render = () => {
    return (
      <div className={styles.container}>
        {contextHolder}
        <Input
          type="name"
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="cnpj"
          placeholder="Cnpj"
          value={formData.cnpj}
          onChange={handleChange}
        />
        <Input
          type="name"
          name="reason_social"
          placeholder="Razão social"
          value={formData.reason_social}
          onChange={handleChange}
        />
        <Input
          type="name"
          name="address"
          placeholder="Endereço"
          value={formData.address}
          onChange={handleChange}
        />
        <Input
          type="name"
          name="telephone"
          placeholder="Telefone"
          value={formData.telephone}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="name"
          name="responsible"
          placeholder="resposável"
          value={formData.responsible}
          onChange={handleChange}
        />
      </div>
    );
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Adicionar fornecedor
      </Button>
      <Modal
        title="Adicionar fornecedor"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {render()}
      </Modal>
    </div>
  );
};

export default AddSuppliers;
