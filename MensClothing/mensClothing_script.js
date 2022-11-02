const API = "https://dummyjson.com/products/category/";
const menCategory = ["mens-shirts", "mens-shoes"];

async function getWomensClothing() {
  try {
    menCategory.map(async (category) => {
      const API_URL_CAT = API + category;
      const response = await fetch(API_URL_CAT);
      const data = await response.json();

      data.products.map((photo) => {
        createCard(photo);
      });
    });

    function createCard(photo) {
      //img, title, price
      const photoUrl = photo.images[0];
      const photoDescription = photo.title;
      const price = `$ ${photo.price}`;

      const capitalizedPhotoDes = photoDescription
        .toLowerCase()
        .replace(/(?<=\b)\w/g, (match) => match.toUpperCase());

      // create  card
      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.classList.add("card-img-top", "h-75");
      img.setAttribute("src", photoUrl);
      img.setAttribute("alt", capitalizedPhotoDes);
      card.append(img);

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      // Link to product
      const linkProduct = document.createElement("a");
      linkProduct.classList.add("product-link");
      linkProduct.textContent = capitalizedPhotoDes;
      linkProduct.href = "../product_page/product_page.html";
      linkProduct.setAttribute("id", photo.id);
      linkProduct.addEventListener("click", (e) => {
        window.localStorage.setItem("productId", e.target.id);
      });

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      // cardTitle.textContent = capitalizedPhotoDes;
      cardBody.appendChild(cardTitle);
      cardTitle.appendChild(linkProduct);

      const cardSubTitle = document.createElement("h6");
      cardSubTitle.setAttribute("class", "card-text, text-muted");
      cardSubTitle.textContent = price;
      cardBody.appendChild(cardSubTitle);

      card.append(cardBody);
      cards_container.appendChild(card);
    }
  } catch (error) {
    alert(error);
  }
}

getWomensClothing();
