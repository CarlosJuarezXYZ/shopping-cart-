import Cart from "./assets/scripts/cart.js";
import Main from "./assets/scripts/main.js";
import { listProducts } from "./assets/scripts/services/products_service.js";
import { STORE } from "./assets/scripts/store.js";

async function init (){
    STORE.products = await listProducts("Snacks")
    const main = Main(".content");
    main.render();
}

init();
