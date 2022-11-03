let products = JSON.parse(localStorage.getItem("products")),
    totalPrice = 0;
const totalText = document.getElementById("total-price");

async function generateCart() {
    try {
        for (product of products) {
            const response = await fetch(`https://dummyjson.com/products/${parseInt(product.productId)}`);
            const data = await response.json();
            const fixedTitle = data.title.toLowerCase().replace((/(?<=\b)\w/g), match => match.toUpperCase());

            const cartCont = document.getElementById("cart-container");
                const cartItem = createItems("div", ...[,], "row");
                cartItem.classList.add("cart-item")

                const cartImg = createItems("img", ...[,], "cart-img");
                cartImg.src = data.thumbnail;

                const cartText = createItems("div", ...[,], "cart-text");
                    const cartHeader = createItems("h4", fixedTitle, ...[,]);
                    const quantityForm = createItems("form", ...[,], "quantity-form");
                        const inputGrp = createItems("div", ...[,], "input-group");
                            const label = createItems("label", "Quantity", "form-label");
                            const select = createSelectGroup(product.quantity);
                        inputGrp.append(label, select);
                    quantityForm.appendChild(inputGrp);
                cartText.append(cartHeader, quantityForm);

            const cartPrice = createItems("div", ...[,], "col");
                cartPrice.classList.add("cart-price");
                    const deleteBtn = createItems("button", ...[,], "delete-btn");
                        const deleteIcon = createItems("span", "delete", "material-symbols-outlined");
                        deleteBtn.appendChild(deleteIcon);
                    const price = createItems("h6", `$${data.price}`, "item-price");
                cartPrice.append(deleteBtn, price);

            cartItem.append(cartImg, cartText, cartPrice);
            cartCont.appendChild(cartItem);

            totalPrice += data.price * product.quantity;
            totalText.textContent = totalPrice;
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

generateCart();