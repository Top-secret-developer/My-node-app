const express = require('express')
const app = express()
const path = require("path")
const bodyParser = require('body-parser');
const session = require('express-session');

// Setting view engine
app.set('view engine', 'ejs')

//getting our ejs file
app.get('/', (req, res) =>{
    res.render("index")
})


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}....`));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Dummy user data (replace with actual user authentication logic)
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

// Routes

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Dummy authentication logic
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.user = user;
        res.redirect('/dashboard');
    } else {
        res.redirect('/');
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.send(`Welcome, ${req.session.user.username}!`);
    } else {
        res.redirect('/');
    }
});




