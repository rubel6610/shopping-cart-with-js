let colorBtns = document.querySelectorAll('.ring-button');
for (let i = 0; i < colorBtns.length; i++) {
    let colorBtn = colorBtns[i];
    colorBtn.addEventListener('click', function (e) {
        e.preventDefault();
        for (colorButton of colorBtns) {
            colorButton.classList.remove('border-3')
        }
        e.target.classList.add('border-3', 'border-yellow-600');

        let colorName = e.target.id.split("-btn")[0];

        let productImage = document.getElementById('product-img');
        productImage.src = 'images/' + colorName + '.png';


    })
}

let sizebtns = document.querySelectorAll('.size-btn');

for (sizebtn of sizebtns) {
    sizebtn.addEventListener('click', (e) => {
        for (sizeButton of sizebtns) {
            sizeButton.classList.remove('border-3')
        }
        e.target.classList.add('border-3', 'border-yellow-600');
        let selectedPrice = e.target.innerText.split(" ",)[1];
        document.getElementById('price').innerText = selectedPrice + ".00";

    })
}

let quantityBtns = document.querySelectorAll('.quantity-btn');
let quantityContainer = document.getElementById("quantity");
for (let quantityBtn of quantityBtns) {
    quantityBtn.addEventListener('click', (e) => {
        let quantity = parseInt(quantityContainer.innerText)
        if (e.target.innerText === "+") {
            quantityContainer.innerText = quantity + 1;
        } else if (quantity > 0) {
            quantityContainer.innerText = quantity - 1;
        }

    })
}

let cartQuantity = 0;
let cartItems = [];
document.getElementById('add-cart').addEventListener('click', (e) => {
    e.preventDefault();

    let quantity = parseInt(document.getElementById('quantity').innerText);

    quantity <= 0 ? alert('select atleast one product') : cartQuantity += quantity;



    let colorBtn = document.querySelector('.border-3:not(size-btn)');
    let sizebtn = document.querySelector('.border-3.size-btn');

    if (!colorBtn && !sizebtn) {
        alert('select color and size')
    }
    let selectedColor = colorBtn.id.split('-btn')[0];
    let selectedSize = sizebtn.innerText.split('$')[0];
    let selectedPrice = sizebtn.innerText.split('$')[1];

    let itemExists = false;
    for (let cartItem of cartItems) {
        if (cartItem.color === selectedColor && cartItem.size === selectedSize) {
            cartItem.quantity += quantity;
            cartItem.price = cartItem.quantity * selectedPrice;
            itemExists = true;
            break;
        }
    }
    if(!itemExists){
        cartItems.push({
             image: "images/" + selectedColor + ".png",
            color: selectedColor,
            size: selectedSize,
            price: parseInt(selectedPrice) * quantity,
            quantity: quantity,
            title: document.getElementById('Watch-title').innerText,
        })
    }
        

    
    let cartCount = document.getElementById('cart-count').innerText = cartQuantity;
    document.getElementById('checkout-container').classList.remove('hidden');


})

document.getElementById('checkout-container').addEventListener('click', (e) => {
    e.preventDefault();

    let modalContainer = document.getElementById('cart-items');
    modalContainer.innerHTML = "";
    let totalQuantity = 0;
    let totalPrice = 0;
    for (cartItem of cartItems) {
        let { image, color, size, price, quantity, title } = cartItem;
        totalQuantity += quantity;
        totalPrice += price;
        let trow = document.createElement('tr');
        trow.classList.add('border-b');
        trow.innerHTML = `
        <td class="px-4 py-2">
        <div class="flex items-center gap-2">
        <img class="w-14" src="${image}">
        <span>${title}</span>
        </div>
        </td>
        <td>${color}</td>
        <td>${size}</td>
        <td>${quantity}</td>
        <td>${price}</td>
        `;
        modalContainer.appendChild(trow);
       
    }
 let totalrow = document.createElement('tr');
        totalrow.innerHTML = `
        <td></td>
        <td></td>
        <td>Total</td>
        <td>${totalQuantity}</td>
        <td>${totalPrice}</td>
        `;
        modalContainer.appendChild(totalrow);

    document.getElementById('cart-modal').classList.remove('hidden');
})

document.getElementById('continue-btn').addEventListener('click', (e) => {
    document.getElementById('cart-modal').classList.add('hidden');
})

buyNow = () => {
    alert("your order has been received")
}

