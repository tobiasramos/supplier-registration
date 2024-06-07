import axios from "axios";
import { create } from "zustand";

export const useStore = create((set: any) => ({
  createSuppliers: async (suppliersData: any) => {
    try {
      await axios.post("http://localhost:3003/suppliers", suppliersData);
    } catch (error: any) {
      console.log(error);
    }
  },
}));
