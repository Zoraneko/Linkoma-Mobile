// Mock Apartment Service with enhanced data using centralized mock data
import { mockDataStore, delay, generateId, findById, updateById, deleteById, addEntity } from './mockData';

// Use centralized apartment data
let apartments = mockDataStore.apartments;
let idCounter = 4;

export const getAllApartments = async (filters = {}) => {
  await delay();
  let filteredApartments = [...apartments];
  
  // Apply filters
  if (filters.block) {
    filteredApartments = filteredApartments.filter(apt => apt.block === filters.block);
  }
  if (filters.status) {
    filteredApartments = filteredApartments.filter(apt => apt.status === filters.status);
  }
  if (filters.minPrice) {
    filteredApartments = filteredApartments.filter(apt => apt.rentPrice >= filters.minPrice);
  }
  if (filters.maxPrice) {
    filteredApartments = filteredApartments.filter(apt => apt.rentPrice <= filters.maxPrice);
  }
  
  return filteredApartments;
};

export const getApartmentById = async (id) => {
  await delay(300);
  return apartments.find((a) => a.id === parseInt(id));
};

export const createApartment = async (data) => {
  await delay(800);
  const newApartment = { 
    ...data, 
    id: idCounter++,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  apartments.push(newApartment);
  return newApartment;
};

export const updateApartment = async (id, data) => {
  await delay(800);
  apartments = apartments.map((a) => 
    a.id === parseInt(id) ? { ...a, ...data, updatedAt: new Date().toISOString() } : a
  );
  return apartments.find((a) => a.id === parseInt(id));
};

export const removeApartment = async (id) => {
  await delay(600);
  apartments = apartments.filter((a) => a.id !== parseInt(id));
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
  getAllApartments,
  getApartmentById,
  createApartment,
  updateApartment,
  removeApartment,
};
