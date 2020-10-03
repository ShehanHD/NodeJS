const connection = require("../connection")

const fetchCompanies = async (req, res) => {
    connection.query(`SELECT * FROM company WHERE 1;`, function (err, result) {
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
                res.status(400);
                res.json({ "message": "Company din't found" });
            }
        }
    });
}

const fetchCompany = async (req, res) => {
    let { id } = req.params;

    connection.query(`SELECT * FROM company WHERE id = ${id};`, function (err, result) {
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
                res.status(400);
                res.json({ "message": "Company din't found" });
            }
        }
    });
}

const deleteCompany = async (req, res) => {
    let { id } = req.params;

    connection.query(`DELETE FROM company WHERE id = ${id};`, function (err, result) {
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
                res.status(400);
                res.json({ "message": "Company din't found" });
            }
        }
    });
}

module.exports = {
    fetchCompanies,
    fetchCompany,
    deleteCompany
}