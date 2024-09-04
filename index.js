const express = require('express');
const sequelize = require('./config/database');
const session = require('express-session');
const task = require('./models/Task');
const notification = require('./models/Notification');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const handlebars = require('express-handlebars');
const account = require('./routes/account');
const employee = require('./routes/employee')
const employer = require('./routes/employer')
const path = require('path');

const app = express();

// we are setting up express session
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: new SequelizeStore({
            db: sequelize,
        }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

// we sync the database
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync({ force: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// middlewares for assets and form
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// view engine configuration
app.engine('handlebars', handlebars.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// the following are routes
app.use('/', account);
app.use('/employee', employee);
app.use('/employer', employer);


app.listen(8080, () => console.log(`server running on port 8080`))