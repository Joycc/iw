var devices = ['phone','light'];

exports.index = function (req, res, next) {
    res.render('control', { title: '设备视图' });
};

exports.list = function (req, res, next) {
    return res.send(devices);
};

