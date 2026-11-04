const jwt = require("jsonwebtoken");

const generarJWT = (id) => {

    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "8h"
            },
            (error, token) => {

                if (error) {
                    reject(error);
                }

                resolve(token);

            }
        );

    });

};

module.exports = generarJWT;
