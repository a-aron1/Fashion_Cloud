let products = JSON.parse(localStorage.getItem("products")),
    totalPrice = 0;
const totalText = document.getElementById("total-price");

checkoutClose.addEventListener("click", ()=> {
    location.href = "../index.html";
    window.localStorage.clear();
    cartContainer.removeChild();
})


async function generateCart() {
    try {
        for (product of products) {
            const response = await fetch(`https://dummyjson.com/products/${parseInt(product.productId)}`);
            const data = await response.json();
            const fixedTitle = data.title.toLowerCase().replace((/(?<=\b)\w/g), match => match.toUpperCase());

            const cartItem = createItems("div", ...[,], "row");
            cartItem.classList.add("cart-item")

            const cartImg = createItems("img", ...[,], "cart-img");
            cartImg.src = data.thumbnail;

            const cartText = createItems("div", ...[,], "cart-text");
            cartText.classList.add("col");
                const cartHeader = createItems("h4", fixedTitle, ...[,]);
                const inputGrp = createItems("div", ...[,], "input-group");
                    const label = createItems("label", "Quantity", "form-label");
                    const select = createSelectGroup(product.quantity);
                    select.addEventListener("change", (e) => {
                        totalPrice -= data.price * product.quantity;
                        totalPrice += data.price * e.target.value;
                        changeQuantity(product.productId, e.target.value);
                        totalText.textContent = `$${totalPrice}`;
                    })
                inputGrp.append(label, select);
            cartText.append(cartHeader, inputGrp);

            const cartPrice = createItems("div", ...[,], "col-2");
                cartPrice.classList.add("cart-price");
                    const deleteBtn = createItems("button", ...[,], "delete-btn");
                        const deleteIcon = createItems("span", "delete", "material-symbols-outlined");
                        deleteBtn.appendChild(deleteIcon);
                        deleteBtn.addEventListener("click", (e) => {
                            e.target.closest(".cart-item").remove();
                            removeProduct(product.productId);
                            totalPrice -= data.price * product.quantity;
                            totalText.textContent = `$${totalPrice}`;
                        })
                    const price = createItems("h6", `$${data.price}`, "item-price");
                cartPrice.append(deleteBtn, price);

            cartItem.append(cartImg, cartText, cartPrice);
            cartContainer.appendChild(cartItem);

            totalPrice += data.price * product.quantity;
            totalText.textContent = `$${totalPrice}`;
        }
    } catch (error) {
        console.error(error);
    }
}

function createItems(tagName, text, className) { 
    const element = document.createElement(tagName);
    if (text){
        element.textContent = text;
    }
    if (className) {
        element.classList.add(className)
    }
    return element;
}

function createSelectGroup(quantity) {
    const formSelect = document.createElement("select");
    formSelect.classList.add("form-select");

    for (let i=1; i <= 3; i++) {
        let option = document.createElement("option");
        option.value = i.toString();
        option.textContent = i.toString();
        if (i == quantity) {
            option.selected = true;
        }
        formSelect.add(option);
    }
    return formSelect;
}

function changeQuantity(productId, quantity) {
    let setProducts = products.map(product => {
        if (product.productId == productId) {
            product.quantity = quantity;
        }
    })
    localStorage.setItem("products", JSON.stringify(setProducts));
}

function removeProduct(productId) {
    let remProducts = products.filter(product => product.productId !== productId);
    localStorage.setItem("products", JSON.stringify(remProducts));
}

generateCart();