const fivem = require("fivem-server-stats")
const express = require("express")
const app = express()

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.get('/api/rlo/players', (req, res) => {
    try {
        fivem.getPlayers("reallifeonline.cf:30120").then((data) => res.json(data))
    } catch (error) {
        res.json({ code: 500, message: "Internal Server Error" })
        console.error(error)
    }
});

app.get('/api/rlo/online', (req, res) => {
    try {
        fivem.getPlayerLength("reallifeonline.cf:30120").then((data) => res.json(data))
    } catch (error) {
        res.json({ code: 500, message: "Internal Server Error" })
        console.error(error)
    }
});

app.get('/api/rlo/info', (req, res) => {
    try {
        fivem.getInfo("reallifeonline.cf:30120").then((data) => res.json(data))
    } catch (error) {
        res.json({ code: 500, message: "Internal Server Error" })
        console.error(error)
    }
});

app.get('/api/rlo/dynamic', (req, res) => {
    try {
        fivem.getDynamic("reallifeonline.cf:30120").then((data) => res.json(data))
    } catch (error) {
        res.json({ code: 500, message: "Internal Server Error" })
        console.error(error)
    }
});
app.listen(3000, () => {
    console.log('server started');
});
