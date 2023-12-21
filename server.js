const express = require("express");
const app = express();
const path = require("path");
const router = require("./app/routes.js");
const dotenv = require("dotenv")
dotenv.config();

// Définir dans notre application le moteur de template utilisé
app.set('view engine', 'pug');

// On déclare dans notre application quel sera notre répertoire static
app.use(express.static(path.join(__dirname, "public")));

router(app);

// Mise en écoute du serveur
app.listen(3000, () => {
    console.log(`Server HTTP en écoute : http://localhost:3000`);
})