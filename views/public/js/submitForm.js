const messageSuccess = document.getElementById("message-success");
const messageErreur = document.getElementById("message-erreur");

function formSubmit(event) {
  event.preventDefault();

  const basketItems = JSON.parse(
    localStorage.getItem("itemsArrayLocalStorage")
  );

  const idsProductsBasket = basketItems.map(function (element) {
    return element.productId;
  });

  const prenom = document.getElementById("prenom").value;
  const nom = document.getElementById("nom").value;
  const adresse = document.getElementById("adresse").value;
  const ville = document.getElementById("ville").value;
  const email = document.getElementById("email").value;

  const contact = {
    firstName: prenom,
    lastName: nom,
    address: adresse,
    city: ville,
    email: email,
  };

  const data = { contact: contact, products: idsProductsBasket };

  const urlApi = "http://localhost:3000/api/teddies/order";

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };

  fetch(urlApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (success) {
      console.log(success);
      localStorage.removeItem("itemsArrayLocalStorage");
      localStorage.setItem(
        "itemsServerArrayLocalStorage",
        JSON.stringify(success)
      );
      window.location =
        "file:///Users/doina/Desktop/OC/P5_Doina_Toderici/Orinoco/JWDP5/views/validation.html";
    })
    .catch(function (error) {
      messageSuccess.innerHTML = `Erreur`;
    });
}
