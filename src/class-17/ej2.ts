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
