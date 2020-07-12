const productContent = document.getElementById("product");
const url = window.location.href; //récupération d'URL
const hashes = url.split("#"); //en utilisant la méthode split () on divise l'url dans un tableau composé des éléments après # (diez) afin qu'on' puisse y accéder
const idTedy = hashes[2]; //récupération de l'id
let i = 1;

fetch(`http://localhost:3000/api/teddies/${idTedy}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (product) {
    productObject = product;
    let arrayColors;
    let arrayOptionsColors;
    let htmlQuantity;

    // si "colors" existe dans le productobject on va creer un tableau avec toutes les valeurs existantes
    if ("colors" in productObject) {
      arrayColors = productObject.colors;
    }

    //affiche le tableau des couleurs
    for (const option of arrayColors) {
      arrayOptionsColors += `<option value="${option}">${option}</option>`;
    }

    //affiche le tableau des quantités contenu entre 1 et 10
    for (let index = 1; index <= 10; index++) {
      htmlQuantity += `<option value="${index}">${index}</option>`;
    }

    //injection de contenu dans div
    productContent.innerHTML = `<div class="row">                       
    <div class="col-lg-6 col-12">
    <img src="${product.imageUrl}"/>
    </div>
    <div class="col-lg-6 col-12 product-description">
    <span class="name">${product.name}<br>
     </span><span class="description">${product.description}</span><br>
     </span><span class="price">${product.price} $</span><br>
     <select id="selectedColor">${arrayOptionsColors}</select>
     <select id="selectedQuantity">${htmlQuantity}</select>
     <div class="buttons">
     <a href="#" onclick="addProduct(event)">Ajouter au panier</a>
     </div>
     </a>
     </div>
    </div>`;
  });

function addProduct(event) {
  //annuler  le comportement par défaut de la fonction
  event.preventDefault();
  const selectedColor = $("#selectedColor option:selected").text();
  const selectedQuantity = $("#selectedQuantity option:selected").text();

  // si le tableau existe on la récupère si'il n'existe pas on crée une table vide
  let oldArrayItems =
    JSON.parse(localStorage.getItem("itemsArrayLocalStorage")) || [];

  // crée un nouveau item qu'on souhaite inclure dans le localStorage
  let newItem = {
    productImage: productObject.imageUrl,
    productName: productObject.name,
    productPrice: productObject.price,
    productId: productObject._id,
    arrayColors: selectedColor,
    selectProductId: `${productObject._id}${Date.now()}`, // personnalisér l'id
    productQuantity: Number(selectedQuantity),
  };

  //le nouvel article est inclus dans le tableau des articles
  oldArrayItems.push(newItem);

  //le nouveau tableau avec les nouvelles articles est inclus dans le localStorage
  localStorage.setItem("itemsArrayLocalStorage", JSON.stringify(oldArrayItems));
  getBasketQuantity();
}
