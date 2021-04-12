import Main from "./main.js";
import { STORE } from "./store.js";
import { logoutFetch } from "./services/session_services.js";
import Login from "./login.js";

export default function Succes(parentElement) {
  let username = sessionStorage.getItem("name");
  return {
    parent: document.querySelector(parentElement),
    render: function () {
      let html = `
        <div class="js-content content">
        <div class="content-succes">
            <i class="ri-checkbox-circle-line"></i>
            <p>Compra realizada con exito!</p>
            <p>los detalles de la compra llegaran a su correo ${username}</p>
            <div class="succes-footer">
                <div class="home">Seguir comprando</div>
                <div class="succes-logout">Logout</div>
            </div>
        </div>
    </div>
        `;
      this.parent.innerHTML = html;
      this.homeView();
      this.succesLogout();
    },
    homeView: function () {
      const content = document.querySelector(".content");
      content.addEventListener("click", (e) => {
        let home = content.querySelector(".home");
        if (home == e.target) {
          const main = Main(".content");
          main.render();
          let user = content.querySelector(".container-logout");
          user.classList.remove("user");
        }
      });
    },
    succesLogout: function () {
      const content = document.querySelector(".content");
      content.addEventListener("click", async (e) => {
        let log = content.querySelector(".succes-logout");
        if (log == e.target) {
          await logoutFetch();
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("name");
          sessionStorage.removeItem("items");
          let login = Login(".content");
          login.render();
          location.reload();
        }
      });
    },
  };
}
