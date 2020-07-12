const validationMessage = document.getElementById("validation-message");
const listProducts = document.getElementById("list-products");

//on recupere le tableau de localStorage avec les donnees envoyé par le server
const itemsServer = JSON.parse(
  localStorage.getItem("itemsServerArrayLocalStorage")
);
let totalPrice = 0;

validationMessage.innerHTML = `<p>${itemsServer.contact.firstName}, votre commande a été bien réceptionné, félicitations.</p>
<p>Commande n°  <span> ${itemsServer.orderId}<span></p><br> 
<p>Voici la rendu de votre commande:</p><br>`;

for (const product of itemsServer.products) {
  totalPrice += product.price;

  validationMessage.innerHTML += `<ul><li class="row col-lg-8 offset-lg-2 col-12">
  <div class="col-3"><img src="${product.imageUrl}"/></div> 
  <div class="col-4">${product.name}</div>
  <div class="col-3">${product.price} $</div>
  </li></ul>
  <hr>`;
}
validationMessage.innerHTML += `<p class="price col-8 offset-2">Total: ${totalPrice}</p>`;

validationMessage.innerHTML += `<p class="row">Votre commande séra expédiée à:</p><br>
<p><span>${itemsServer.contact.firstName} ${itemsServer.contact.lastName}<br>${itemsServer.contact.email}<br>${itemsServer.contact.address}<br>${itemsServer.contact.city}</span>
</p>`;
