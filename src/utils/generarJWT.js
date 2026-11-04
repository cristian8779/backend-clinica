const jwt = require("jsonwebtoken");

const generarJWT = (id, version = 0) => {

    return new Promise((resolve, reject) => {

        const payload = {
            id,
            version
        };

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
