let productId = window.localStorage.getItem("productId");

async function generateProduct() {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await response.json();
        
        const img = document.createElement("img");
        img.src = data.images[0];
        product_img.appendChild(img);
        const starImg = document.createElement("img");
        starImg.src = "../Images/star.png";
        
        const category = createItems("p", fixName(data.category), "category");
        const title = createItems("h3", fixName(data.title));
        const rating = createItems("p", data.rating, "rating");
        const price = createItems("p", `$${data.price}`, "price");
        const description = createItems("p", data.description, "description");
    
        product_text.append(category, title, rating, starImg, price, description);
        
    } catch (error) {
        console.error(error);
    }
}

function createItems(tagName, textNode, idName) { 
    const element = document.createElement(tagName);
    element.appendChild(document.createTextNode(textNode));
    if (idName != undefined) {
        element.setAttribute("id", idName);
    }
    return element;
}

function fixName(name) {
    return name.toLowerCase().replace((/(?<=\b)\w/g), match => match.toUpperCase());
}

const cartBtn = document.getElementById("add-cart-btn");
cartBtn.addEventListener("click", () => {
    let quantity = document.querySelector(".form-select").value;
    let products = [];
    if (localStorage.getItem("products")) {
        products = JSON.parse(localStorage.getItem("products"));
    }
    products.push({"productId" : productId, "quantity": quantity});
    localStorage.setItem("products", JSON.stringify(products));
})

generateProduct();

// alert for add to cart
function btnClick() {
    alert("Your product has been added to the cart");
}
