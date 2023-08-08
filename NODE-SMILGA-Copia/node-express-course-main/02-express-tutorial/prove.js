const express = require("express");
const app = express();

const { people } = require("./data");

/* Questo chiama il middleware anche per la route 
/api/people ma non trova un file da servire quindi viene innescata 
anche l'esecuzione del codice dentro la route che ritorna i dati json.

Se richiedo la root cioè localhost:4000 mi viene tornato index.html
*/
app.use(express.static("./methods-public"));
//app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/login2", [express.urlencoded({ extended: false }), moduleValidation]);
//Normale get
app.get("/api/people", function (req, res) {
  res.status(200).json({ success: true, data: people });
});

//Così però non è possibile prendere il body della post request.
//Si può usare body-parser ma è la maniera obsoleta di procedere
//La maniera moderna è usare un middleware come
//app.use(express.json()) disponibile dalla versione 4.16 in poi
//In questo modo il body viene rappresentato come un oggetto json
//accessibile facendo req.body
//Se il body è vuoto req.body torna {}
//Viene applicato questo middleware solo alle richieste il cui
//Content-type matcha con l'attributo type dentro app.use(express.json({type:"application/json"}))
//Il default per l'attributo type è application/json
//Invece quando i dati sono inviati tramite un form
//il cui content-type della rquest è
//content-type:application/x-www-form-urlencoded e non puoi cambiarlo a meno
//che non usi ajax.
//Facendo app.use(express.json()); non da errore ma req.body.name è
//undefined invece facendo app.use(express.json({type:"application/x-www-form-urlencoded"}));
//da proprio errore
//Senza usare Ajax l'alternativa  è usare
//un altro middleware cioè app.use(express.urlencoded({extended:false}))
//che come mime type di default supporta "application/x-www-form-urlencoded"

/* Se il tuo form contiene un input type="file" non va bene usare 
"application/x-www-form-urlencoded" ma devi usare 
multipart/form-data nell'attributo enctype del tag form perchè i dati 
devono essere spediti in binario  */

//Nota che usare Ajax ha una serie di vantaggi
/* 1)Possiamo aggiungere dei dati non presenti nel form 
2)Possiamo capire se c'è stato un errore o meno
3)Possiamo farci tornare l'errore e modificare l'html in base all'errore lato server 
 
Ho aggiunto la pagina javascript2.html dove uso Ajax e fetch per inviare i dati del form 
tramite una POST al server. La route predisposta alla ricezione è 
http://localhost:4000/login2 
cioè /login2
I dati non li invio tramite json ma usando FormData e URLSearchParams(formData).toString() 
posso usare come "Content-Type":"application/x-www-form-urlencoded" perchè il form non 
contiene campi input type="file" altrimenti dovrei inviare multipart.... come 
mime-type (mi pare).
Non serve inviare i dati in formato json come fa JHON.
Inoltre qui utilizzo il codice 422 quando i dati non sono ben formattati , faccio una 
validazione lato server e se sono validi torno 200 e un oggetto json vuoto
{success:true,data:""} se non sono validi torno 422 con 
{success:false,data:{"email:":"Error: email is not valid"}} 
in questo caso il campo datao contiene solo email perchè ho supposto che il campo
email non è valido. Se anche altri campi non sono validi aggiungo 
pure questi (ho due campi in tutto).
*/

//La route che viene innescata è quella indicata nell'attributo action
//del tag form (del tipo action="login") senza estensione

app.post("/login", function (req, res) {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("PLEASE PROVIDE CREDENTIALS");
});

//parsing of fields of form in the middleware
app.post("/login2", function (req, res) {
  if (Object.keys(req.data).length === 0) {
    res.status(200).json({ success: true, data: "" });
  } else {
    res.status(422).json({ success: false, data: req.data });
  }
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});

const regExpr = {
  name: /^(\p{L}{2,}\s)*(\p{L}{2,})$/iu,
  email:
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,
};

function moduleValidation(req, res, next) {
  const data = {};
  console.log(req.body);
  for (let propr in req.body) {
    if (!regExpr[propr].test(req.body[propr])) {
      //field is not valid
      data[propr] = `Error: ${propr} is not valid`;
    }
  }

  req.data = data;
  next();
}

/* function isValidName(name) {
  const regName = /^(\p{L}{2,}\s)*(\p{L}{2,})$/iu;
  return regName.test(name);
}

function isValidEmail(email) {
  const regEmail =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
  return regEmail.test(email);
}
 */
