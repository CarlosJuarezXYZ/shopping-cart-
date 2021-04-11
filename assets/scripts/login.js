import Main from "./main.js";
import { loginFetch } from "./services/session_services.js";
import Sign from "./sign.js";
export default function Login(parentElement) {
  return {
    parent: document.querySelector(parentElement),
    render: function () {
      let html = `
      <div class="container-login">
      <div class="login-link">
        <div class="link-login">
            <p>Login</p>
        </div>
        <div class="link-signup">
            <p>Signup</p>
        </div>
      </div>

      <span class="span-fetch error">Unauthorized email or password</span>

      <div class="title-login">
      <h3>Login</h3>
      <p>Welcome,Enter your email and password </p>
      </div>

      <form class="login-form">
        <div class="container-input">
            <label>Email:</label>
            <input class = "email" type = "email" placeholder="Email"/>
            <span class="span-email error">the field can not be empty and / or formatted incorrectly</span>
        </div>

        <div class="container-input">
            <label>Password:</label>
            <input class = "password" type = "password" placeholder="Password"/>
            <span class="span-password error">the password must be greater than 6 digits and cannot have spaces</span>
        </div>
        <button class="button-login" type = "submit">Login</button>
      </form>
    </div>
        `;
      this.parent.innerHTML = html;
      this.signView();
      this.formSubmit();
    },
    signView: function () {
      const content = document.querySelector(".content");
      content.addEventListener("click", (e) => {
        let viewSign = content.querySelector(".link-signup p");
        if (viewSign == e.target) {
          let sign = Sign(".content");
          sign.render();
        }
      });
    },
    validLogin: function(email,password) {
        function validEmail(email) {
          if (/\S+@gmail\.com/i.test(email)){
            return true;
          } else {
             const content = document.querySelector(".content");
             let email_error = content.querySelector(".span-email");
             email_error.classList.remove("span-email");
          }
        }
        function validPassword(password) {
          if(password.length >= 6 &&  password.split(' ').length === 1) {
            return true;
          }else{
            const content = document.querySelector(".content");
            let email_error = content.querySelector(".span-password");
            email_error.classList.remove("span-password");
          }
        }
        return validEmail(email), validPassword(password);
      },
    formSubmit: function(e){
        const content = document.querySelector(".content");
        content.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let username = content.querySelector(".email");
        let password = content.querySelector(".password");
        try{
        if(this.validLogin(username.value,password.value)===true){
            let response = await loginFetch(username.value,password.value);
            console.log(response.token);
            if(!response.ok){
                let main = Main(".content");
                let token = response.token;
                sessionStorage.setItem("token",token);
                main.render();
            }
        }
       }catch(e){
        const content = document.querySelector(".content");
            let email_error = content.querySelector(".span-fetch");
            email_error.classList.remove("span-fetch");
       }
        })
    } 
    
  };
}
