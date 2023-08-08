const express = require("express");
const app = express();

/* Un middleware è una funzione che viene eseguita una volta che arriva la richiesta 
per una route. E viene eseguita prima del codice dentro quella route. Il middleware 
ha accesso alla request e alla response inoltre può anche chiamare il middleware 
succesivo invocando la funzione 
next()
Se il middleware è unico next() pass il controllo alla callback dentro la route 
Se fai res.send("Ciao")  viene cessata la comunicazione e viene tornata la 
risposta e il codice negli altri middleware e dentro la callback dentro la 
route non verrà eseguito. 

Il middleware va dichiarato tipo così:
app.get("/",middleware1,callBackfunction)
Puoi chiamare più funzioni come middleware fornendo un array 

app.get("/",[functionMiddleware1,functionMiddleware2],callBackfunction) 
e le funzioni verranno chiamate nell'ordine(possono anche essere messe con la virgola senza
  dobvere usare un array)

Puoi anche usare un GLOBAL MIDDLEWARE
app.use((req, res, next) => {
    const method = req.method;
    const url = req.url;
    const date = new Date().getFullYear();
    console.log(url, method, date);
    next();
});

In questo caso non sarà necessario mettere la funzione middleware dentro 
ogni route
Tuttavia la chiama app.use va fatta PRIMA delle route

Inoltre la funzione logger è meglio metterla in un file a parte e poi 
importarselo
*/

//  req => middleware => res

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

app.get("/", logger, (req, res) => {
  res.send("Home");
});
app.get("/about", logger, (req, res) => {
  res.send("About");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
