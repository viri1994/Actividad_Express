const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const bodyParser= require ('body-parser');
const cookieParser= require ('cookie-parser');
app.use(bodyParser.json());
app.use(cookieParser());
const privateKey ='llave';


//ejercicio 4
let pets = [];

//---------------------------------------------------------------------
//all utiliza todos los metodos 
app.all('/hello', (req, res) => {
res.send('Hello World!')
});

app.all('/bye', (req, res) => {
res.send('Bye Bye!')
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.get('/receta', (req, res)=>{
	res.status(555).send("tacos")
});

app.put('/Nombre', (req, res)=>{
	res.status(450).send("Viri")
});

app.post('/menu', (req, res)=>{
	res.status(404).send({foo: "tacos"})
});

//Middleware

app.all('*', (req, res, next)=> {
	console.log('Viri esta haciendo la actividad',req.path)
	next()
});

app.get('/dog', (req, res)=>{
	res.send("ven");
});

app.get('/dog', (req, res)=>{
	res.send("ven2");
});

app.get('/cat', (req, res)=>{
	res.send("Hola");
});

app.get('/body',(req, res)=>{
	console.log(req.body);
	res.send(req.body);
});

app.get('/cookie',(req, res)=>{
	console.log(req.cookie);
	res.send(req.cookie);
});


app.get('/pets', (req, res)=> {
	console.log(req.cookies);// esto es para ver las cookies en consola
	res.status(200).send(pets);

});
	app.post('/pets',(req, res)=>{
		console.log(req.body);
	if(req.body.pet && req.body.name) {
		pets.push(req.body);
		res.status(201).send('ya se agrego');
	}else{
		res.status(400).send({error:'Pon correctos los datos'})
	}
});


//-------------------------------------------------------------------
app.post('/auth/signin', (req, res)=>{
	if(!(req.body.user && req.body.pass)){
		res.status(400).send("Necesitas introducir usuario y contraseña")
	}

//Generar token y leer token

jwt.sign({ user: req.body.user, theme: 'black' }, privateKey, function(err, token) {//estamos creando el token 
    if(err) {
      res.send(500).end();
    } else {
      res.status(200).send({token: token})
    	}
	});
  });
// para verificar si el usuario existe en la base de datos
app.use((req,res, next)=>{
	jwt.verify(req.headers.authorization, privateKey, function(err, decoded) {
    if(err) {
      res.status(500).end('aqui');
    } else {
      console.log(decoded);
      // checar ese usuario en la base datos a ver si existe
    	next()
		}

	});

  });
app.get('ultimo',(req, res)=>{
	res.send("ultimo")
})




app.listen(port, () => console.log('Servidor corriendo'))