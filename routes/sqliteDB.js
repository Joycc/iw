var sqlite3 = require('sqlite3').verbose();
var Promise = require('promise');

var CREATESQL = "CREATE TABLE IF NOT EXISTS" +
	    " users(" +
	    "username NVARCHAR(50) PRIMARY KEY NOT NULL," +
	    "position NVARCHAR(50)," +
	    "password VARCHAR(50) NOT NULL)";

var INSERTLINE = "INSERT INTO users(username,position,password) VALUES ";
	    //+ "VALUES ('%s','%s','%s')";
var SELECTNAME = "SELECT * FROM users";

var db = new sqlite3.Database('./.user.sqlite3', 
	sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

var datas;

exports.create = function(){
    db.run(CREATESQL, function(err){
		if(err){
		    console.log(err);
		} else {
		    console.log(this);
		}
	    }
	);

};

exports.insertLine = function(name, position, password){
    sqlStr = INSERTLINE + "('"+name+"','"+position+"','"+password+"')";
    db.run(sqlStr, function(err){
		if(err){
		    console.log(err);
		} else {
		    console.log(this);
		}
	    }
	);
};

exports.getData = function(){
    var data;
    db.all(SELECTNAME, function(err, res){
		if(err){
		    console.log(err);
		    resolve(null);
		} else {
		    data = JSON.stringify(res);
		    console.log(datas);
		    console.log(this);
		    resolve(null);
		}
	    }
	);
};

exports.closeDB = function(){
    db.close();
}
var baseDatas = Promise.denodeify(this.getData());
