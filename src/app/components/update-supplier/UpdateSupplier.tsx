"use client";
import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useStore } from "../../../../store";
import Form from "../form-supplier/Form";
import { Supplier } from "@/app/interface/Supplier";
import {
  validateCNPJ,
  validateEmail,
  validatePhoneNumber,
} from "@/app/utils/validationUtils";

interface UpdateSupplierProps {
  supplier: Supplier | null;
  visible: boolean;
  onClose: () => void;
}

const UpdateSupplier = ({
  supplier,
  visible,
  onClose,
}: UpdateSupplierProps) => {
  const { updateSupplier, getAllSupplier } = useStore();
  const [formData, setFormData] = useState<Supplier | null>(supplier);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setFormData(supplier);
  }, [supplier]);

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: "Fornecedor atualizado com sucesso.",
    });
  };

  const errorMessage = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const validations = () => {
    if (!formData) return false;
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

  const handleChangeUpdate = (e: any) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpdateSupplier = async () => {
    if (!validations()) {
      return;
    }

    if (!formData) return;
    try {
      await updateSupplier(formData.id!, formData);
      getAllSupplier();
      successMessage();
      onClose();
    } catch (err) {
      errorMessage("Não foi possível atualizar o fornecedor.");
    }
  };

  return (
    <Modal
      title="Atualizar Fornecedor"
      open={visible}
      onOk={handleUpdateSupplier}
      onCancel={onClose}
      okText="Atualizar"
    >
      {contextHolder}
      {formData && (
        <Form formDataSupplier={formData} handleChange={handleChangeUpdate} />
      )}
    </Modal>
  );
};

export default UpdateSupplier;
