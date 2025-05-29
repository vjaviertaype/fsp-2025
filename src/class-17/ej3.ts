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
