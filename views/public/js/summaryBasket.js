const summaryBasket = document.getElementById("summary-basket");
const totalPriceElement = document.getElementById("totalPrice");
const oldArrayItems =
  JSON.parse(localStorage.getItem("itemsArrayLocalStorage")) || []; //récupération du tableau de localStorage
let totalPrice = 0;

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
          <button
            onclick="deleteProduct('${item.selectProductId}')" 
            >
            Delete
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

  let newItems = oldArrayItems.filter(function (item) {     //filtrer les éléments du tableau par identifiant et en créer un nouveau avec des éléments ayant des identifiants différents de celui que nous voulons supprimer
    return item.selectProductId !== id;
  });

  localStorage.setItem("itemsArrayLocalStorage", JSON.stringify(newItems)); //introduction du nouveau tableau dans le localStorage

  getBasketQuantity();
  window.location.reload();     //la réactualisation de la page chaque fois qu'un élément est supprimé
}

function increase(currentSelectedId) {
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

function findCurrentIndex(oldArrayItems, currentSelectedId) {
  return oldArrayItems.findIndex(
    (item) => item.selectProductId == currentSelectedId
  );
}
