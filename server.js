const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const fs = require('fs');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const css = fs.readFileSync('./public/assets/style.css', 'utf-8');
const loginJS = fs.readFileSync('./public/javascript/login.js', 'utf-8')

const routes = require('./controllers');
const sequelize = require('./config/connection');
// const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});