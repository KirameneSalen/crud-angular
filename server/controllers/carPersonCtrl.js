const { response } = require("express");

module.exports = db => {
    return {
        create: (req, res) => {
            db.models.CarPerson.create(req.body).then(() => {
                res.send({ success: true });
            }).catch(() => { res.status(401); res.end() });
        },

        find: (req, res) => {
            db.query(`SELECT "id", "marca", "model", "an_fabricatie", "capacitate_cilindrica", "taxa_impozit"
            FROM "CarPerson" JOIN "Car" on "id" = "CarId"
            WHERE "PersonId" = ${req.params.id}`, { type: db.QueryTypes.SELECT }).then(resp => {
                res.send(resp);
            }).catch(() => { res.status(401); res.end() });
        },

        destroy: (req, res) => {
            db.query(`DELETE FROM "CarPerson" WHERE "CarId" = ${req.query.car_id} AND "PersonId" = ${req.query.person_id}`, { type: db.QueryTypes.DELETE }).then(() => {
                res.send({ success: true });
            }).catch(() => { res.status(401); });
        }
    };
};
