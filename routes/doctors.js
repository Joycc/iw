var fs = require('fs');
var db = require('./db');

var dataLine = fs.readFileSync('./user.db', 'utf-8').split('\n');
var userSession;

exports.index = function (req, res, next) {
        res.render('doctors', { title: '用户注册' });
};


exports.list = function (req, res, next) {
    doctors.list({
        direction: 'desc'
    }, function(err, users) {
        console.log(users);
        if (!err) {
            return res.send(users);
        } else {
            return console.log(err);
        }
    });

};


exports.add = function (req, res,next){
	if(db.add(dataLine, req.body.username)){
			buffer = req.body.username + ','+ req.body.position + ',' + req.body.password;
			fbuffer = buffer + '\n';
			console.log(buffer);
			fs.appendFileSync('./user.db', fbuffer, 'utf-8');
			dataLine.push(buffer);
			return res.send({ret:true,msg:'恭喜您成功注册',data:req.body});
	}
	else{
			console.log({ret:false,msg:'请修改用户昵称'});
            return res.send({ret:false,msg:'请修改用户昵称',});
    }
};


exports.login = function (req,res,next) {
    console.log(req.body);
    var result = db.loginOK(dataLine, req.body.username, req.body.password);
    if(result){
	console.log({ret:true,msg:'成功登陆',data:result});
	//req.session.key获取对应的value
	if (req.session.views){
	    userSession = req.session.views;
	}
	return res.send({ret:true,msg:'成功登陆',data:req.body.username});
    }
    else{
         console.log({ret:false,msg:'请检查用户名和密码'});
         return res.send({ret:false,msg:'请检查用户名和密码'});
        }
};

exports.logout = function (req, res){
		req.session.username = '';
		res.redirect('/');
}

/*
exports.add=function (req, res,next){
    console.log("POST: ");
    console.log(req.body);
    doctors.create(
        {username: req.body.username, email: req.body.email,password:req.body.password},
        function(err, user){
            if(user)
            {
                console.log({ret:true,msg:'恭喜您成功注册',data:user});
                return res.send({ret:true,msg:'恭喜您成功注册',data:user});
            }
            else
            {
                console.log({ret:false,msg:'请修改用户昵称',data:err});
                return res.send({ret:false,msg:'请修改用户昵称',data:err});
            }
        });
};

exports.doctor=function (req,res,next)
{
    doctors.get({id:req.params.id}
    , function(err, user) {
            if(!err)
            {
                console.log(user);
                return res.send(user);
            }
        else
            {
            return console.log(err);
            }

        });

    return;
};

exports.update=function (req, res,next){
    doctors.update({
        id:req.params.id,
        username: req.params.username,
        email: req.params.email,
        password:req.params.password
    }, function(err, user) {
        return console.log(user);
        if (!err) {
            console.log("updated");
        } else {
            console.log(err);
        }
        return res.send(user);

    });
};

exports.delete=function (req,res,next){
    doctors.remove(
        {
            id: req.params.id
        }
    , function(err, user) {
        if (!err) {
            console.log("removed");
            return res.send('');
        } else {
            console.log(err);
        }
        return console.log(user);
    });

};

exports.login=function (req,res,next)
{
    doctors.get({username:req.body.username, password:req.body.password}
        , function(err, user) {
            if(!err)
            {
                console.log(user);
                if(user)
                {
                  console.log({ret:true,msg:'成功登陆',data:user});
                  return res.send({ret:true,msg:'成功登陆',data:user});

                }
                else
                {
                    console.log({ret:false,msg:'请检查用户名和密码'});
                    return res.send({ret:false,msg:'请检查用户名和密码'});
                }
            }
        });
};

exports.usernameIsExist=function (req,res,next)
{
    doctors.get({username:req.body.username}
        , function(err, user) {
            if(!err)
            {
                console.log(user);
                if(user)
                {
                    console.log({ret:true,msg:'用户名已经存在，请修改用户名！',data:user});
                    return res.send({ret:true,msg:'用户名已经存在，请修改用户名！',data:user});

                }
                else
                {
                    console.log({ret:false,msg:'可以使用此用户名称'});
                    return res.send({ret:false,msg:'可以使用此用户名称'});
                }
            }
        });


}
*/
