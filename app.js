var express = require('express')
  , controllers = require('./controllers')
  , lessMiddleware = require('less-middleware');
  
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set(lessMiddleware({
    src: __dirname + '/public/css',
    compress: true 
  }));
  app.set(express.favicon(__dirname + 'favicon.ico'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname));
});

app.get('/', controllers.index);
app.use(controllers.index);

app.listen(process.env.PORT || 3000, '0.0.0.0', function(){
  console.log("Express server listening on port %d", app.get('port'));
});