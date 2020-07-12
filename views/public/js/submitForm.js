const messageErreur = document.getElementById("message-erreur");

function formSubmit(event) {
  event.preventDefault();

  //on récupère le tableau des produits de localStorage
  const basketItems = JSON.parse(
    localStorage.getItem("itemsArrayLocalStorage")
  );

  //on fait une iteration sur le tableau recupere de localStorage et a l'aide de map() on va creer un autre tableau contenant les id
  const idsProductsBasket = basketItems.map(function (element) {
    return element.productId;
  });


  //on recupere toutes les valeurs des imputs 
  const prenom = document.getElementById("prenom").value;
  const nom = document.getElementById("nom").value;
  const adresse = document.getElementById("adresse").value;
  const ville = document.getElementById("ville").value;
  const email = document.getElementById("email").value;

  //on cree un objet "contact" contenant les valeurs des imputs
  const contact = {
    firstName: prenom,
    lastName: nom,
    address: adresse,
    city: ville,
    email: email,
  };

  //dans le objet "data" on stocke les deux objets contenant les valeurs des imputs et les ids
  const data = { contact: contact, products: idsProductsBasket };

  const urlApi = "http://localhost:3000/api/teddies/order";


  //dans le objet "options" a ete stocke la methode POST 
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };


  //en  utilisant l'url de l'API et on envoie les donnees au server
  fetch(urlApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (success) {

      //dans le cas de succes, on supprime les produits existents dans le pannier
      localStorage.removeItem("itemsArrayLocalStorage");

      //on ajoute un tableau dans le localStorage contenant la réponse de serveur
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
