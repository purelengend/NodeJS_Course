const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');

const sortMiddleware = require('./app/middleware/SortMiddleware');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//Connect to db
db.connect();

app.use('*/css', express.static(path.join(__dirname, 'public/css')));


app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(methodOverride('_method'));

app.use(sortMiddleware);

//HTTP logger
app.use(morgan('dev'));

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: 'hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'icon-sort',
                    asc: 'icon-sort-by-attributes',
                    desc: 'icon-sort-by-attributes-alt',
                }

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                
                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
                </a>`
            },
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// app.get('/middleware', 
//     function(req, res, next) {
//         if (['vethuong', 'vevip'].includes(req.query.ve)) {
//             next();
//         }
//         res.status(403).json({ message: 'access denied'});
//     },
//     function (req, res) {
//         res.json({ message: 'lmao'});
// });

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
