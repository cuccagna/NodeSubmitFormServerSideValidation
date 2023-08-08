//npm i express --save
/* Oggi il --save è opzionale ma in passato se non lo mettevi non ti inseriva 
la dipendenza nel package.json
 */
const express = require("express");
const app = express();

/* L'ordine è importante. se inserisci
localhost:5000 sia 
app.get("/")  che app.all("*")
sono matchati ma solo app.get è eseguito. Perchè? Perchè viene per primo.
Prova a mettere prima app.all("*") e vedrai il messaggio d'errore 
resource not found. */

app.get("/", (req, res) => {
  console.log("user hit the resource");
  res.status(200).send("Home Page");
});

// http://localhost:5000/about?pippo=3 viene innescata la callback della route /about
//Non era così senza usare express, cioè se scrivevi
//if(req.url === "/about")  matchava solo /about ma non /about?pippo=3 infatti
//c'è un esempio nel libro a pag. 143 in cui prende solo il pathname eliminando
//la querystring e quant altro (usando new URL)
app.get("/about", (req, res) => {
  res.status(200).send("About Page");
});

/* app.all vuol dire qualunque verbo cioè Get , Post e qualunque altro metodo http 
Mettendo "*" vuol dire anche qualunque percorso  */

app.all("*", (req, res) => {
  res.status(404).send("<h1>resource not found</h1>");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
