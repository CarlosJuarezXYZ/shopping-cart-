import Login from "./login.js";
import Main from "./main.js";
import { createUser } from "./services/user_services.js";
export default function Sign(parentElement) {
  return {
    parent: document.querySelector(parentElement),
    render: function () {
      let html = `
      <div class="container-sign">
          <div class="login-link">
            <div class="link-login">
                <p>Login</p>
            </div>
            <div class="link-signup">
                <p>Signup</p>
            </div>
          </div>

          <div class="title-sign">
          <h3>Signup</h3>
          <p>Welcome,Register to enjoy the online store</p>
          </div>

          <form class="sign-form">
            <div class="container-input">
                <label>Email</label>
                <input class = "email-sign" type = "email" placeholder="Email"/>
                <span class="span-signemail error">the field cannot be empty and / or formatted incorrectly</span>
            </div>

            <div class="container-input">
                <label>Password:</label>
                <input class="password-sign" type = "password" placeholder="Password"/>
                <span class="span-signpassword error">the password must be greater than 6 digits and cannot have spaces</span>
            </div>

            <div class="container-input">
                <label>Birthday:</label>
                <input class="birthday" type = "date" placeholder="Birthday"/>
                <span class="span-birthday error">the field cannot be empty</span>
            </div>

            <div class="container-input">
                <label>Gender:</label>
                <input type = "radio" class="gender" name ="gender" value="male"/> male
                <input type = "radio" class="gender" name = "gender" value="female"/> female
                <span class="span-gender error">the field cannot be empty and / or formatted incorrectly</span>
            </div>

            <button class="button-sign" type = "submit">Signup</button>
          </form>
        </div>
        `;
      this.parent.innerHTML = html;
      this.loginView();
      this.formSign();
    },
    loginView: function () {
      const content = document.querySelector(".content");
      content.addEventListener("click", (e) => {
        let viewLogin = content.querySelector(".link-login p");
        if (viewLogin == e.target) {
          let login = Login(".content");
          login.render();
        }
      });
    },
    validSign: function(email,password,birthday,gender) {
        function validEmail(email) {
          if (/\S+@gmail\.com/i.test(email)){
            return true;
          } else {
             const content = document.querySelector(".content");
             let email_error = content.querySelector(".span-signemail");
             email_error.classList.remove("span-signemail");
          }
        }
        function validPassword(password) {
          if(password.length >= 6 &&  password.split(' ').length === 1) {
            return true;
          }else{
            const content = document.querySelector(".content");
            let email_error = content.querySelector(".span-signpassword");
            email_error.classList.remove("span-signpassword");
          }
        }
        function validBirthdate(birthday){
            if(birthday.length != ""){
                return true
            }else{
                const content = document.querySelector(".content");
                let birthday_error = content.querySelector(".span-birthday");
                birthday_error.classList.remove("span-birthday");
            }
        }
        function validGender(gender){
        if(gender != null){
        return true;
        }else{
        const content = document.querySelector(".content");
        let gender_error = content.querySelector(".span-gender");
        gender_error.classList.remove("span-gender");
        }
        }
        return validEmail(email), validPassword(password), validBirthdate(birthday),validGender(gender);
      },
    formSign: function(e){
        const content = document.querySelector(".content");
        content.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let username = content.querySelector(".email-sign");
        let password = content.querySelector(".password-sign");
        let birthday = content.querySelector(".birthday");
        let newBirthday = birthday.value.toString();
        let gender = content.querySelector(('input[name="gender"]:checked'));
        console.log(gender);
        try{
            if(this.validSign(username.value,password.value,birthday.value,gender) === true){
                const sing = await createUser(username.value,password.value,newBirthday,gender.value);
                sessionStorage.setItem("token",sing.token);
                let main = Main(".content");
                main.render();
            }
        }catch(e){
            alert("prueba");
        }
        // const sing = await createUser(username.value,password.value,newBirthday,gender.value);
        // sessionStorage.setItem("token",sing.token);
        // let main = Main(".content");
        // main.render();
    //     try{
    //     if(this.validLogin(username.value,password.value)===true){
    //         let response = await loginFetch(username.value,password.value);
    //         console.log(response.token);
    //         if(!response.ok){
    //             let main = Main(".content");
    //             let token = response.token;
    //             sessionStorage.setItem("token",token);
    //             main.render();
    //         }
    //     }
    //    }catch(e){
    //     const content = document.querySelector(".content");
    //         let email_error = content.querySelector(".span-fetch");
    //         email_error.classList.remove("span-fetch");
    //    }
        })
    } 
    
  };
}
