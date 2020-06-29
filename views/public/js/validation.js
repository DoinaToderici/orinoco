const validationMessage = document.getElementById("validation-message");
const listProducts = document.getElementById("list-products");
const itemsServer = JSON.parse(
  localStorage.getItem("itemsServerArrayLocalStorage")
);
let totalPrice = 0;
console.log(itemsServer);

validationMessage.innerHTML = `<p>${itemsServer.contact.firstName}, votre commande a été bien réceptionné, félicitations.</p>
<p>Commande n°  <span> ${itemsServer.orderId}<span></p><br> 
<p>Voici la rendu de votre commande:</p><br>`;

for (const product of itemsServer.products) {
  console.log(product);
  totalPrice += product.price;

  validationMessage.innerHTML += `<ul><li class="row col-8 offset-2">
  <div class="col-2"><img src="${product.imageUrl}"/></div> 
  <div class="col-4">${product.name}</div><div class="col-2">  ${product.price} $</div>
  </li></ul>
  <hr>`;
}
validationMessage.innerHTML += `<p class="price col-8 offset-2">Total: ${totalPrice}</p>`;

validationMessage.innerHTML += `<p class="row">Votre commande séra expédiée à:</p><br>
<p><span>${itemsServer.contact.firstName} ${itemsServer.contact.lastName}<br>${itemsServer.contact.email}<br>${itemsServer.contact.address}<br>${itemsServer.contact.city}</span>


</p>`;
