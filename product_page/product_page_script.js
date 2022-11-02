let productId = window.localStorage.getItem("productId");

async function generateProduct() {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await response.json();
    
        const img = document.createElement("img");
        img.src = data.images[0];
        product_img.appendChild(img);
    
        const category = createItems("p", data.category, "category");
        const title = createItems("h3", data.title);
        const rating = createItems("p", data.rating, "rating");
        const price = createItems("p", data.price, "price");
        const description = createItems("p", data.description, "description");
    
        product_text.append(category, title, rating, price, description);
        
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

generateProduct();