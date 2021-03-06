import Login from "./login.js";
import Main from "./main.js";
import { createUser } from "./services/user_services.js";
export default function Sign(parentElement) {
  return {
    parent: document.querySelector(parentElement),
    render: function () {
      let html = `
      <div class="container-sign">
          <div class="sign-link">
            <div class="sign-login">
                <p>Login</p>
            </div>
            <div class="sign-signup">
                <p>Signup</p>
            </div>
          </div>

          <span class="span-sign error">the email is getting used</span>

          <div class="title-sign">
          <h3>Signup</h3>
          <p>Welcome, Register to enjoy the online store</p>
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
                <span class="span-signpassword error">the password must be greater than 6 digits and can't have spaces</span>
            </div>

            <div class="container-input">
                <label>Birthday:</label>
                <input class="birthday" type = "date" placeholder="Birthday"/>
                <span class="span-birthday error">the field cannot be empty</span>
            </div>

            <div class="container-gender">
                <div>
                <label>Gender:</label>
                <input type = "radio" class="gender" name ="gender" value="male"/> Male
                </div>

                <div>
                <input type = "radio" class="gender" name = "gender" value="female"/> Female
                </div>
            </div>

            <span class="span-gender error">the field cannot be empty</span>

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
        let viewLogin = content.querySelector(".sign-login p");
        if (viewLogin == e.target) {
          let login = Login(".content");
          login.render();
        }
      });
    },
    validSign: function (email, password, birthday, gender) {
      function validEmail(email) {
        if (/\S+@gmail\.com/i.test(email)) {
          return true;
        } else {
          const content = document.querySelector(".content");
          let email_error = content.querySelector(".span-signemail");
          email_error.classList.remove("span-signemail");
        }
      }
      function validPassword(password) {
        if (password.length >= 6 && password.split(" ").length === 1) {
          return true;
        } else {
          const content = document.querySelector(".content");
          let email_error = content.querySelector(".span-signpassword");
          email_error.classList.remove("span-signpassword");
        }
      }
      function validBirthdate(birthday) {
        if (birthday.length != "") {
          return true;
        } else {
          const content = document.querySelector(".content");
          let birthday_error = content.querySelector(".span-birthday");
          birthday_error.classList.remove("span-birthday");
        }
      }
      function validGender(gender) {
        if (gender != null) {
          return true;
        } else {
          const content = document.querySelector(".content");
          let gender_error = content.querySelector(".span-gender");
          gender_error.classList.remove("span-gender");
        }
      }
      return (
        validEmail(email),
        validPassword(password),
        validBirthdate(birthday),
        validGender(gender)
      );
    },
    formSign: function (e) {
      const content = document.querySelector(".content");
      content.addEventListener("submit", async (e) => {
        e.preventDefault();
        let username = content.querySelector(".email-sign");
        let password = content.querySelector(".password-sign");
        let birthday = content.querySelector(".birthday");
        let newBirthday = birthday.value.toString();
        let gender = content.querySelector('input[name="gender"]:checked');
        console.log(gender);
        try {
          if (
            this.validSign(
              username.value,
              password.value,
              birthday.value,
              gender
            ) === true
          ) {
            const response = await createUser(
              username.value,
              password.value,
              newBirthday,
              gender.value
            );
            console.log(response);
            if (!response.ok) {
              sessionStorage.setItem("token", response.token);
              sessionStorage.setItem("name", response.username);
              let main = Main(".content");
              main.render();
              let user = content.querySelector(".container-logout");
              user.classList.remove("user");
            }
          }
        } catch (e) {
          const content = document.querySelector(".content");
          let sign_error = content.querySelector(".span-sign");
          sign_error.classList.remove("span-sign");
        }
      });
    },
  };
}
