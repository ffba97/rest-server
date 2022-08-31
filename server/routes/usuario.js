const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const usuario = require('../models/usuario');
const { json } = require('body-parser');
const app = express();

app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 0;

    Usuario.find({estado:true})
        .skip(desde)
        .limit(hasta)
        .exec((err, usuarios) => {
            if (err) {
                return res.json({
                    ok: false,
                    err
                });
            }
            Usuario.count({estado:true} ,(err, contador)=>{
                if(err) {
                    return res.json({
                        ok:false,
                        err
                    })
                }
                res.status(400).json({
                    contador,
                    usuarios}
                    );
            })
        })

});

app.post('/usuario', function (req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = req.body;

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;
    Usuario.findByIdAndUpdate(id, {estado:false}, {new:true}, (err, usuarioDB)=>{
        if(err){
            return res.json({
                ok:false,
                err
            });
        }
        
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    
    })
})


module.exports = app;