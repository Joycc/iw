exports.all = function (data){
		var userNames = new Array();
		for (var l=0;l<data.length;l++){
				if (data[l]){
						user = data[l].split(',');
						userNames.push(user[0]);
				}
		}
		return userNames;
};

exports.loginOK = function (data, username, password){
		for (var l=0;l<data.length;l++){
				if (data[l]){
						user = data[l].split(',');
						console.log(user);
						if(username == user[0]){
								if(password == user[2]){
										return true;
								}
								return false;
						}

				}
		}
		return false;
};

exports.add = function (data, username){
		var userNames = new Array();
		for (var l=0;l<data.length;l++){
				if (data[l]){
						user = data[l].split(',');
						if (username == user[0]){
								return false;
						}
				}
		}
		return true;
};
