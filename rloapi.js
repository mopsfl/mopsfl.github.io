const fetch = require("node-fetch")
const express = require("express")
const rateLimit = require('express-rate-limit')
const app = express()
const requestServer = process.env['server']

const allowedOrigins = ["https://mopsfl.github.io", "http://127.0.0.1:5500"]
const requestLog = []

const isallowedOrigin = async (req) => {
    if (allowedOrigins.includes(req.headers.origin)) {
        return true
    } else return false
}

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: async (request, response) => {
        if (await isallowedOrigin(request)) return 1500
        else return 5
    },
    message: { code: 429, message: "Too many requests, please try again later..." },
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
})
app.use("/api", limiter)

app.get('/', (req, res) => {
    try {
        res.json({ code: 200, message: "OK" })
    } catch (error) {
        res.json({ code: 500, message: "Internal Server Error" })
        console.error(error)
    }
});

app.get('/api/rlo/players', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ""
    requestLog.push({ origin: req.headers.origin || "unknown", time: Date.now(), resource: req.route.path })
    console.log(`resource '${req.route.path}' requested from ${req.headers.origin} (${ip})`)
    if (!allowedOrigins.includes(req.headers.origin)) {
        return res.status(405).json({ code: 405, message: "Origin not allowed." })
    }
    try {
        await fetch(`${requestServer}/api/rlo/players`).then(res => res.json()).then(data => {
             if(data) res.json(data)
        })
    } catch (error) {
        res.json({ code: 500, message: "Internal Server Error" })
        console.error(error)
    }
});

app.get('/api/rlo/dynamic', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ""
    requestLog.push({ origin: req.headers.origin || "unknown", time: Date.now(), resource: req.route.path })
    console.log(`resource '${req.route.path}' requested from ${req.headers.origin} (${ip})`)
    if (!allowedOrigins.includes(req.headers.origin)) {
        return res.status(405).json({ code: 405, message: "Origin not allowed." })
    }
    try {
        await fetch(`${requestServer}/api/rlo/dynamic`).then(res => res.json()).then(data => {
            if(data) res.json(data)
        })
    } catch (error) {
        res.json({ code: 500, message: "Internal Server Error" })
        console.error(error)
    }
});

app.get('/api/rlo/info', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ""
    requestLog.push({ origin: req.headers.origin || "unknown", time: Date.now(), resource: req.route.path })
    console.log(`resource '${req.route.path}' requested from ${req.headers.origin} (${ip})`)
    if (!allowedOrigins.includes(req.headers.origin)) {
        return res.status(405).json({ code: 405, message: "Origin not allowed." })
    }
    try {
        await fetch(`${requestServer}/api/rlo/info`).then(res => res.json()).then(data => {
             if(data) res.json(data)
        })
    } catch (error) {
        res.json({ code: 500, message: "Internal Server Error" })
        console.error(error)
    }
});

app.get("/api/discord/info/:id", async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || ""
    requestLog.push({ origin: req.headers.origin || "unknown", time: Date.now(), resource: req.route.path })
    console.log(`resource '${req.route.path}' requested from ${req.headers.origin} (${ip})`)
    if (!allowedOrigins.includes(req.headers.origin)) {
        return res.status(405).json({ code: 405, message: "Origin not allowed." })
    }
    if (!req.params.id) {
        res.status(400).json({ message: "Missing id param" });
        return;
    }
   const id = req.params.id
   if(id) {
       await fetch(`https://discordlookup.mesavirep.xyz/v1/${id}`)
            .then(res => res.json())
            .then((response) => {
                res.json(response)
            })
            .catch(console.error);
   }
});

app.get("/api/logs", (req, res) => {
    res.json(requestLog)
});

app.listen(3000, () => {
    console.log('server started');
});
