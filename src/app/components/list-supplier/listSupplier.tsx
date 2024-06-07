"use client";
import { Input, Space, Table } from "antd";
import { useStore } from "../../../../store";
import { useEffect, useState } from "react";
import { Supplier } from "@/app/interface/Supplier ";
import AddSuppliers from "../add-suppliers/AddSuppliers";
import styles from "./listSupplier.module.css";

const ListSupplier = () => {
  const { suppliers, getAllSupplier } = useStore();
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    getAllSupplier();
  }, [getAllSupplier]);

  useEffect(() => {
    setFilteredSuppliers(
      suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [suppliers, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
    </div>
  );
};

export default ListSupplier;
