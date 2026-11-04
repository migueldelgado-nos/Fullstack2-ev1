import { useState } from "react";
import { CarritoContext } from "./carritoContext";

export function CarritoProvider({ children }) {
    const [productos, setProductos] = useState([]);

    const agregarProducto = (producto) => {
        setProductos((actuales) => {
            const existente = actuales.some(
                (item) => item.id === producto.id
            );

            if (existente) {
                return actuales;
            }

            return [...actuales, producto];
        });
    };

    const eliminarProducto = (id) => {
        setProductos((actuales) =>
            actuales.filter((item) => item.id !== id)
        );
    };

    return (
        <CarritoContext.Provider
            value={{
                productos,
                agregarProducto,
                eliminarProducto,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}
