"use client";
import { Button, Input, message, Table } from "antd";
import { useStore } from "../../../../store";
import { useEffect, useState } from "react";
import { Supplier } from "@/app/interface/Supplier";
import AddSuppliers from "../add-suppliers/AddSuppliers";
import styles from "./listSupplier.module.css";
import DeleteSupplier from "../delete-supplier/DeleteSupplier";
import UpdateSupplier from "../update-supplier/UpdateSupplier";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ListSupplier = () => {
  const { suppliers, getAllSupplier, deleteSupplier } = useStore();
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [modalType, setModalType] = useState<"delete" | "update" | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getAllSupplier();
  }, [getAllSupplier]);

  useEffect(() => {
    const filtered = suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedFilteredSuppliers = filtered.slice().sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

    setFilteredSuppliers(sortedFilteredSuppliers);
  }, [suppliers, searchTerm]);

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: "Fornecedor deletado com sucesso.",
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleModalVisibility = (
    type: "delete" | "update" | null,
    supplier?: Supplier
  ) => {
    setModalType(type);
    setSelectedSupplier(supplier || null);
  };

  const handleDelete = async () => {
    if (selectedSupplier && selectedSupplier.id) {
      await deleteSupplier(selectedSupplier.id);
      handleModalVisibility(null);
      successMessage();
    }
  };

  const formatPhoneNumber = (phoneNumber: any) => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    const formattedPhoneNumber = `(${cleanedPhoneNumber.slice(
      0,
      2
    )}) ${cleanedPhoneNumber.slice(2)}`;
    return formattedPhoneNumber;
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CNPJ",
      dataIndex: "cnpj",
      key: "cnpj",
    },
    {
      title: "Razão Social",
      dataIndex: "reason_social",
      key: "reason_social",
    },
    {
      title: "Endereço",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Telefone",
      dataIndex: "telephone",
      key: "telephone",
      render: (telephone: any) => formatPhoneNumber(telephone),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Responsável",
      dataIndex: "responsible",
      key: "responsible",
    },
    {
      title: "Ação",
      key: "action",
      render: (text: any, record: any) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleModalVisibility("update", record)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleModalVisibility("delete", record)}
          />
        </>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Input
          placeholder="Buscar fornecedor pelo nome"
          value={searchTerm}
          onChange={handleSearch}
        />

        <AddSuppliers />
      </div>

      <Table
        className={styles.list}
        dataSource={filteredSuppliers}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5, className: styles.pagination }}
      />
      {contextHolder}
      <DeleteSupplier
        visible={modalType === "delete"}
        handleCancel={() => handleModalVisibility(null)}
        handleDelete={handleDelete}
      />
      <UpdateSupplier
        supplier={selectedSupplier}
        visible={modalType === "update"}
        onClose={() => handleModalVisibility(null)}
      />
    </div>
  );
};

export default ListSupplier;
