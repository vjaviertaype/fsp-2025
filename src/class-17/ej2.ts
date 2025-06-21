type ProductCart = {
  id: string;
  name: string;
  cant: number;
  price: number;
  discount?: number;
};

// Santi: ... Son un poco redundantes los tipos que tenes en las lineas 35 a 37 ya que podrías simplementer ponerlos en el type ShioppingCart :pepeheart:
type ShoppingCart = {
  products: ProductCart[];
  addProduct: (product: ProductCart) => void;
  removeProduct: (id: number) => void;
  calculateTotalPrice: () => void;
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
