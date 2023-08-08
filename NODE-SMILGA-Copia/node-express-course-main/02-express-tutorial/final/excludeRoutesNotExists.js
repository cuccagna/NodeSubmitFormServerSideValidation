const VALID_PATHS = ["/", "/about", "/api/products", "/api/items"];

/* res.locals  permette di passare i valori da una funzione di 
middleware a un'altra.
In realtà res.locals è la best practice solo quando usi render() e le view 
(non so  cosa sono)
NOTA BENE
La best practice è attaccare le proprietà all'oggetto req */

const excludeRoutesNotExists = (req, res, next) => {
  //This is dangerous perchè req.path funziona in questo caso solo perchè
  //il punto di mount del middleware in app.use è la root
  //POtresti usare req.originalUrl.replace("/^\?.+$/","")
  //perchè res.originalUrl ritorna anche la query string
  const path = req.path;
  console.log(
    "🚀 ~ file: excludeRoutesNotExists.js:12 ~ excludeRoutesNotExists ~ path:",
    path
  );
  //NOTA BENE. LA BEST pRACTICE è ATTACCARE a res le proprietà a meno che non
  //usi le view e render
  //NOTA BENE
  //Inoltre req e res sono oggetti globali che non vengono creati per ogni nuova
  //richiesta ma vengono nuovamente valorizzati a ogni richiesta (tipo viene
  //rivalorizzato il campo method). Ma non viene rivalorizzato un campo come
  //path404 che quindi puoi rileggere e trovare intatto tra una richiesta e l'altra
  res.locals.path404 = !VALID_PATHS.includes(path);
  next();
};

module.exports = excludeRoutesNotExists;
