const express = require('express')
const cors = require('cors')
const sequelize = require("./db");
const MatchDB = require("./utils/match");
const CountryDB = require("./utils/country");
const UserDB = require("./utils/user");
const MiscDB = require("./utils/misc");
const PredictionDB = require("./utils/prediction");
const ResultsDB = require("./utils/result");

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())

app.get('/api/matches', async (req, res) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const matches = await MatchDB.getAllMatches();

        res.json(matches)
    } catch (e) {
        res.status(500).send('Database connection error');
    }
})

app.get('/api/users', async (req, res) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const users = await UserDB.getAllUsers();

        res.json(users)
    } catch (e) {
        res.status(500).send('Database connection error');
    }
})

app.get('/api/countries', async (req, res) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const countries = await CountryDB.getAllCountries();

        res.json(countries)
    } catch (e) {
        res.status(500).send('Database connection error');
    }
})

app.get('/api/misc', async (req, res) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const misc = await MiscDB.getMisc();

        res.json(misc)
    } catch (e) {
        res.status(500).send('Database connection error');
    }
})

app.get('/api/predictions', async (req, res) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const predictions = await PredictionDB.getAllPredictions();

        res.json(predictions)
    } catch (e) {
        res.status(500).send('Database connection error');
    }
})

app.get('/api/results', async (req, res) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const results = await ResultsDB.getAllResults();

        res.json(results)
    } catch (e) {
        res.status(500).send('Database connection error');
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})