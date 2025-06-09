// Mock Invoice Service
let invoices = [
  { id: 1, code: "HD001", amount: 1000000 },
  { id: 2, code: "HD002", amount: 2000000 },
];
let idCounter = 3;

export const getAllInvoices = async () => [...invoices];
export const getInvoiceById = async (id) => invoices.find((i) => i.id === id);
export const createInvoice = async (data) => {
  const newInvoice = { ...data, id: idCounter++ };
  invoices.push(newInvoice);
  return newInvoice;
};
export const updateInvoice = async (id, data) => {
  invoices = invoices.map((i) => (i.id === id ? { ...i, ...data } : i));
  return invoices.find((i) => i.id === id);
};
export const removeInvoice = async (id) => {
  invoices = invoices.filter((i) => i.id !== id);
  return true;
};
