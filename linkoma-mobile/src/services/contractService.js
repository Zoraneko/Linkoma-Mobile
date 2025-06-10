// Mock Contract Service
let contracts = [
  {
    id: 1,
    code: "HĐ001",
    apartment: "A-101",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: 2,
    code: "HĐ002",
    apartment: "B-202",
    startDate: "2024-02-01",
    endDate: "2024-12-31",
  },
];
let idCounter = 3;

export const getAllContracts = async () => [...contracts];
export const getContractById = async (id) => contracts.find((c) => c.id === id);
export const createContract = async (data) => {
  const newContract = { ...data, id: idCounter++ };
  contracts.push(newContract);
  return newContract;
};
export const updateContract = async (id, data) => {
  contracts = contracts.map((c) => (c.id === id ? { ...c, ...data } : c));
  return contracts.find((c) => c.id === id);
};
export const removeContract = async (id) => {
  contracts = contracts.filter((c) => c.id !== id);
  return true;
};
