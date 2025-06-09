// Mock Apartment Service
let apartments = [
  { id: 1, name: "Block A - 101", block: "A", floor: 1 },
  { id: 2, name: "Block B - 202", block: "B", floor: 2 },
];
let idCounter = 3;

export const getAllApartments = async () => [...apartments];
export const getApartmentById = async (id) =>
  apartments.find((a) => a.id === id);
export const createApartment = async (data) => {
  const newApartment = { ...data, id: idCounter++ };
  apartments.push(newApartment);
  return newApartment;
};
export const updateApartment = async (id, data) => {
  apartments = apartments.map((a) => (a.id === id ? { ...a, ...data } : a));
  return apartments.find((a) => a.id === id);
};
export const removeApartment = async (id) => {
  apartments = apartments.filter((a) => a.id !== id);
  return true;
};
