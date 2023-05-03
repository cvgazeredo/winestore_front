
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM loaded");
  });

let orderId = 0;
let userId = 0;


// Validate input from user's registration:
const signIn = () => {
    
    let inputUserName = document.getElementById("userName").value;
    let inputUserAddress = document.getElementById("userAddress").value;

    if (inputUserName === '' ) {
        alert("Escreva o seu nome!");
    } else if (inputUserAddress === '') {
        alert("Escreva um endereço")
    } else {
        insertUser(inputUserName, inputUserAddress);
    }
}

// Insert data from user:
const insertUser = async(userName, userAddress) => {

    let listProducts = document.getElementById('product-list');
    let cartInformation = document.getElementById('cart-information');
    let userRegister = document.getElementById('sign-in');

    let url = 'http://127.0.0.1:5000/user/create';
    console.log(url);

    const formData = new FormData();
    formData.append('name', userName);
    formData.append('address', userAddress);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        orderId = data.order_id;
        userId = data.user_id;
        console.log(userId)
        listProducts.style.display = '';
        cartInformation.style.display = 'block';
        userRegister.style.display = 'none';
        getList();
    })
    .catch((error) => {
        alert(error.message)
    });

}

// List products:
const getList = async() => {
    let url = 'http://127.0.0.1:5000/products';
    console.log(url)
    await fetch(url, {
        method: 'get',
    })
    .then((response) => response.json())
    .then(data => {
        console.log(data)

        const itemList = document.getElementById('product-list');
        let list = ''
        
        data.products.forEach(product => {
            const productId = product.id;
            let grapesName = '';
            product.grapes.map(grape => {
                grapesName = grapesName + " " + grape.name + "";
            }) 
            list = list + 
            `
                <div class="col">
                    <div class="card">
                        <img src="assets/images/${product.photo}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${product.label}</h5>
                            <h6 class="card-title">R$ ${product.price}</h6>
                            <p>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe-americas" viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
                            </svg>
                            ${product.country.name}
                            </div>
                            <div>
                            <svg fill="#000000" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21,12a5.006,5.006,0,0,0-5-5A4.951,4.951,0,0,0,13,8.03c0-.009.005-.016.005-.025A2.853,2.853,0,0,1,16,5a1,1,0,0,0,0-2,4.709,4.709,0,0,0-3.729,1.54A5.466,5.466,0,0,0,7,1,1,1,0,0,0,6,2,8.362,8.362,0,0,0,7.674,7.033a4.981,4.981,0,0,0-.539,9.88A4.871,4.871,0,0,0,7,18a5,5,0,1,0,9.873-1.088A5,5,0,0,0,21,12ZM10.882,6.851c-1.888-.542-2.539-2.445-2.764-3.7C10.006,3.691,10.657,5.593,10.882,6.851ZM5,12a3,3,0,0,1,6,0C11,15.975,5,15.976,5,12Zm7,9a3,3,0,0,1-3-3,2.868,2.868,0,0,1,.251-1.174A5.049,5.049,0,0,0,11.982,15a3.074,3.074,0,0,1,2.576,1.458A2.98,2.98,0,0,1,12,21Zm4-6h-.018a4.976,4.976,0,0,0-2.64-1.794c-.031-.009-.06-.024-.091-.032A2.868,2.868,0,0,1,13,12a3,3,0,1,1,3,3Z"/>
                            </svg>
                            ${grapesName}
                            </div>
                            <div>
                            <svg fill="#000000" width="16" height="16" viewBox="0 0 24 24" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.568 9.432c0-2.55-.906-5.592-.944-5.72-.128-.423-.517-.712-.958-.712h-7.332c-.441 0-.83.289-.958.712-.038.128-.944 3.17-.944 5.72 0 2.735 1.984 5.011 4.587 5.477l-.019.091v4h-1c-.553 0-1 .447-1 1s.447 1 1 1h4c.553 0 1-.447 1-1s-.447-1-1-1h-1v-4l-.019-.092c2.603-.466 4.587-2.741 4.587-5.476zm-5.568 3.568c-1.773 0-3.236-1.303-3.511-3h7.021c-.274 1.697-1.737 3-3.51 3zm-3.555-4c.062-1.468.422-3.093.653-4h5.803c.231.907.591 2.532.653 4h-7.109z"/>
                            </svg>
                            ${product.type.name}
                            </div>
                            
                        </div>
                        <div class="card-footer text-center"  style="background-color: white">
                            <button type="button" class="btn btn-outline-danger w-100" onclick="addProductToCart(${productId}, ${orderId})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                                </svg>
                                 Adicionar 
                            </button>
                        </div>
                    </div>
                </div>
            `
   
        });

        itemList.innerHTML = list
    })
    .catch((error) => {
            console.error('Error', error);
        });

}


// Add product to cart:
const addProductToCart = (productId, orderId) => {
    console.log(`Product id: ${productId} added to cart`)
    console.log(`Order id: ${orderId} relate to the cart`)
    
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('order_id', orderId);

    console.log(formData)
    
    let url = 'http://127.0.0.1:5000/order/add';
    console.log(url)
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => { 
        if(!response.ok) {
            throw new Error("Order closed");
        }
        return response;
    })
    .then(response => response.json())
    .then(data => { buildCart(data)} )
    .catch((error) => {
        alert(error.message)
    });

}

// Buy order: 
const buyOrder = async() => {
    console.log("Reached buyOrder function")
    console.log(orderId)
    console.log(userId)

    const formData = new FormData();
    formData.append('order_id', orderId);
    formData.append('user_id', userId);

    let url = 'http://127.0.0.1:5000/order/buy';
    fetch(url, {
        method: 'post',
        body: formData
    })
    .then(response => { 
        if(!response.ok) {
            throw new Error("Order already closed");
        }
        return response;
    })
    .then(response => response.json()) 
    .then(data => {
        alert(`Pedido ${orderId} concluído`)
        location.reload()
    })
    .catch((error) => {
        alert(error.message)
    });
}

// Delete item from cart: 
const deleteItem = async(itemId) => {
    console.log("Reached deleteItem function")
    
    console.log(itemId);


    let url = 'http://127.0.0.1:5000/order/delete?item_id=' + itemId;
    fetch(url, {
        method: 'delete',
    })
    .then(response => response.json()) 
    .then(data => { buildCart(data) })
    .catch((error) => {
        alert(error.message)
    });
}


// List items of cart: 
const buildCart = (listItems) => {
    console.log("Build Cart function reached!")
    console.log(listItems)
    data = listItems;

    const itemCart = document.getElementById('item-cart');
    const totalCart = document.getElementById('total-cart');
    const buyButton = document.getElementById('buy-button');
    let list = '';
    let button = '';
        
    data.order.items.forEach(item => { 
        list = list + 
            `
            <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h6 class="my-0">${item.product_label}</h6>
                <small class="text-muted">x ${item.quantity}</small>
                <span onclick="deleteItem(${item.id})" style="cursor: pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                </span>
            </div>
            <span class="text-muted">R$${item.price}</span>
          </li>
          
            `
        });
    button = 
        `
        <li class="list-group-item d-flex justify-content-between">
            <button type="button" class="btn btn-outline-danger w-100" onclick="buyOrder()">Comprar</button>
        </li>
        `

    itemCart.innerHTML = list;
    totalCart.textContent = data.order.order_total.toFixed(2);
    buyButton.innerHTML = button;
        
}

