import { Supplier } from "@/app/interface/Supplier";
import axios from "axios";
import { create } from "zustand";

type StoreState = {
  suppliers: Supplier[];
  createSuppliers: (suppliersData: Supplier) => Promise<void>;
  getAllSupplier: () => Promise<void>;
  deleteSupplier: (supplierId: string) => Promise<void>;
  updateSupplier: (supplierId: string, updatedData: Supplier) => Promise<void>;
};

export const useStore = create<StoreState>((set) => ({
  suppliers: [],
  createSuppliers: async (suppliersData: any) => {
    try {
      await axios.post("http://localhost:3003/suppliers", suppliersData);
    } catch (error: any) {
      console.log(error);
    }
  },

  getAllSupplier: async () => {
    try {
      const response = await axios.get("http://localhost:3003/suppliers");
      set({ suppliers: response.data });
    } catch (error) {
      console.log(error);
    }
  },

  deleteSupplier: async (supplierId: string) => {
    try {
      await axios.delete(`http://localhost:3003/suppliers/${supplierId}`);
      const response = await axios.get("http://localhost:3003/suppliers");
      set({ suppliers: response.data });
    } catch (error) {
      console.log(error);
    }
  },

  updateSupplier: async (supplierId: string, updatedData: Supplier) => {
    try {
      await axios.put(`http://localhost:3003/suppliers/${supplierId}`, updatedData);
      const response = await axios.get("http://localhost:3003/suppliers");
      set({ suppliers: response.data });
    } catch (error) {
      console.log(error);
    }
  },
}));
