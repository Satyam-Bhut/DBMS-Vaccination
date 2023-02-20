const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// so that multiple file can run in different port like server on 5000 and client is on 4000
app.use(cors());
app.use(express.json());
//json allows to request json data so that we can use request.body


//create inventory
app.post("/inventory",async(req,res)=>{
    try {
        const set_path = await pool.query("SET search_path to proj");
        const {inventory_id,inventory_name,inventory_city,inventory_vaccinetypes,inventory_stock} = req.body;
        const inventory = await pool.query("INSERT INTO inventory (inventory_id,inventory_name,inventory_city,inventory_vaccinetypes,inventory_stock) VALUES ($1,$2,$3,$4,$5) RETURNING *",[inventory_id,inventory_name,inventory_city,inventory_vaccinetypes,inventory_stock]);
        res.json(inventory.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//show data
app.get("/inventory", async(req,res)=>{
    try {
        //because it already returns hence returning statement no there
        const set_path = await pool.query("SET search_path to proj");
        const getInv = await pool.query("select * from inventory");
        res.json(getInv.rows);
    } catch (err) {
        console.error(err);
    }
});

//delete data
app.delete("/inventory/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const set_path = await pool.query("SET search_path to proj");
        const getInv = await pool.query("select * from inventory");
        const deletItem = await pool.query("delete from inventory where inventory_id = $1",[id]);
        res.json(getInv);
    } catch (err) {
        console.error(err);
    }
});

//create user
app.post("/user",async(req,res)=>{
    try {
        const set_path = await pool.query("SET search_path to proj");
        const {user_id,user_centerid,user_slotid,user_name,user_gender,user_age,user_address,user_city,user_vaccine,user_isvaccinated} = req.body;
        const user = await pool.query("INSERT INTO users (user_id,user_centerid,user_slotid,user_name,user_gender,user_age,user_address,user_city,user_vaccine,user_isvaccinated) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",[user_id,user_centerid,user_slotid,user_name,user_gender,user_age,user_address,user_city,user_vaccine,user_isvaccinated]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//show user
app.get("/user", async(req,res)=>{
    try {
        //because it already returns hence returning statement no there
        const set_path = await pool.query("SET search_path to proj");
        const getInv = await pool.query("select * from users");
        res.json(getInv.rows);
    } catch (err) {
        console.error(err);
    }
});

//delete user
app.delete("/user/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const set_path = await pool.query("SET search_path to proj");
        const getInv = await pool.query("select * from users");
        const deletItem = await pool.query("delete from users where user_id = $1",[id]);
        res.json(getInv);
    } catch (err) {
        console.error(err);
    }
});

//create administrator
app.post("/admin",async(req,res)=>{
    try {
        const set_path = await pool.query("SET search_path to proj");
        const {admin_id,admin_name,admin_gender,admin_city} = req.body;
        const data = await pool.query("INSERT INTO administrator (admin_id,admin_name,admin_gender,admin_city) VALUES ($1,$2,$3,$4) RETURNING *",[admin_id,admin_name,admin_gender,admin_city]);
        res.json(data.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//show administrator
app.get("/admin", async(req,res)=>{
    try {
        //because it already returns hence returning statement no there
        const set_path = await pool.query("SET search_path to proj");
        const getInv = await pool.query("select * from administrator");
        res.json(getInv.rows);
    } catch (err) {
        console.error(err);
    }
});

//delete administrator
app.delete("/admin/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const set_path = await pool.query("SET search_path to proj");
        const getInv = await pool.query("select * from administrator");
        const deletItem = await pool.query("delete from administrator where admin_id = $1",[id]);
        res.json(getInv);
    } catch (err) {
        console.error(err);
    }
});

app.listen(5000,()=>{
    console.log("Server Started");
});