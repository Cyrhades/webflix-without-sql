const connection = require("./conSql.js");

exports.create = (username, password, firstname, lastname) => {
    return connection.promise().query(`INSERT INTO user SET ?`, {username, password, firstname, lastname});
};

// connection.query(`INSERT INTO user (username, password, firstname, lastname) VALUES ("${username}", "${password}", "${firstname}", "${lastname}")`)