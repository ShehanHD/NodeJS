const connection = require("../connection")

const fetchReference = async (req, res) => {
    let { id } = req.params;

    connection.query(`SELECT * from visitor WHERE id_company = ${id};`, function (err, result) {
        if (err) {
            res.status(500);
            res.json({
                "info": err,
                "message": "DB error"
            })
        } else {
            if (result.length !== 0) {
                res.status(200);
                res.json(result);
            } else {
                res.status(204);
                res.json({ "message": "No reference found" });
            }
        }
    });
}

const addReference = async (req, res) => {
    connection.query(`INSERT INTO visitor(name, surname, id_company) VALUES(${req.body.name}, ${req.body.surname}, ${req.body.compID})`, function (err, result) {
        if (err) {
            res.status(500);
            res.json({
                "info": err,
                "message": "DB error"
            })
        } else {
            if (result.length !== 0) {
                res.status(200);
                res.json(result);
            } else {
                res.status(204);
                res.json({ "message": "No reference found" });
            }
        }
    });
}

module.exports = {
    fetchReference,
    addReference
}