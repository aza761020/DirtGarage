const express = require('express');
const router = express.Router();
const mysql = require('mysql2')

const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'9092191191',
    database:'aza'
});

db.connect((err)=>{
    if(err){
        console.error('Database connection failed: '+err);
        return;
    }
    console.log('Database Succesfully Connected...');
});

router.post('/add',(req,res)=>{
    const {model ,brand, year, insurance, fc ,price }= req.body;
    const sql ='INSERT INTO vehicles (model, brand, year, insurance, fc, price) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql,[model ,brand, year, insurance, fc ,price],(err,result)=>{
        if(err){
            return res.status(500).json({error:err})
        }
        res.status(201).json({message:'vehicle added',id:result.insertId});
    })
})

router.get('/get',(req,res)=>{
    const sql='SELECT * FROM vehicles';
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({error:err});
        }
        return res.json(result);
    })
})

router.put('/update',(req,res)=>{
    const {id}= req.query;
    const {model ,brand, year, insurance, fc ,price} = req.body;
    const sql = 'UPDATE vehicles SET model = ?, brand = ?, year = ?, insurance = ?, fc = ?, price = ? WHERE id = ?';
    db.query(sql,[model ,brand, year, insurance, fc ,price,id],(err,result)=>{
        if(err){
            return res.status(500).json({error: err})
        }
        if(result.affectedRows === 0){
            return res.status(404).json({message:'Veicle not found'});
        }
        res.json({message: 'Updated'});
    });
});

router.delete('/delete',(req,res)=>{
    const {id}= req.query;
    const sql='DELETE FROM vehicles WHERE id = ?';
    db.query(sql,[id],(err,result)=>{
        if(err){
            return res.status(500).json({error: err});
        }
        if(result.affectedRows === 0){
            return res.status(404).json({message: ' vechile not found'})
        }
        res.json({message: 'Deleted'})
    })
})


module.exports =router;