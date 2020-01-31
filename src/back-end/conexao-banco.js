//============================== REQUIRES ====================================//
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var md5 = require('md5');
'use strict';
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
//============================== DB CONNECTION ====================================//
const database = 'Sisgen';
mongoose.connect('mongodb://10.10.10.235/' + database, { useNewUrlParser: true });
//============================== MONGOOSE MODELS ====================================//
const Users = mongoose.model('user', new Schema({
    usuario: { type: String, required: true },
    senha: { type: String, required: true }
},
));
const Maquinas = mongoose.model('maquinas', new Schema({
    qrcode: { type: String },
    cliente: { type: String },
    tlt: { type: String },
    nomeMaq: { type: String },
    verSyneco: { type: String },
    verMongo: { type: String },
    verIntegrator: { type: String },
    ipFixo: { type: String },
    verSO: { type: String },
    arquiteturaSO: { type: String },
    obs: { type: String },
    nome_dktp_remote: { type: String },
    id_remote: { type: String },
    pass_remote: { type: String },
    isEnabled: { type: Boolean },
    resourceID: { type: Number }
}));
const Rasps = mongoose.model('rasps', new Schema({
    ipFixo: { type: String },
    macEndereco: { type: String },
    eth: { type: String },
    code: { type: String },
    resourceID: { type: Number },
    confIN1: { type: String },
    confIN2: { type: String },
    confOUT1: { type: String },
    confOUT2: { type: String },
    obs: { type: String },
    isEnabled: { type: Boolean },
    cliente: { type: String },
    versao: { type: String }
}));
module.exports = Users;
module.exports = Rasps;
module.exports = Maquinas;
//============================== SELECTS ====================================//
app.get('/users', function (req, res) {
    Users.find({}, (err, result) => res.send(result));
})
app.get('/rasps', function (req, res) {
    Rasps.find({}, (err, result) => res.send(result));
})
app.get('/maquinas', function (req, res) {
    Maquinas.find({}, (err, result) => res.send(result));
})
//===========================SELECTS FILTRADOS ==============================//
app.get('/listaClientes', function (req, res) {
    Maquinas.find().distinct('cliente', { isEnabled: true }, function (error, ids) {
        console.log('Consultando clientes únicos................')
        res.send(ids);
    });
})
app.get('/maquinasCliente', function (req, res) {
    console.log('Buscando máquinas do cliente:' + req.cliente + '................')
    Maquinas.find({}, (err, result) => res.send(result));
})
//============================== INSERTS ====================================//
app.post('/newUser', function (req, res, next) {
    const event = new Users({
        usuario : req.body.usuario,
        senha : md5(req.body.password)
    })
    event.save();
    console.log('Cadastrando usuário: ' + event.usuario);
})
app.post('/newRasp', function (req, res, next) {
    console.log(req.body.versao)
    const evento = new Rasps({
        ipFixo: req.body.ipFixo,
        macEndereco: req.body.macEndereco,
        eth: req.body.eth,
        code: req.body.code,
        confIN1: req.body.confIN1,
        confIN2: req.body.confIN2,
        confOUT1: req.body.confOUT1,
        confOUT2: req.body.confOUT2,
        resourceID: req.body.resourceID,
        obs: req.body.obs,
        cliente: req.body.cliente,
        isEnabled: true,
        versao: req.body.versao
    });
    evento.save();
    console.log('-------------- ' + req.body.usuario + ' ---> inserindo rasp: '+req.body.eth + ' --------------');
})
app.post('/newMaq', function (req, res, next) {
    console.log(req.body);
    const event = new Maquinas({
        resourceID: req.body.resourceID,
        qrcode: req.body.QrCode,
        cliente: req.body.Cliente,
        tlt: req.body.Tlt,
        nomeMaq: req.body.NomeMaq,
        verSyneco: req.body.VerSyneco,
        verMongo: req.body.VerMongo,
        verIntegrator: req.body.VerIntegrator,
        ipFixo: req.body.IpFixo,

        verSO: req.body.verSisOperacional,
        arquiteturaSO: req.body.arquitetura,
        id_remote: req.body._idAR,
        nome_dktp_remote: req.body.nomeAR,
        pass_remote: req.body.senhaAR,

        obs: req.body.Obs,
        isEnabled: req.body.isEnabled
    });
    console.log(event);
    event.save();
    console.log('-------------- ' + req.body.usuario + ' ---> inserindo máquina: '+req.body.NomeMaq + ' --------------');
})
//============================== UPDATES ====================================//
app.post('/desativarRasp', function (req, res, next) {
    const options = { multi: true }
    console.log('-------------- ' + req.body.usuario + ' ---> desativando rasp: '+ req.body.cliente + '\\' + req.body.code + '\\' +req.body.eth + ' --------------');
    var query = { eth: req.body.eth };
    function callback(err, numAffected) {
        console.log(numAffected);
    }
    Rasps.updateMany(query, { isEnabled: false }, options, callback)
})
app.post('/alterarRasp', function (req, res, next) {
    const options = { multi: true }
    var query = { _id: req.body.iddb };
    function callback(err, numAffected) {
        console.log('-------------- ' + req.body.usuario + ' ---> alterando rasp: '+ req.body.cliente + '\\' + req.body.codeEditado + '\\' +req.body.ethEditado + ' --------------');
    }
    Rasps.updateMany(query, {
        ipFixo: req.body.ipEditado,
        macEndereco: req.body.macEndereco,
        eth: req.body.ethEditado,
        code: req.body.codeEditado,
        resourceID: req.body.idEditado,
        confIN1: req.body.in1Editado,
        confIN2: req.body.in2Editado,
        confOUT1: req.body.out1Editado,
        confOUT2: req.body.out2Editado,
        obs: req.body.obsEditado,
        isEnabled: true,
        versao: req.body.versaoEditado
    }, options, callback)
    return true;
})
app.post('/desativarMaquina', function (req, res, next) {
    const options = { multi: true }
    var query = { nomeMaq: req.body.nomeMaq };
    function callback(err, numAffected) {
        console.log('-------------- ' + req.body.usuario + ' ---> desativando máquina: '+ req.body.cliente + '\\' +req.body.nomeMaq + ' --------------');
    }
    Maquinas.updateMany(query, { isEnabled: false }, options, callback)
})

app.post('/alterarMaquina', function (req, res, next) {
    const options = { multi: true }
    var query = { _id: req.body.idmaq_db };
    Maquinas.updateOne(query, {
        qrcode: req.body.qrcode,
        cliente: req.body.cliente,
        tlt: req.body.tlt,
        nomeMaq: req.body.nomemaq,
        verSyneco: req.body.versyneco,
        verMongo: req.body.vermongo,
        verIntegrator: req.body.verintegrator,
        ipFixo: req.body.ipfixo,
        verSO: req.body.verso,
        arquiteturaSO: req.body.arquiteturaso,
        nome_dktp_remote: req.body.nome_dktp_remote,
        id_remote: req.body.id_remote,
        pass_remote: req.body.pass_remote,
        obs: req.body.obs
    }, options, callback)
    function callback(err, numAffected) {
        console.log('-------------- ' + req.body.usuario + ' ---> alterando máquina: '+req.body.cliente + '\\' + req.body.nomemaq + ' --------------');
    }
})
//============================== OTHER CONFS ====================================//
app.use(express.static(__dirname + '/public')),                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev')),                                        // log every request to the console
    app.use(bodyParser.urlencoded({ 'extended': 'true' })),            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json()),                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })), // parse application/vnd.api+json as json
    app.use(methodOverride()),
    app.listen(8080),
    console.log("App listening on port 8080");