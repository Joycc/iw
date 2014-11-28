
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
var tcpClient = require('./tcpclient');

app.configure(function(){
  app.set('port', process.env.PORT || 8700);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('cookiesnoopysecret'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//app.get('/', routes.doctor);

var tags = require('./routes/tags');
var control = require('./routes/control');
var urlrouter = require('urlrouter');
var doctors = require('./routes/doctors');
var router = urlrouter(function (app) {

//整体URL流程处理
app.get('/', doctors.index);

//用户数据处理部分 Restful 处理

//app.get('/doctors',doctors.list );//用户列表
//app.get('/doctors/:id',doctors.doctor);//用户id查询

app.post('/doctors',doctors.add );//用户注册
//app.put('/doctors/:username',doctors.update); //用户更新
//app.delete('/doctors/:username',doctors.delete);//用户删除

app.post('/doctors/login',doctors.login);//用户登录
//app.post('/doctors/isexist',doctors.usernameIsExist); //判断用户用户名是否已经注册

app.get('/tags',tags.index);

app.get('/control',control.index);
app.get('/control/ctrl',control.list);//设备列表

});

app.use(router);

app.get('/lighton', function(req, res){
		console.log('req light on');
		tcpClient.writeCtrl('open');
		res.send('ok');
});

app.get('/lightoff', function(req, res){
		console.log('req light off');
		tcpClient.writeCtrl('close');
		res.send('ok');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

console.log('111');
