const jsonwebtoken = require("jsonwebtoken");
const crypto = require('node:crypto');

const Login = (req, res) => {
    try {
        const { user, psw } = req.body;
        const correctPassword = ((user === process.env.USER) && (psw === process.env.PASSWD));
        if (!correctPassword) {
            res.status(401).json({ message: 'E-mail ou senha incorretas!' }).end;
        } else {
            const token = jsonwebtoken.sign(
                {
                    id: crypto.randomUUID(),
                    name: "Fulano da Silva",
                    avatar: "https://cdn-icons-png.flaticon.com/128/1326/1326377.png"
                },
                process.env.SECRET_JWT,
                { expiresIn: "2min" }
            );
            res.status(200).json({ token: token }).end();
        }
    } catch (err) {
        res.status(500).send(err).end();
    }

    res.status(200).end();
};

module.exports = {
    Login
}