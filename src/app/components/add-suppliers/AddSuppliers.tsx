"use client";
import { Button, message, Modal } from "antd";
import { useState } from "react";
import { useStore } from "../../../../store";
import Form from "../form-supplier/Form";
import {
  validateCNPJ,
  validateEmail,
  validatePhoneNumber,
} from "@/app/utils/validationUtils";

const AddSuppliers = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
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
      cnpj: "",
      reason_social: "",
      address: "",
      telephone: "",
      email: "",
      responsible: "",
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
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

    if (!validateCNPJ(cnpj)) {
      errorMessage("Por favor, forneça um CNPJ válido.");
      return false;
    }

    if (!validatePhoneNumber(telephone)) {
      errorMessage("Por favor, forneça um telefone válido.");
      return false;
    }

    if (!validateEmail(email)) {
      errorMessage("Por favor, forneça um email válido.");
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
    if (confirmLoading) return;
    if (!validations()) {
      return;
    }
    setConfirmLoading(true);
    try {
      await createSuppliers(formData);
      getAllSupplier();
      successMessage();
      setFormData({
        name: "",
        cnpj: "",
        reason_social: "",
        address: "",
        telephone: "",
        email: "",
        responsible: "",
      });
      setOpen(false);
    } catch (err) {
      errorMessage("Não foi possível cadastrar o fornecedor.");
    } finally {
      setConfirmLoading(false); 
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Adicionar fornecedor
      </Button>
      <Modal
        title={
          <span style={{ color: "#007FFF", fontWeight: "800" }}>
            Adicionar fornecedor
          </span>
        }
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
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
