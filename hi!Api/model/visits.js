const connection = require("../connection")

const newVisit = (req, res) => {

    let CheckID = `SELECT * FROM visitor WHERE name = '${req.body.name}' AND surname = '${req.body.surname}';`
    connection.query(CheckID, (CheckID_error, CheckID_results) => {
        if (CheckID_error) {
            res.status(500);
            res.json({
                "info": CheckID_error,
                "message": "DB error"
            });
        }
        else {
            if (CheckID_results.length !== 0) {
                let INSERT_VISIT = `INSERT INTO visits(time_in, id_visitor, id_reference, tempID) VALUES (current_timestamp(), ${CheckID_results[0].id} , ${req.body.refID}, '${req.body.name + CheckID_results[0].id}');`
                console.log(CheckID_results);
                connection.query(INSERT_VISIT, (INSERT_VISIT_error, INSERT_VISIT_results) => {
                    if (INSERT_VISIT_error) {
                        res.status(500);
                        res.json({
                            "info": INSERT_VISIT_error,
                            "message": "DB error"
                        });
                    } else {
                        res.status(200);
                        res.json({
                            "info": INSERT_VISIT_results,
                            "id": `'${req.body.name + CheckID_results[0].insertId}'`
                        })
                    }
                });
            }
            else {
                let NEW_VISITOR = `INSERT INTO visitor (name, surname, company_name, id_company) VALUES ('${req.body.name}', '${req.body.surname}', '${req.body.compName}', ${req.body.compID});`
                connection.query(NEW_VISITOR,
                    (NEW_VISITOR_error, NEW_VISITOR_results) => {
                        if (NEW_VISITOR_error) {
                            res.status(500);
                            res.json({
                                "info": NEW_VISITOR_error,
                                "message": "DB error"
                            });
                        } else {
                            let INSERT_VISIT = `INSERT INTO visits(time_in, id_visitor, id_reference, tempID) VALUES (current_timestamp(), ${NEW_VISITOR_results.insertId} , ${req.body.refID}, '${req.body.name + NEW_VISITOR_results.insertId}');`
                            console.log(CheckID_results);
                            connection.query(INSERT_VISIT, (INSERT_VISIT_error, INSERT_VISIT_results, fields) => {
                                if (INSERT_VISIT_error) {
                                    res.status(500);
                                    res.json({
                                        "info": INSERT_VISIT_error,
                                        "message": "DB error"
                                    });
                                } else {
                                    res.status(200);
                                    res.json({
                                        "info": INSERT_VISIT_results,
                                        "id": `'${req.body.name + NEW_VISITOR_results.insertId}'`
                                    })
                                }
                            });
                        }
                    });
            }
        }
    });

}

const exit = (req, res) => {
    let { id } = req.params;
    let INSERT_VISIT = `UPDATE visits SET time_out = current_timestamp(), tempID = NULL WHERE tempID = '${id}';`

    connection.query(INSERT_VISIT, (INSERT_VISIT_error, INSERT_VISIT_results) => {
        if (INSERT_VISIT_error) {
            res.send(INSERT_VISIT_error);
        } else {
            if (INSERT_VISIT_results.affectedRows === 0) {
                res.status(204);
                res.json({
                    "info": INSERT_VISIT_results,
                    "message": "ID is not valid!"
                });
            }
            else {
                res.status(200);
                res.json({
                    "info": INSERT_VISIT_results,
                    "message": "Thank you!"
                });
            }
        }
    });
}

module.exports = {
    newVisit, exit
}