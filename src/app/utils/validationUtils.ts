export const validateCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^a-zA-Z0-9]/g, "");
  if (cnpj.length !== 14) return false;
  if (!/[a-zA-Z]/.test(cnpj) || !/\d/.test(cnpj)) return false;
  return true;
};

export const validatePhoneNumber = (phoneNumber: any): boolean => {
  if (typeof phoneNumber !== "string" && typeof phoneNumber !== "number") {
    return false;
  }
  const cleanedPhoneNumber = phoneNumber.toString().replace(/\D/g, "");
  return cleanedPhoneNumber.length === 11;
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
