const express = require("express");
const app = express();
const path = require("path");
const router = require("./app/routes.js");
const session = require('express-session');
const flash = require('express-flash-messages');

const dotenv = require("dotenv")
dotenv.config();

app.use(express.urlencoded({extended:false}));

//--------------------------------------------------------------------
//      Ajout du midlleware express session
//--------------------------------------------------------------------
app.use(session({
    secret: '637846f7d6afd74e49d1ed0845c96c2499a0d9bb', resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));

//--------------------------------------------------------------------
//      Ajout du midlleware express flash messages
//--------------------------------------------------------------------
app.use(flash());

// Définir dans notre application le moteur de template utilisé
app.set('view engine', 'pug');

// On déclare dans notre application quel sera notre répertoire static
app.use(express.static(path.join(__dirname, "public")));

router(app);


// Mise en écoute du serveur
app.listen(process.env.PORT, () => {
    console.log(`Server HTTP en écoute : http://localhost:${process.env.PORT}`);
})