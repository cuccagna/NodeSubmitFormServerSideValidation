const express = require("express");
const app = express();
const { products } = require("../data");

/* OCCHIO PER PER OGNI RICHIESTA PUOI AVERE SOLO UNA RISPOSTA 
quindi a volte ti servirà fare 
return res.json()
invece di solo 
res.json() */

/* Nota il percorso dentro href che è 
/api/products  */
app.get("/", (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>');
});

/* products dovrebbe essere una pagina dinamica perchè il contenuto dipende 
dai dati  */
app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });

  res.json(newProducts);
});

/* Per richiedere uno specifico prodotto potresti usare come url 
/api/products/1
ma in questo modo dovresti mettere una route con un URL diverso per ogni 
id cioè ogni prodotto diverso.
Usa invece un parametro come fa John */

/* NOTA BENE 
ALTRO ESEMPIO DI ROUTE PIU' COMPLESSO
/api/products/:productID/reviews/:reviewId
Di tutti i prodotti me ne faccio tornare uno in particolare, poi mi 
prendo le review di quel prodotto, e tra tutte le review mi 
prendo quella con uno specifico id */

app.get("/api/products/:productID", (req, res) => {
  // console.log(req)
  // console.log(req.params)
  //NOTA BENE req.params torna un oggetto del tipo
  /* {productId:3}
  cioè nome del parametro e id passato nella URL tipo /api/products/3
  quindi dovrai fare 
  req.params.productID ed occhio che lo torna come stringa */
  const { productID } = req.params;

  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );

  //NOTA BENE
  //find() torna undefined se invii un url con un parametro che non esiste nei dati
  if (!singleProduct) {
    return res.status(404).send("Product Does Not Exist");
  }

  return res.json(singleProduct);
});

/* con un url  come /api/products/:productID/reviews/:reviewID 
req.params sarà un oggetto con 2 proprietà productId e reviews 
perchè l'url ha due parametri */
app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("hello world");
});

/* Nota che se io ho
/api/v1/search
e
/api/v1/search?nome=John&id=4 
verrà triggerata sempre questa route (non era così in node senza express)
Questo è vero solo per query parameters Cioè sia 
/api/v1/search che  /api/v1/search?nome=John&id=4 
innescherà app.get("/api/v1/search",....)

Non ho bisogno di averne due separate
Invece /api/products e /api/products/1 non triggerano tutte e due 
app.get("/api/products")
C'è bisogno di due routes separate esplicitamente.
*/

/* Qui il parametro limit rappresenta il numero di prodotti che voglio tornare. 
serarch=a rappresenta tornami solo i prodotti che iniziano con la a
La URL dovrebbe essere così:
/api/v1/query?search=a&limit=2 */

app.get("/api/v1/query", (req, res) => {
  // console.log(req.query)
  const { search, limit } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search');
    return res.status(200).json({ sucess: true, data: [] });
  }
  res.status(200).json(sortedProducts);
});

/* NOTA BENE
Quando usare URL parameters (detti anche routes parameters) e quando invece 
usare query parameters? 
URL parameters sono preferibili quando vuoi una pagina sia "ranked" dai motori di 
ricerca. Inoltre se la pagina è statica è lo standard. Inoltre è meno leggibile 
ma ha una sintassi meno ingombrante */

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
