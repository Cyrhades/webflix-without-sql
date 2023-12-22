const conSql = require("./app/conSql.js");

conSql.connection.query('SELECT "OK" AS response', (err, results, fields) => {
    if(err || results[0].response !== 'OK') {
        console.log(`connexion SQL impossible, vérifiez que votre serveur est démarré`)
    }
    else {
        console.log(`Connexion SQL valide`)
    }
    process.exit(1);
});