var http = require('http')
var path = require('path')
var express = require('express')
var bodyParser = require("body-parser");
var router = express.Router();
var app = express()
var jsonfile = require('jsonfile')
var fs = require('fs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));

router.get("/api/search/", function(req, res) {
    var parms = req.query.filtros
    var objpars = JSON.parse(parms)

    var ciudad = objpars.ciudad;
    var tipo = objpars.tipo;
    var desde = Number(objpars.desde);
    var hasta = Number(objpars.hasta);
    var flg = objpars.all;

    var file = './server/data.json';
    var jsonData = jsonfile.readFileSync(file);

    if (flg === '1') {

        if (ciudad !== '' && tipo === '') {
            jsonData = jsonData.filter(function(o) {

                var precio = o.Precio;
                precio = precio.replace(/[$,]+/g, "");
                var numprecio = Number(precio);

                return (o.Ciudad === ciudad && (numprecio >= desde && numprecio <= hasta));
            })
        } else if (ciudad === '' && tipo !== '') {
            jsonData = jsonData.filter(function(o) {

                var precio = o.Precio;
                precio = precio.replace(/[$,]+/g, "");
                var numprecio = Number(precio);

                return (o.Tipo === tipo && (numprecio >= desde && numprecio <= hasta));
            })
        } else if (ciudad !== '' && tipo !== '') {
            jsonData = jsonData.filter(function(o) {

                var precio = o.Precio;
                precio = precio.replace(/[$,]+/g, "");
                var numprecio = Number(precio);

                return (o.Ciudad === ciudad && o.Tipo === tipo && (numprecio >= desde && numprecio <= hasta));
            })
        } else {
            jsonData = jsonData.filter(function(o) {

                var precio = o.Precio;
                precio = precio.replace(/[$,]+/g, "");
                var numprecio = Number(precio);

                return (numprecio >= desde && numprecio <= hasta);
            })
        }
    }

    res.json(jsonData);
});


app.use(express.static('public'))
app.use('/', router);

var PORT = 8086
app.listen(PORT);
console.log("Listening to PORT 3000");