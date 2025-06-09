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

/* // Lấy thông tin căn hộ theo id
const getApartmentById = async (id) => {
  try {
    const res = await fetch(
      `https://linkoma-be.onrender.com/v1/apartments/${id}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    if (!res.ok) throw new Error("Không tìm thấy căn hộ");
    return await res.json();
  } catch (e) {
    return null;
  }
}; */

export default {
  getApartmentById,
};
