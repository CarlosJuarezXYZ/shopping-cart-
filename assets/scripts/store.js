const STORE = {
  products: [],
  carts: [],
};

STORE.carts = JSON.parse(sessionStorage.getItem("items")) || [];

export { STORE };
