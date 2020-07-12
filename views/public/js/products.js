const productsList = document.getElementById("products");

//À l'aide de l'API on récupère tous les produits
fetch(`http://localhost:3000/api/teddies`)
  .then(function (response) {
    return response.json();
  })
  .then(function (responseJson) {
    for (const product of responseJson) {
      productsList.innerHTML += `<li class="col-lg-6">
        <a href="file:///Users/doina/Desktop/OC/P5_Doina_Toderici/Orinoco/JWDP5/views/product.html#teddies#${product._id}">
          <img src="${product.imageUrl}"/>
        </a>
      </li>`;
    }
  });
