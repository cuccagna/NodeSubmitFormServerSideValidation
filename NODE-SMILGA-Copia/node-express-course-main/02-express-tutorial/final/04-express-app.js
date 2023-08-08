/* Risorse STATICHE vs DINAMICHE 
Quelle STATICHE sono servite così come sono cioè non cambiano in base a dei parametri.
Intendiamoci possono cambiare nel tempo. Se ho una pagina stile.css è statica perchè 
quando viene richiesta non cambia, ma io da sviluppatore la posso cambiare e caricarne 
la versione aggiornata.
DINAMICA è un altro concetto cioè la risorsa richiesta cambia in base ai parametri 
della richiesta. Basta pensare a quei file in cui c'è insieme html e php, script 
lato Server, in cui la risorsa cambia perchè lo script da risultati diversi in 
base ai parametri della richiesta.  

Le risorse STATICHE di solito si mettono in una cartella public 
Questa cartella viene messa nella root (di solito ma non è obbligatori) 
ed è associato alla root infatti 
è accessibile direttamente tramite il nome del dominio
CIoè se fai localhost:5000  viene servita la pagina index.html dentro la root
Se dentro public metti la cartella altro con dentro il file pippo.html
usando come root
/altro/pippo.html
ti viene servito il file pippo.html
NOTA BENE:
Insomma la root, /  ,si associa con la cartella public
*/

const express = require("express");
const path = require("path");

const app = express();

// setup static and middleware
//DI solito la cartella public va messa nella root
//Il percorso è relativo a dove sta il file 04-express-app.js
app.use(express.static("../public"));

/* 
sendFile è ASINCRONO.   Vuole un percorso assoluto. Può prendere 3 parametri.
http://expressjs.com/en/api.html#res.sendFile
Se nel secondo parametro specifichi la root 
allora il primo parametro sarà relativo alla root
Il terzo parametro è la callback che viene chiamata quando il trasferimento 
è completo o quando c'è un errore. Se c'è un errore e c'è la callback 
la callback deve terminare il processo richiesta-risposta oppure deve 
passare il controlla alla prossima route (esempio sul sito express)
res.sendFile(__dirname + '/pubblica/inserisciutente.html', function(err) {
  if (err) {
      res.status(err.status).end();
  }
}); */

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../navbar-app/index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000....");
});
