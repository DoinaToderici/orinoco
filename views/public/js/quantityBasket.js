const numberBasket = document.getElementById("number-basket");

function getBasketQuantity() {
  let basket = JSON.parse(localStorage.getItem("itemsArrayLocalStorage")); 
  const quantityElements = basket.map((element) => element.productQuantity);

  if (basket === null) {
    numberBasket.innerHTML = 0;
  } else {
    numberBasket.innerHTML = quantityElements.reduce((a, b) => a + b, 0);
  }
}

getBasketQuantity();
