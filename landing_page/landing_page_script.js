const trendingUrl = "https://dummyjson.com/products/category/tops"
const menUrl = "https://dummyjson.com/products/category/mens-shirts";
const womenUrl = "https://dummyjson.com/products/category/womens-dresses";

async function generateProducts(url, sectionName) {
    const response = await fetch(url);
    const data = await response.json();
    // title, price, thumbnail

    for (product of data.products) {    
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = product.thumbnail;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.appendChild(document.createTextNode(product.title));

        const cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.appendChild(document.createTextNode(`$${product.price}`));

        cardBody.append(cardTitle, cardText);
        card.append(img, cardBody);
        sectionName.appendChild(card)
    }
} 

generateProducts(trendingUrl, trending);
generateProducts(menUrl, mens_clothing);
generateProducts(womenUrl, womens_clothing);