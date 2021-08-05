const { response } = require('express')
const express = require('express')

const app = express()


const mysql = require('mysql')
  
const config = {
  host:'db',
  user:'root',
  password:'root',
  database:'desafiodb'
};



var descricao = undefined

app.get('/', (req,resp) => {
    
   descricao = "<h1>Full Cycle Rocks! </h1><br>";
   
  if(req.query.nome != undefined){
       
    const connection = mysql.createConnection(config)

    const sqlInsert = `INSERT INTO people(name) Values('`+req.query.nome+`')`
    connection.query(sqlInsert)
    connection.end()

    resp.redirect("http://localhost:8080/")
  
  }else{

    var query = `SELECT * FROM people`
    const connection = mysql.createConnection(config)

    connection.query(query,function (err,rows){
      if(err){
        console.log('error ', err)
      } else {         
        descricao += montarTable(rows)
        resp.send(descricao)
      }

      connection.end()
      
    })

   
  }



})


app.listen(3000,()=>{

    console.log("Rodando na porta 3000")

})


function montarTable(resultadoQuery) {

  var resultadoTable = "<table style='border: 1px solid black'><tr><th>Id</th><th colspan='2'>Name</th></tr>";

  for (r in resultadoQuery) {
    resultadoTable += "<tr><td>" + resultadoQuery[r].id + "</td><td>" + resultadoQuery[r].name + "</td></tr>";
  }

  resultadoTable += "</table>";

  console.log(resultadoTable)

  return resultadoTable;
}

