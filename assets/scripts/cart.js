import Main from "./main.js";
import { STORE } from "./store.js";
import Succes from "./succes.js";
export default function Cart(parentElement) {
  return {
    parent: document.querySelector(parentElement),
    render: function () {
      let html = `
       <div class="cart-page">
        ${STORE.carts
          .map((cart, index) => {
            return `<div class="cart-products">
                          <img src = ${cart.url}/>
                          <p>${cart.product}</p>
                          <p>items: ${cart.amount}</p>
                          <p>Precio: $${cart.price}</p>
                          <i   data-index="${index}" class="ri-delete-bin-line delete"></i>
                        </div>`;
          })
          .join(" ")}
       </div>

       <div class="sum-products"><p>Total: $ ${this.sumProducts()}</p></div>

  <div class="cart-footer">
      <div class="cancel">Cancelar pedido</div>
      <div class="confirm">Confirmar Compra</div>
      <div class="home">Home</div>
  </div>
      `;
      this.parent.innerHTML = html;
      this.deleteProducts();
      this.cancelProducts();
      this.succesView();
      this.viewHome();
    },
    sumProducts: function () {
      let acum = 0;
      STORE.carts.forEach((cart) => {
        return (acum += cart.price);
      });
      return acum;
    },
    deleteProducts: function () {
      const content = document.querySelector(".content");
      content.addEventListener("click", (e) => {
        const trashs = content.querySelectorAll(".delete");
        trashs.forEach((trash) => {
          if (trash == e.target) {
            STORE.carts = STORE.carts.filter((_, index) => {
              return index !== parseInt(e.target.dataset.index);
            });
            let session = STORE.carts;
            sessionStorage.setItem("items", JSON.stringify(session));
            this.render();
          }
        });
      });
    },
    cancelProducts: function () {
      const content = document.querySelector(".content");
      content.addEventListener("click", (e) => {
        let cancel = content.querySelector(".cancel");
        if (cancel == e.target) {
          sessionStorage.removeItem("items");
          STORE.carts = [];
          const main = Main(".content");
          main.render();
        }
      });
    },
    succesView: function () {
      const content = document.querySelector(".content");
      content.addEventListener("click", (e) => {
        let succes = content.querySelector(".confirm");
        if (succes == e.target) {
          let viewSucces = Succes(".content");
          sessionStorage.removeItem("items");
          STORE.carts = [];
          viewSucces.render();
        }
      });
    },
    viewHome: function () {
      const content = document.querySelector(".content");
      content.addEventListener("click", (e) => {
        let home = content.querySelector(".home");
        if (home == e.target) {
          let main = Main(".content");
          main.render();
        }
      });
    },
  };
}
