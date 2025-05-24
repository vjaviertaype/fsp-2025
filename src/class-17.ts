// Ejercicio 1

interface Product {
  name: string;
  price: number;
  stock: number;
  calculateTotalPrice: () => number;
}

const toyCar: Product = {
  name: "Toy Car",
  price: 25.0,
  stock: 500,
  calculateTotalPrice(): number {
    return this.price * this.stock;
  },
};

console.log(
  `Producto: ${toyCar.name}\nPrecio: $${toyCar.price}\nStock: ${
    toyCar.stock
  }\nTotal: $${toyCar.calculateTotalPrice()}`
);

// Ejercicio 2

type ProductCart = {
  id: string;
  name: string;
  cant: number;
  price: number;
  discount?: number;
};

type AddProductMethod = (product: ProductCart) => void;
type RemoveProductMethod = (id: number) => void;
type MethodReturnVoid = () => void;

type ShoppingCart = {
  products: ProductCart[];
  addProduct: AddProductMethod;
  removeProduct: RemoveProductMethod;
  calculateTotalPrice: MethodReturnVoid;
};

const shoppingCart: ShoppingCart = {
  products: [],
  addProduct(product) {
    this.products.push(product);
  },
  removeProduct(id) {
    this.products = this.products.filter((p) => p.id !== id.toString());
  },
  calculateTotalPrice() {
    const total = this.products.reduce((sum, p) => sum + p.price * p.cant, 0);
    console.log(`Total del carrito: $${total}`);
  },
};

const toyStoreProducts: ProductCart[] = [
  { id: "1", name: "Muñeca", cant: 10, price: 20 },
  { id: "2", name: "Camión de Bomberos", cant: 5, price: 35 },
  { id: "3", name: "Rompecabezas", cant: 8, price: 12 },
  { id: "4", name: "Pelota", cant: 15, price: 8 },
  { id: "5", name: "Juego de Construcción", cant: 3, price: 50 },
];

// Ejemplo de uso:
shoppingCart.addProduct(toyStoreProducts[0]);
shoppingCart.addProduct(toyStoreProducts[3]);
shoppingCart.calculateTotalPrice(); // Total del carrito: $320
shoppingCart.removeProduct(1);
shoppingCart.calculateTotalPrice(); // Total del carrito: $120

// Ejercicio 3: basic calculator

class OperationNotFound extends Error {
  constructor(msj: string) {
    super(msj);
    this.name = "OperationNotFound";
  }
}

class NotANumber extends Error {
  constructor(msj: string) {
    super(msj);
    this.name = "NotANumber";
  }
}

type OperationFunction = (x: number, y: number) => number;

type CalculatorParams = {
  op: string;
  x: number;
  y: number;
};

const operations = new Map<string, OperationFunction>([
  ["add", (x, y) => x + y],
  ["sub", (x, y) => x - y],
  ["div", (x, y) => x / y],
  ["mul", (x, y) => x * y],
]);

function calculator({ op, x, y }: CalculatorParams): number {
  if (!operations.has(op))
    throw new OperationNotFound(`${op} no es una operacion valida.`);

  const operation: OperationFunction = operations.get(op)!;

  return operation(x, y);
}

console.log(calculator({ op: "add", x: 1, y: 2 }));
console.log(calculator({ op: "sub", x: 1, y: 2 }));
console.log(calculator({ op: "div", x: 1, y: 2 }));
console.log(calculator({ op: "mul", x: 1, y: 2 }));
