/*=============== ADD CART ===============*/
const products = [
    {
        id:0,
        name: 'Onigiri',
        description: 'Japanese Dish',
        price: 10.99,
        img: 'popular-onigiri.png',

    },
    {
        id: 1,
        name: 'Sping Rolls',
        description: 'Japanese Dish',
        price: 15.99,
        img: 'popular-spring-rols.png',
        
    },
    {
        id: 2,
        name: 'Sushi Rolls',
        description: 'Japanese Dish',
        price: 19.99,
        img: 'popular-sushi-rolls.png',
        
    },
]

const productsEl = document.querySelector('.popular__container');
const cartItemsEl = document.querySelector(".cart__list");
const subtotalEl = document.querySelector(".cart__total");
const totalItemInCartEl = document.querySelector(".cart");
// RENDER PRODUCTS
function renderProducts(){
    products.forEach( (product)=>{
        productsEl.innerHTML += `
            <article class="popular__card">
                <img src="assets/img/${product.img}" alt="popular image" class="popular__img">
            
                <h3 class="popular__name">${product.name}</h3>
                <span class="popular__description">${product.description}</span>

                <span class="popular__price">$${product.price}</span>
                <button class="popular__button" onclick="addToCart(${product.id})">
                    <i class="ri-shopping-bag-line"></i>
                </button>
            </article>
        `
    })
}
renderProducts()

// Cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id){
    // check if product alread exist in cart
    if(cart.some((item) => item.id === id)){
        changeNumberOfUnits("plus", id)
    }else{
        const item = products.find((product) => product.id === id)

        cart.push({
            ...item,
            numberOfUnits: 1,
        });
    }

    updateCart();
}

// Update Cart
function updateCart(){
    renderCartItems();
    renderSubtotal();

    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart))
}

// Calculate and render subtotal 
function renderSubtotal(){

    subtotalEl.innerHTML = "";

    let totalPrice = 0,
        totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });

    subtotalEl.innerHTML += `
        <span class="cart__total-text">Subtotal:</span>
        <span class="cart__total-price">$${totalPrice.toFixed(2)}</span>
    `

    totalItemInCartEl.innerHTML = totalItems;
}

// Render Cart Items
function renderCartItems(){
    cartItemsEl.innerHTML = ""; //clear cart element
    cart.forEach((item)=>{
        cartItemsEl.innerHTML += `
            <div class="cart__item">
                <img src="assets/img/${item.img}" class="cart__img" alt="">
                
                <div class="cart__text">
                    <h3 class="cart__name">${item.name}</h3>
                    <span class="cart__description">${item.description}</span>
                    <span class="cart__price">$${item.price}</span>
                    <div class="cart__action">
                        <div class="cart__count">
                            <div class="cart__count-button" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                            <div class="cart__count-number">${item.numberOfUnits}</div>
                            <div class="cart__count-button" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
                        </div>
                        <div class="cart__remove" onclick="removeItemFromCart(${item.id})">
                            <i class="ri-delete-bin-line"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
}

// Remove item from cart 
function removeItemFromCart(id){
    cart = cart.filter((item)=>item.id !== id);
    updateCart();
}

// Change number of units for an item
function changeNumberOfUnits(action, id){
    cart = cart.map((item)=>{
        let numberOfUnits = item.numberOfUnits;

        if(item.id === id){
            if(action == 'minus' && numberOfUnits > 1){
                numberOfUnits--;
            }else if(action === 'plus'){
                numberOfUnits++;
            }
        }

        return {
            ...item,
            numberOfUnits: numberOfUnits,
        }
    });

    updateCart();
}
