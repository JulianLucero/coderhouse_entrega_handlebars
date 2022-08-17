const express = require ('express')
const handlebars = require('express-handlebars')
const {Contenedor} = require("./contenedor")
const contenedor = new Contenedor("productos.json")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.set('views', './src/views')
app.set('view engine' , 'hbs')


app.engine(
    'hbs',
    handlebars.engine({
        extname:".hbs",
        defaultLayout:'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
)

app.get('/productos', async(req, res) => {
    const productos = await contenedor.getAll();
    res.render('pages/list', {productos})
})

app.post('/productos', async(req,res) => {
    const {body} = req;
    await contenedor.save(body);
    res.redirect('/');
})

app.get('/', (req,res) => {
    res.render('pages/form', {})
})


// configuro el puerto 
const port = process.env.PORT || 8080

// configuro en que puerto se escucha
app.listen(port, err => {
    if(err) throw new Error(`Error on server listen: ${err}`)
    console.log(`Server running on port ${port}`)
})