// Redirect to product page
// On click => extract ID

let productId = window.localStorage.getItem("productId");
// async function generateProduct(productId) {
//     const response = await fetch(`https://dummyjson.com/products/${productId}`);
//     const data = await response.json();

//     const para = document.createElement("p")
//     para.appendChild(document.createTextNode(productId));
//     product_content.appendChild(para);
// }

async function generateProduct() {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await response.json();

    const img = document.createElement("img");
    img.src = data.images[0];
    product_img.appendChild(img);

    const category = createItems("p", data.category);
    const title = createItems("h3", data.title);
    const rating = createItems("p", data.rating);
    const price = createItems("p", data.price);
    const description = createItems("p", data.description);

    product_content.append(category, title, rating, price, description);
    // window.localStorage.clear();
}

function createItems(tagName, textNode) { 
    const element = document.createElement(tagName);
    element.appendChild(document.createTextNode(textNode));
    return element;
}

generateProduct();