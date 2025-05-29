type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

interface ICache<K, T> {
  get(key: K): T | undefined;
  set(key: K, value: T, ttl: number): void;
  cleanup(): void;
}

export class Cache<K, T> implements ICache<K, T> {
  private _mem: Map<K, CacheEntry<T>> = new Map();

  set(key: K, value: T, ttl: number): void {
    const expiresAt = Date.now() + ttl;
    this._mem.set(key, { value, expiresAt });
  }

  get(key: K): T | undefined {
    const entry = this._mem.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this._mem.delete(key);

      return undefined;
    }

    return entry.value;
  }

  cleanup(): void {
    const now = Date.now();

    for (const [key, value] of this._mem.entries()) {
      if (now > value.expiresAt) {
        this._mem.delete(key);
      }
    }
  }
}

// Crear una caché con claves string y valores string
const cache = new Cache<string, string>();

// Guardar un valor con TTL de 3 segundos (3000 ms)
cache.set("token", "abc123", 3000);

console.log("Justo después de set:", cache.get("token")); // 👉 "abc123"

setTimeout(() => {
  console.log("Después de 2 segundos:", cache.get("token")); // 👉 "abc123"
}, 2000);

setTimeout(() => {
  console.log("Después de 4 segundos:", cache.get("token")); // 👉 undefined (expiró)
}, 4000);

setTimeout(() => {
  cache.cleanup(); // limpia cualquier entrada expirada (aunque ya está eliminada en `get`)
  console.log("Después del cleanup manual:", cache.get("token")); // 👉 undefined
}, 5000);
