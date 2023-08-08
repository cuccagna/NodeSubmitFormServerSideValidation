const http = require("http");

const server = http.createServer((req, res) => {
  //req.method TORNA IL METODO, GET,POST ecc.
  // console.log(req.method)

  //req.url torna l'url inserita dall'utente nel browser
  //In realtà con req.url non è sicuro. FARE come a pag. 143 del libro Node
  //dove si usa let requrl=new URL(req.url,"http://localhost:numPorta")
  //nota che la classe URL è globale
  //e poi  requrl.pathname
  /*  Questo scongiura il rischio che se io inserisco 
  http://localhost/about?pippo=3 non viene innescato l'url a riga 32 
  perchè req.url torna /about?pippo=3  quindi con pathname mi faccio 
  tornare solo /about eleiminando la query string */
  const url = req.url;
  console.log("🚀 ~ file: 01-http-basics.js:9 ~ server ~ url:", url);
  // home page

  if (url === "/") {
    /* Prova a cambiare 
    E' CHIAMATO MIME TYPE
    res.writeHead(200, { "content-type": "text/plain" });
     e vedei che nel browser troverai il testo <h1>...http. */
    res.writeHead(200, { "content-type": "text/html" });
    //Setta il body del messaggio
    res.write("<h1>home page</h1>");
    //response.end([data[, encoding]][, callback])
    //La callback viene chiamata quando lo stream di risposta è terminato
    res.end();
    //Puoi fare in maniera alternativa, senza usare res.write
    //res.end("<h1>home page</h1>")
  }
  // about page
  else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>about page</h1>");
    res.end();
  }
  // 404
  else {
    //NOTA QUI lo STATUS CODE
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>page not found</h1>");
    res.end();
  }
});

server.listen(5000);
