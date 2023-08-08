const http = require("http");

const server = http.createServer((req, res) => {
  //req.method TORNA IL METODO, GET,POST ecc.
  // console.log(req.method)

  //req.url torna l'url inserita dall'utente nel browser
  //Se inserisce localhost:5000 torna  "/"
  const url = req.url;
  console.log(url);
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
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>page not found</h1>");
    res.end();
  }
});

server.listen(5000);
