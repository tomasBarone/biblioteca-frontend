import api from "./api";


export const crearOrden = async (items, email) => {
  try {
    console.log("Creando orden con items:", items, email);
    const response = await api.post("/ordenes", items, email );
    return response.data;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error;
  }
};