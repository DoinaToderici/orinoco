const summaryBasket = document.getElementById("summary-basket");
const totalPriceElement = document.getElementById("totalPrice");
//récupération du tableau de localStorage si existe, si non, on cree un nouveau tableau
const oldArrayItems =
  JSON.parse(localStorage.getItem("itemsArrayLocalStorage")) || []; 
let totalPrice = 0;

//l'affichage des tous les produits dans le panier
function displayAllItemsBasket() {
  for (const item of oldArrayItems) {
    totalPrice += item.productPrice * item.productQuantity;

    summaryBasket.innerHTML += `<div class="row">
      <div class="col-4">
        <img src="${item.productImage}"/>
      </div>
      <div class="col-8">
        ${item.productName}
        <br>color: ${item.arrayColors}
        <br>Quantity: ${item.productQuantity}
        <i class="fa fa-minus-circle" onclick="decrease('${
          item.selectProductId
        }')" aria-hidden="true"></i>
        <i class="fa fa-plus-circle" onclick="increase('${
          item.selectProductId
        }')" aria-hidden="true"></i>
        <br>${item.productPrice * item.productQuantity} $
        <br>   
        <a href="#">
          <button class="buttons"
            onclick="deleteProduct('${item.selectProductId}')">Supprimer
          </button>
        </a>
      </div>
    </div>`;
  }

  if (totalPriceElement) {
    totalPriceElement.innerHTML = `<b>Total price: ${totalPrice} $</b>`;
  }
}

displayAllItemsBasket();

function deleteProduct(currentSelectedId) {
  const id = currentSelectedId;

  //filtrer les éléments du tableau par identifiant et en créer un nouveau avec des éléments ayant des identifiants différents de celui que nous voulons supprimer
  let newItems = oldArrayItems.filter(function (item) {
    return item.selectProductId !== id;
  });

  //introduction du nouveau tableau dans le localStorage
  localStorage.setItem("itemsArrayLocalStorage", JSON.stringify(newItems));

  getBasketQuantity();
  //la réactualisation de la page chaque fois qu'un élément est supprimé
  window.location.reload();
}

function increase(currentSelectedId) {
  //determiner l'index de produit selectionné
  const itemIndex = findCurrentIndex(oldArrayItems, currentSelectedId);

  oldArrayItems[itemIndex].productQuantity += 1;
  localStorage.setItem("itemsArrayLocalStorage", JSON.stringify(oldArrayItems));
  window.location.reload();
}

function decrease(currentSelectedId) {
  const itemIndex = findCurrentIndex(oldArrayItems, currentSelectedId);

  if (oldArrayItems[itemIndex].productQuantity === 1) {
    deleteProduct(currentSelectedId);
    return;
  } else {
    oldArrayItems[itemIndex].productQuantity -= 1;
  }

  localStorage.setItem("itemsArrayLocalStorage", JSON.stringify(oldArrayItems));
  window.location.reload();
}

//la fonction qui permet de determiner l'index de produit selectioné
function findCurrentIndex(oldArrayItems, currentSelectedId) {
  return oldArrayItems.findIndex(
    (item) => item.selectProductId == currentSelectedId
  );
}
