import { v4 } from "uuid";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type ReturnProductFunction = Product | undefined;

export type CreateProductFunction = (
  data: Omit<Product, "id">
) => ReturnProductFunction;

export type UpdateProductFunction = (
  updateData: Partial<Product>
) => ReturnProductFunction;

export type RemoveProductFunction = (
  data: Pick<Product, "id">
) => ReturnProductFunction;

const products: Product[] = [
  {
    id: "1",
    name: "HyperX Alloy FPS Pro",
    description: "Teclado mecánico compacto para gaming.",
    price: 89.99,
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z",
    deletedAt: "",
  },
  {
    id: "2",
    name: "HyperX Cloud II",
    description: "Auriculares para juegos con sonido envolvente 7.1.",
    price: 99.99,
    createdAt: "2024-06-01T10:05:00Z",
    updatedAt: "2024-06-01T10:05:00Z",
    deletedAt: "",
  },
  {
    id: "3",
    name: "HyperX Pulsefire FPS Pro",
    description: "Ratón RGB para juegos con sensor Pixart 3389.",
    price: 59.99,
    createdAt: "2024-06-01T10:10:00Z",
    updatedAt: "2024-06-01T10:10:00Z",
    deletedAt: "",
  },
  {
    id: "4",
    name: "HyperX Fury S Pro",
    description: "Alfombrilla de ratón para gaming tamaño XL.",
    price: 29.99,
    createdAt: "2024-06-01T10:15:00Z",
    updatedAt: "2024-06-01T10:15:00Z",
    deletedAt: "",
  },
  {
    id: "5",
    name: "HyperX QuadCast",
    description: "Micrófono USB para streaming y podcast.",
    price: 129.99,
    createdAt: "2024-06-01T10:20:00Z",
    updatedAt: "2024-06-01T10:20:00Z",
    deletedAt: "",
  },
  {
    id: "6",
    name: "HyperX Cloud Alpha",
    description: "Auriculares para juegos con doble cámara de sonido.",
    price: 109.99,
    createdAt: "2024-06-01T10:25:00Z",
    updatedAt: "2024-06-01T10:25:00Z",
    deletedAt: "",
  },
  {
    id: "7",
    name: "HyperX Alloy Origins",
    description: "Teclado mecánico RGB compacto.",
    price: 119.99,
    createdAt: "2024-06-01T10:30:00Z",
    updatedAt: "2024-06-01T10:30:00Z",
    deletedAt: "",
  },
  {
    id: "8",
    name: "HyperX Cloud Stinger",
    description: "Auriculares ligeros para gaming.",
    price: 49.99,
    createdAt: "2024-06-01T10:35:00Z",
    updatedAt: "2024-06-01T10:35:00Z",
    deletedAt: "",
  },
  {
    id: "9",
    name: "HyperX Pulsefire Dart",
    description: "Ratón inalámbrico para juegos con carga Qi.",
    price: 89.99,
    createdAt: "2024-06-01T10:40:00Z",
    updatedAt: "2024-06-01T10:40:00Z",
    deletedAt: "",
  },
  {
    id: "10",
    name: "HyperX Cloud Revolver S",
    description: "Auriculares premium con sonido Dolby Surround 7.1.",
    price: 149.99,
    createdAt: "2024-06-01T10:45:00Z",
    updatedAt: "2024-06-01T10:45:00Z",
    deletedAt: "",
  },
];

const createProduct: CreateProductFunction = (data) => {
  const id: string = v4();

  const newProduct: Product = {
    id,
    ...data,
  };

  products.push(newProduct);

  return newProduct;
};

const updateProduct: UpdateProductFunction = (updateData) => {
  const product: ReturnProductFunction = products.find(
    (p) => p.id === updateData.id
  );
  if (!product) return undefined;

  const updateProduct = { ...product, ...updateData };

  return updateProduct;
};
const removeProduct: RemoveProductFunction = (data) => {
  const indexProduct: number = products.findIndex((p) => p.id === data.id);
  if (!indexProduct) return undefined;

  const removeProduct: Product = products[indexProduct];

  removeProduct.deletedAt = new Date().toISOString();

  return removeProduct;
};

/* Ejemplo de uso */

const newProductData: Omit<Product, "id"> = {
  name: "HyperX SoloCast",
  description: "Micrófono USB compacto para streaming.",
  price: 69.99,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: "",
};
const newProduct: ReturnProductFunction = createProduct(newProductData);

if (newProduct) {
  console.log("Producto agregado:", newProduct);

  await sleep(500);
  const modifiedProduct: ReturnProductFunction = updateProduct({
    id: newProduct.id,
    description: "Micrófono USB compacto ideal para streaming y podcast.",
    updatedAt: new Date().toISOString(),
  });
  if (modifiedProduct) {
    console.log("Producto modificado:", modifiedProduct);
  }

  const similarProduct: ReturnProductFunction = products.find(
    (p) =>
      p.id !== newProduct.id &&
      p.description?.toLowerCase().includes("micrófono")
  );
  await sleep(500);

  if (similarProduct) {
    const deletedProduct = removeProduct({ id: similarProduct.id });
    if (deletedProduct) {
      console.log("Producto eliminado:", deletedProduct);
    }
  }
}
