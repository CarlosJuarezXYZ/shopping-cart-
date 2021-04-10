import Cart from "./cart.js";
import {listProducts} from "./services/products_service.js"
import {STORE} from "./store.js"
export default function Main(parentElement){
  return{
    parent: document.querySelector(parentElement),
    selectedCategory: null,
    selectedOption: "Snacks",
    render: function(){
      let html = `
    <div class="header">
      <button type = "click" value = "Cereals" class="navbar">Cereals</button>
      <button type = "click" value = "Dairy" class="navbar">Dairy</button>
      <button type = "click" value = "Drinks" class="navbar">Drinks</button>
      <button type = "click" value = "Fruits" class="navbar">Fruits</button>
      <button type = "click" value = "Snacks" class="navbar">Snacks</button>
    </div>

    <form class="form">
    <input class="search" name="search" type = "text" placeholder="Search">
    <button class= "btn" type = "submit" value = "search" > Search </button>
    </form>

    <div class="body">
      ${STORE.products.map((product)=>{
       return `<div class="products">
               <img
                data-name="${product.name}"
                data-price="${product.price}"
                data-url="${product.url}"
                class="img" src=${product.url}
                />
               <div>
               <p> ${product.name} $ ${product.price} precio por promoción</p>
               </div>
               </div>`
      }
      ).join(" ")}    
    </div>

   
    <div class="footer">
      <div class="shopping"><i class="ri-shopping-cart-2-line cart "></i></div>
      <div class="content-logout"><p class="logout js-logout">Welcome</p></div>
    </div>
      `;
      
      this.parent.innerHTML = html;
      this.filterCategories();
      this.cartView();
      this.createProduct();
      this.searchProducts();
      this.loadingProducts();
    },
    loadingProducts: function(){
      return(
        `
        <div class="container-loading">
        <div class="loading"></div>
        </div>
        `
      )
    },
    filterCategories: function() {
      const content = document.querySelector(".content");
      content.addEventListener("click",(e)=>{
        const navbar = content.querySelectorAll(".navbar");
        navbar.forEach(async(nav)=>{
          if(nav==e.target){
            //let body = content.querySelector(".body")
            //body.innerHTML = this.loadingProducts();
            const products = await listProducts(e.target.value);
            STORE.products = [...products];
            //body.innerHTML = this.loadingProducts();
            this.render();
           
            // window.onload = () =>{
            //   let loading = document.querySelector(".container-loading");
            //   loading.style.display = 'none',
            //   loading.style.opacity = '0';
            // }
             // setTimeout(()=>{
             // let loading = document.querySelector(".container-loading");
             // loading.style.display = 'none'
              //loading.style.opacity = '0';
             // },500)
            // <div class="container-loading">
            // <div class="loading"></div>
            // </div>
          }
        })
      })
    },
    searchProducts: function(){
      const content = document.querySelector(".content");
      content.addEventListener("click", async (e)=>{
        e.preventDefault();
      const btn = content.querySelector(".btn");
      const search = content.querySelector(".search");
      if(btn==e.target){
        const item = search.value.charAt(0).toUpperCase() + search.value.slice(1);
        const product = await listProducts(item);
        STORE.products = [...product];
        this.render();
      }
      })
    },
    cartView: function(){
    const content = document.querySelector(".content");
    content.addEventListener("click",(e)=>{
      let cart = content.querySelector(".cart");
      if(cart==e.target){
        let pagCart = Cart(".content");
        pagCart.render();
      }
    })
    },
    createProduct: function(){
      const content = document.querySelector(".content");
      content.addEventListener("click",(e)=>{
        let products = content.querySelectorAll(".img");
        products.forEach((product)=>{
          if(product==e.target){
           STORE.carts.push({
              product:e.target.dataset.name,
              price:parseInt(e.target.dataset.price),
              url:(e.target.dataset.url),
              amount:1
            })
            const session = STORE.carts;
            sessionStorage.setItem("items",JSON.stringify(session))
            let cart = Cart(".content");
            cart.render();
          }
        })
      })
    }
}
}
