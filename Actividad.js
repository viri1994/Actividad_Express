const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser= require ('body-parser');
const cookieParser= require ('cookie-parser');



//ejercicio 4
let pets = [];

app.use(bodyParser.json());
app.use(cookieParser());


app.post('/pets', (req, res)=> {
	console.log(req.body)
	console.log(req.cookies);// esto es para ver las cookies en consola


	if(req.body.pet && req.body.name) {
		pets.push(req.body);
		res.status(201).send('ya quedo');
	}else{
		res.status(400).send({error:'Pon correctos los datos'})
	}
});

//-------------------------------------------------------------------

/*app.all('/hello', (req, res) => res.send('Hello World!'))
app.all('/bye', (req, res) => res.send('Bye Bye!'))
app.use('/assets', express.static(path.join(__dirname, 'assets')))


app.get('/receta', (req, res)=>{
	res.status(555).send("tacos")
})

app.put('/Nombre', (req, res)=>{
	res.status(450).send("Viri")
})

app.post('/menu', (req, res)=>{
	res.status(404).send({foo: "tacos"})
})

//Middleware

app.all('*', (req, res, next)=> {
	console.log('Viri esta haciendo la actividad',req.path)
	next()
})
app.get('/dog', (req, res)=>{
	res.send("ven");
})

app.get('/dog', (req, res)=>{
	res.send("ven2");
})

app.get('/cat', (req, res)=>{
	res.send("Hola");
})*/





app.listen(port, () => console.log(`Example app listening on port ${port}!`))