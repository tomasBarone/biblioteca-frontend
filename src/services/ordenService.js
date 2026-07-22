import api from "./api";


export const crearOrden = async (items) => {
  try {
    console.log("Creando orden con items:", items);
    const response = await api.post("/ordenes", items );
    return response.data;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error;
  }
};