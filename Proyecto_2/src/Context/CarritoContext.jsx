import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [productos, setProductos] = useState([]);

    const agregarProducto = (producto) => {
        setProductos((actuales) => {
            const existente = actuales.find(
                (item) => item.id === producto.id
            );

            if (existente) {
                return actuales.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            return [...actuales, { ...producto, cantidad: 1 }];
        });
    };

    const cambiarCantidad = (id, cambio) => {
        setProductos((actuales) =>
            actuales.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        cantidad: Math.max(1, item.cantidad + cambio),
                    }
                    : item
            )
        );
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
                cambiarCantidad,
                eliminarProducto,
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    return useContext(CarritoContext);
}