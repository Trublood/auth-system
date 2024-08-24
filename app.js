require("dotenv").config();

console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);

const express = require("express");
const app = express();
const authRoute = require("./routes/authRoutes");
const { sequelize } = require("./models/user");

const PORT = process.env.PORT || 3000;;

app.use(express.json());

app.get('/', (req, res) => {
    res.status().send('Auth Yay!!!');
});

app.use('/auth', authRoute);

const startServer = async ()=>{
    try {
        await sequelize.authenticate();
        console.log("Database connected");

        await sequelize.sync();
        console.log("Database synced");

        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log('Unable to connect to database', error);
    }
}

startServer();