import Login from "./login.js";
import Main from "./main.js";
import { STORE } from "./store.js";
import Succes from "./succes.js";
export default function Cart(parentElement) {
  let username = sessionStorage.getItem("name");
  return {
    parent: document.querySelector(parentElement),
    render: function () {
      let html = `
      <div class="user container-logout">
        <div class="welcome">${username}, here you can confirm your products</div>
        <div class="logout">Logout</div>
      </div>

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
      this.cartLogout();
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
          let user = content.querySelector(".container-logout");
          //user.classList.remove("user");
          //main.render();
          user.classList.remove("user");
          
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
          let user = content.querySelector(".container-logout");
          //user.classList.remove("user");
          //main.render();
          user.classList.remove("user");
        }
      });
    },
    cartLogout: function(){
      const content = document.querySelector(".content");
      content.addEventListener("click", (e)=>{
        let log = content.querySelector(".logout");
        if(log==e.target){
          //await logout();
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("items");
          let login = Login(".content");
          login.render();
          location.reload();
        }
      })
    }
  };
}
