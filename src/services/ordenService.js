import api from "./api";


export const crearOrden = async (items, email) => {
  try {
    console.log("Creando orden con items:", items, "y email:", email);
    const response = await api.post("/ordenes", items, {
      headers: {
        "Content-Type": "application/json", 
        "X-User-Email": email,
      },
    });
     
  
    console.log("Orden creada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error;
  }
};