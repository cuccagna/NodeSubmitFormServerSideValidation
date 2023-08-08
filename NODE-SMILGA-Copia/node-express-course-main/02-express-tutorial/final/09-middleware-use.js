const express = require("express");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");
const excludeRoutesNotExists = require("./excludeRoutesNotExists");
/* Qui fa vedere come dichiarare i middleware esternamente e poi importarli.
COme usare più di un middleware.
E come usare un middleware globale, che cioè si applica a tutte le routes senza 
doverlo esplicitamente scrivere a tutte le routes, usando app.use([logger,authorize]);
Nota che l'ordine è importante:
1) Se scrivi [logger, authorize] viene chiamato prima logger e poi authorize 
2) Se metti prima 
app.get("/",function(){....})
e poi 
app.use([logger, authorize])
quei due middleware non saranno applicati alla root.
Quindi mettere app.use prima di tutte le routes.

NOTA BENE
Puoi anche specificare un percorso:
app.use("/api",logger)
allora la funzione logger verrà chiamata per le routes 
/api e tutte quelle a seguire ad esempio anche per 
/api/products
/api/products/productId
e così via
Nel percorso puoi usare anche un'espressione regolare

Occhio che quindi
app.use([logger,authorize])
sarà eseguito anche per routes non definite da me (404 error).

NOTA BENE
req.path  
dovrebbe restituire il path dell'URL
Se hai
http://nomeDominio.com/products/pippo
dovrebbe restituirti   /products/pippo

Tuttavia usato dentro a middleware il discorso cambia
Se hai
app.use("/products",middleware1)
chiamare req.path ti restituisce il path relativo al punto di mounth 
cioè  nell'esempio di prima /pippo

req.originalUrl 
torna l'url  comprensivo in caso di query string
req.url potrebbe essere alterato in express dal middleware
*/
//  req => middleware => res
//Scritta così esegue per tutte le routes anche quelle inesistenti
//i due middleware. ALlora guarda come ho gestito la cosa dentro
//excludeRoutesNotExsists.js
//Uso res.locals per passare dei valori da un middleware all'altro
//app.use([logger, authorize]);
// api/home/about/products

app.use([excludeRoutesNotExists, logger, authorize]);

app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});

/* app.get("/about/:aboutId", (req, res) => {
  res.send("About " + req.params.aboutId);
}); */
app.get("/api/products", (req, res) => {
  res.send("Products");
});
app.get("/api/items", (req, res) => {
  //console.log(req.user);
  res.send("Items");
});

app.get("*", (req, res) => {
  res.status(404).send("<h1>Page not Found</h1>");
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000....");
});
