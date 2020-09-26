const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const volleyball = require('volleyball');


// Database and listen to port
const connectDb = require('./db.config');
connectDb();

// middleware
const { isLoggedIn } = require('./middlewares/middleware');

// requiring routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');


app.use(cors())
app.use(volleyball);
app.use(cookieParser());
app.use(express.json());



// using routes
app.use('/auth', authRoutes);
app.use('/dashboard', isLoggedIn, dashboardRoutes);




app.get('/', (req, res, next) => {
    res.json({
        'status': 200,
        'message': 'Hello from home route'
    });
});




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function (err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err.stack : {}
    })
});



const PORT = 3000 || process.env.DBURL;
app.listen(PORT, () => console.log(`server started at ${PORT}`));
