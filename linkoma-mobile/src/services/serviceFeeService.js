// Mock Service Fee Service
let serviceFees = [
  { id: 1, name: "Phí quản lý", amount: 500000 },
  { id: 2, name: "Phí gửi xe", amount: 200000 },
];
let idCounter = 3;

export const getAllServiceFees = async () => [...serviceFees];
export const getServiceFeeById = async (id) =>
  serviceFees.find((f) => f.id === id);
export const createServiceFee = async (data) => {
  const newFee = { ...data, id: idCounter++ };
  serviceFees.push(newFee);
  return newFee;
};
export const updateServiceFee = async (id, data) => {
  serviceFees = serviceFees.map((f) => (f.id === id ? { ...f, ...data } : f));
  return serviceFees.find((f) => f.id === id);
};
export const removeServiceFee = async (id) => {
  serviceFees = serviceFees.filter((f) => f.id !== id);
  return true;
};
