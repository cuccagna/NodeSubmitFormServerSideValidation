const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = require("./logger");
const authorize = require("./authorize");
//  req => middleware => res

// app.use([logger, authorize])

/* Negli esempi precedenti abbiamo visto alcuni middleware creati da noi. 
Esistono dei middlewari già pronti di express,  uno di questi è 
express.static 
Quando c'è una get, questo middleware express va a vedere se la pagina c'è nella cartella 
indicata, public e se la trova la legge e la restituisce senza attivare il codice 
nella route. Se non la trova , esegue il codice nella route.  */
//app.use(express.static("../public"));

/* Puoi anche usare un middleware di terzi come morgan che ti stampa alcune 
informazioni in console sulla richiesta e i tempi di risposta.
morgan va installato con npm install morgan  */
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/api/products", (req, res) => {
  res.send("Products");
});
app.get("/api/items", (req, res) => {
  console.log(req.user);
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
