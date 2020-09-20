import { connection } from '../sqlConfig.js'

export const getIndex = (req, res) => {
    let sqlQuary = "SELECT * from reparti;";

    connection.query(sqlQuary,
        (error, results, fields) => {
            if (error) throw error;

            res.status(200).send(results);
        });
}

export const getItem = (req, res) => {
    let { id } = req.params;
    let sqlQuary = "SELECT * from reparti WHERE id_reparto = " + id + ";";

    connection.query(sqlQuary,
        (error, results, fields) => {
            if (error) throw error;

            res.status(200).send(results);
        });
}