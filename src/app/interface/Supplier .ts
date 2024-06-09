export interface Supplier {
  id?: string;
  name: string;
  cnpj: number;
  reason_social: string;
  address: string;
  telephone: string;
  email: string;
  responsible: string;
}

export interface ISelectedSupplier {
  id: string;
  name: string;
  cnpj: number;
  reason_social: string;
  address: string;
  telephone: string;
  email: string;
  responsible: string;
}

export interface ISupplierUpdate {
  name: string | undefined;
  cnpj: number | undefined;
  reason_social: string | undefined;
  address: string | undefined;
  telephone: string | undefined;
  email: string | undefined;
  responsible: string | undefined;
}
