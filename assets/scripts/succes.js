import Main from "./main.js";
import { STORE } from "./store.js";
export default function Succes(parentElement) {
  return {
    parent: document.querySelector(parentElement),
    render: function () {
      let html = `
        <div class="js-content content">
        <div class="content-succes">
            <i class="ri-checkbox-circle-line"></i>
            <p>Compra realizada con exito!</p>
            <p>los detalles de la compra llegaran a su correo</p>
            <div class="succes-footer">
                <div class="home">Seguir comprando</div>
                <div class="succes-logout">Gracias</div>
            </div>
        </div>
    </div>
        `;
      this.parent.innerHTML = html;
      this.homeView();
    },
    homeView: function () {
      const content = document.querySelector(".content");
      content.addEventListener("click", (e) => {
        let home = content.querySelector(".home");
        if (home == e.target) {
          const main = Main(".content");
          main.render();
        }
      });
    },
  };
}
