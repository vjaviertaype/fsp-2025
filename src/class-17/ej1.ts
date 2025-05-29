export interface Product {
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
