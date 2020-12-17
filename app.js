const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');




// Database and listen to port
const connectDb = require('./db.config');
connectDb();

// middleware
const { isLoggedIn, checkTokenAndSetUser, isAdmin } = require('./middlewares/');

// requiring routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const propertyRoutes = require('./routes/propertyRoutes');


app.use(cors())
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(checkTokenAndSetUser);



// using routes
app.use('/auth', authRoutes);
app.use('/dashboard', isLoggedIn, isAdmin, dashboardRoutes);
app.use('/property', isLoggedIn, isAdmin, propertyRoutes);




app.get('/', (req, res, next) => {
    res.json({
        'status': 200,
        'message': 'Hello from home route',
        'user': req.user
    });
});



// catch 404 and forward to error handler
const notFound = (req, res, next) => {
    res.status(404);
    const err = new Error(`${req.originalUrl} not found`);
    next(err);
}

// error handler
const errorHandler = (err, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        error: err.stack
    })
}

app.use(notFound);
app.use(errorHandler);




const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`server started at ${PORT}`));
