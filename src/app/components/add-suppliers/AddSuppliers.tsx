"use client";
import { Button, message, Modal } from "antd";
import { useState } from "react";
import { useStore } from "../../../../store";
import Form from "../form-supplier/Form";

const AddSuppliers = () => {
  const [open, setOpen] = useState(false);
  const { createSuppliers, getAllSupplier } = useStore();
  const [messageApi, contextHolder] = message.useMessage();

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

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: "Cadastro realizado com sucesso.",
    });
  };
  const errorMessage = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
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
      errorMessage("Por favor, preencha todos os campos.");
      return false;
    }
    return true;
  };

  const handleChangeAdd = (e: any) => {
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
      getAllSupplier();
      successMessage();
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
      errorMessage("Não foi possível cadastrar o fornecedor.");
    }
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
        okText="Adicionar"
        onCancel={handleCancel}
      >
        {contextHolder}
        <Form formDataSupplier={formData} handleChange={handleChangeAdd} />
      </Modal>
    </div>
  );
};

export default AddSuppliers;
