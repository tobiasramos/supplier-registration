"use client";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import { useStore } from "../../../../store";
import { useEffect, useState } from "react";
import { Supplier } from "@/app/interface/Supplier ";
import AddSuppliers from "../add-suppliers/AddSuppliers";
import styles from "./listSupplier.module.css";
import DeleteSupplier from "../delete-supplier/DeleteSupplier";

const ListSupplier = () => {
  const { suppliers, getAllSupplier, deleteSupplier } = useStore();
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
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

  const handleDeleteModal = (supplier: any) => {
    setSelectedSupplier(supplier);
    setDeleteModalVisible(true);
  };

  const handleCancelDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleDelete = async () => {
    if (selectedSupplier && selectedSupplier.id) {
      await deleteSupplier(selectedSupplier.id);
      setDeleteModalVisible(false);
      successMessage();
    }
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
        <Button onClick={() => handleDeleteModal(record)}>Excluir</Button>
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
        visible={deleteModalVisible}
        handleCancel={handleCancelDeleteModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ListSupplier;
