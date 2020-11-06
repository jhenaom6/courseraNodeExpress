var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport.js');
const session = require('express-session');
const Usuario = require('./models/usuario');
const Token = require('./models/token');


//Actualizar Modulos de rutas a usar
var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuario');
var bicicletaRouter = require('./routes/bicicleta');
var bicicletaAPIRouter = require('./routes/api/bicicleta');
var usuarioAPIRouter = require('./routes/api/usuario');
var tokenRouter = require('./routes/token');

//Guardar sessiones ->
const store = new session.MemoryStore;

var app = express();
app.use(session({
  cookie: { maxge: 240 * 60 * 60 * 100},
  store: store,
  saveUninitialized: true,
  resave: true,
  secret: 'redBicicletas-.,-.!!!'
}));

//Configuro MongoDB
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/red_bicicletas';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error al conectar la base de datos'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize()); //Configuracion passport
app.use(passport.session()); //Configuracion session
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', function(req, res, next){
  res.render('session/login');
});

app.post('/login', function(req, res, next){
  passport.authenticate('local', function(error, usuario, info){
    if(error) return next(error);
    if(!usuario) return res.render('session/login', {info});
    req.logIn(usuario, function(error){
      if(error) return next(error);
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', function(req, res, next){
  req.logOut();
  res.redirect('/');
});

app.get('/forgotPassword', function(req, res, next){
  res.render('session/forgotPassword');  
});

app.post('/forgotPassword', function(req, res, next){
  Usuario.findOne({email: req.body.email}, function(error, usuario){
    if(!usuario){
      return res.render('session/forgotPassword', {info: {message: 'No existe una cuenta con este email'}});
    }

    usuario.resetPassword(function(error){
      if(error) return next(error);
    }); 
    res.render('session/forgotPasswordMessage');
  });
});

app.get('/token/resetPassword/:token', function(req, res, next){
  Token.findOne({token: req.params.token}, function(error, token){
    if(!token){
        return res.status(400).send({type: 'not-verificated', msg: 'No encontramos un usuario asociado al token. Verifique que este no haya expirado.'});
    }

    Usuario.findById(token._userId, function(error, usuario){
        if(!usuario) return res.status(400).send({msg: 'No encontramos un usuario con este token'});
        res.render('session/resetPassword', {errors: {}, usuario: usuario});
    });
  });
});

app.post('/resetPassword', function(req, res, next){
  if(req.body.password != req.body.confpassword){
    return res.render('session/resetPassword', {errors: {password: {message: 'Las contraseñas no coinciden'}, confpassword: {message: 'Las contraseñas no coinciden'}}, usuario: new Usuario({email: req.body.email})});
  }

  Usuario.findOne({email: req.body.email}, function(error, usuario){
    usuario.password = req.body.password;
    usuario.save(function(error){
      if(error){ 
        res.render('session/resetPassword', {errors: error.erros, usuario: new Usuario({email: usuario.email})});
      }else{
        res.redirect('/login');
      }
    });
  });
});


function loggedIn(req, res, next){
  if(req.user){
    next();
  }else{
    console.log('user sin loguearse');
    res.redirect('/login');
  }
};

//Actualizar segun rutas creadas
app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/bicicletas', loggedIn, bicicletaRouter);
app.use('/api/bicicletas', bicicletaAPIRouter);
app.use('/api/usuarios', usuarioAPIRouter);
app.use('/token', tokenRouter);

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
