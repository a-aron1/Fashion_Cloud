async function generateProducts(categoryName, sectionName) {
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
        const data = await response.json();
    
        for (product of data.products) {
            const fixedTitle = product.title.toLowerCase().replace((/(?<=\b)\w/g), match => match.toUpperCase());
            
            const card = createItems("div","card");
    
            const img = createItems("img", "card-img-top");
            img.src = product.thumbnail;
            
            const cardBody = createItems("div","card-body");
    
            const linkProduct = createItems("a", "product-link", fixedTitle);
            linkProduct.href = "../product_page/product_page.html";
            linkProduct.setAttribute("id", product.id);
            linkProduct.addEventListener("click", (e) => {
                window.localStorage.setItem("productId", e.target.id);
            })
    
            const cardTitle = createItems("h5", "card-title");
            cardTitle.appendChild(linkProduct);
    
            const cardText = createItems("p", "card-text", `$${product.price}`);
    
            cardBody.append(cardTitle, cardText);
            card.append(img, cardBody);
            sectionName.appendChild(card)
        }
    } catch (error) {
        console.error(error)
    }
}

function createItems(tagName, className, textNode) { 
    const element = document.createElement(tagName);
    element.classList.add(className);
    if (textNode != undefined) {
        element.appendChild(document.createTextNode(textNode));
    }
    return element;
}

generateProducts("womens-bags", trending);
generateProducts("tops", trending);
generateProducts("mens-shirts", mens_clothing);
generateProducts("mens-shoes", mens_clothing);
generateProducts("womens-dresses", womens_clothing);
generateProducts("womens-shoes", womens_clothing);