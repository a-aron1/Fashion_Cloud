async function generateProducts(categoryName, sectionName) {
    const response = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
    const data = await response.json();

    for (product of data.products) {
        
        const card = document.createElement("div");
        card.classList.add("card");
        
        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = product.thumbnail;
        
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        
        const linkProduct = document.createElement("a");
        linkProduct.href = "../product_page/product_page.html";
        linkProduct.appendChild(document.createTextNode(product.title));
        linkProduct.setAttribute("id", product.id);
        linkProduct.addEventListener("click", (e) => {
            window.localStorage.setItem("productId", e.target.id);
        })

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.appendChild(linkProduct);

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.appendChild(document.createTextNode(`$${product.price}`));

        cardBody.append(cardTitle, cardText);
        card.append(img, cardBody);
        sectionName.appendChild(card)
    }
} 

generateProducts("tops", trending);
generateProducts("mens-shirts", mens_clothing);
generateProducts("womens-dresses", womens_clothing);