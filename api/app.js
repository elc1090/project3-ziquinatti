require('dotenv').config({path: __dirname + '/.env'});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var axios = require('axios');

//STEAM CONFIG
var passport = require('passport');
var session = require('express-session');
var passportSteam = require('passport-steam');
var SteamStrategy = passportSteam.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new SteamStrategy({
  returnURL: 'https://my-steam-api.herokuapp.com/api/auth/steam/return',
  realm: 'https://my-steam-api.herokuapp.com/',
  apiKey: process.env.API_STEAM_KEY
  }, function (identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));
//END STEAM CONFIG

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var testAPIRouter = require('./routes/testAPI');
var listsRouter = require('./routes/lists.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//STEAM SESSION
app.use(session({
  secret: 'MySuperSecret',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 3600000
  }
}))
app.use(passport.initialize());
app.use(passport.session());

var session;
//END STEAM SESSION

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/lists', listsRouter);

// Routes STEAM
app.get('/api', (req, res) => {
  res.send(req.user);
});

app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/api'}), function (req, res) {
  res.redirect('/api');
});

app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/api'}), async function (req, res) {
  session = req.session;

  const steamid = session.passport.user.id;
  
  let URL = `${req.protocol}://${req.get('host')}/lists/${steamid}`;
  let exist = true;
  await axios.get(URL)
    .then(response => {
      if(response.data === 'Não Achei'){
        exist = false;
      }
    }).catch(error => console.log(error))
  
  if(!exist){
    URL = `${req.protocol}://${req.get('host')}/lists/`;
    let toPlay = [];
    await axios.post(URL, {
      steamid, toPlay
    }).then(resp => {
      // console.log(resp);
    })
  }
  // console.log('FIM DA REQUEST');

  res.redirect('https://my-steam.netlify.app/profile');
});

app.get('/api/user', (req, res) => {
  // console.log(session.passport.user);
  if(session.passport) {
    // console.log('Session found');
    res.json(session.passport.user);
  } else {
    // console.log('Not session')
    res.json({ message: 'Not session!' });
  }
});

app.get('/api/logout', (req, res) => {
  session.passport = null;
  req.session.destroy();
  res.redirect('https://my-steam.netlify.app/');
})

app.get('/games', (req, res) => {
  const key = process.env.API_STEAM_KEY;

  if(!session.passport)
    res.json({ message: 'Não está logado' });
  else{
    const steamid = session.passport.user.id;
    const include_appinfo = true;

    const URL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${key}&steamid=${steamid}&include_appinfo=${include_appinfo}&format=json`;

    axios.get(URL)
      .then(response => {
        // console.log(response.data);
        res.send(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }
});

app.get('/game/:appId', (req, res) => {
  const appid = req.params.appId;

  const URL = `https://store.steampowered.com/api/appdetails?appids=${appid}&l=portuguese`;

  axios.get(URL)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    })
})

app.get('/news', (req, res) => {
  let game = req.query.game;

  if(game !== 'null'){
    // console.log(game);
    let URL = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${game}&count=3&format=json`;

    axios.get(URL)
      .then(response => {
        // console.log(response.data.appnews);
        res.json(response.data.appnews);
      })
      .catch(error => {
        console.log(error);
      })
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
