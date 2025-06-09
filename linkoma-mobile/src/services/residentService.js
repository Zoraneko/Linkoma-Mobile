// Mock Resident Service
let residents = [
  { id: 1, name: "Nguyễn Văn A", dob: "1990-01-01", gender: "Nam" },
  { id: 2, name: "Trần Thị B", dob: "1995-05-12", gender: "Nữ" },
];
let idCounter = 3;

export const getAllResidents = async () => [...residents];
export const getResidentById = async (id) => residents.find((r) => r.id === id);
export const createResident = async (data) => {
  const newResident = { ...data, id: idCounter++ };
    residents.push(newResident);
  return newResident;
};
export const updateResident = async (id, data) => {
  residents = residents.map((r) => (r.id === id ? { ...r, ...data } : r));
  return residents.find((r) => r.id === id);
};
export const removeResident = async (id) => {
  residents = residents.filter((r) => r.id !== id);
  return true;
};
