const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/getUnclaimed", (req, res) => {
    const sql = `SELECT i.Item_ID, c.Category_Name, i.Item_Name, i.Item_Value, i.Item_Desc, 
                        ish.Status_FK, ish.ISH_Location, ish.ISH_Date, ish.ISH_Time, 
                        o.Officer_Badge, o.Officer_Fname, o.Officer_Lname 
                 FROM (Select h.Item_FK, h.ISH_Date, h.Status_FK, h.Officer_FK, h.ISH_Location, h.ISH_Time From Item_Status_History h, 
                 (Select Item_FK, MAX(ISH_Date) as mdate from Item_Status_History Group by Item_FK) t 
                    where t.Item_FK = h.Item_FK and t.mdate = h.ISH_Date) ish 
                 Join Item i on i.Item_ID = ish.Item_FK 
                 Left Join Officer o on o.Officer_Badge = ish.Officer_FK 
                 join Category c on i.Category_FK = c.Category_Name 
                    Where ish.Status_FK = 'Unclaimed' 
                 Order by ish.ISH_Date DESC`;
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        }
        res.send(result);
    });
});

app.get("/api/getClaimed", (req, res) => {
    const sql = `SELECT i.Item_ID, c.Category_Name, i.Item_Name, i.Item_Value, i.Item_Desc, 
                        ish.Status_FK, ish.ISH_Location, ish.ISH_Date, ish.ISH_Time, 
                        u.User_Fname, u.User_Lname, u.User_DOB, u.User_DL, u.User_Phone, u.User_Email,
                        o.Officer_Badge, o.Officer_Fname, o.Officer_Lname 
                  FROM (Select h.Item_FK, h.ISH_Date, h.Status_FK, h.User_FK, h.ISH_Location, h.ISH_Time, h.Officer_FK 
                         From Item_Status_History h, (Select Item_FK, MAX(ISH_Date) as mdate from Item_Status_History Group by Item_FK) t 
                         where t.Item_FK = h.Item_FK and t.mdate = h.ISH_date) ish 
                         Join Item i on i.Item_ID = ish.Item_FK 
                         Left Join User u on u.User_ID = ish.User_FK 
                         Left Join Officer o on o.Officer_Badge = ish.Officer_FK join Category c on i.Category_FK = c.Category_Name 
                            Where ish.Status_FK = 'Claimed' 
                         Order by ish.ISH_Date DESC`;
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        }
        res.send(result);
    });
});

app.get("/api/getLost", (req, res) => {
    const sql = `SELECT i.Item_ID, c.Category_Name, i.Item_Name, i.Item_Value, i.Item_Desc, 
                        ish.Status_FK, ish.ISH_Location, ish.ISH_Date, ish.ISH_Time, 
                        u.User_Fname, u.User_Lname, u.User_DOB, u.User_DL, u.User_Email, u.User_Phone
                  FROM (Select h.Item_FK, h.ISH_Date, h.Status_FK, h.User_FK, h.ISH_Location, h.ISH_Time 
                        From Item_Status_History h, (Select Item_FK, MAX(ISH_Date) as mdate 
                        from Item_Status_History Group by Item_FK) t where t.Item_FK = h.Item_FK and t.mdate = h.ISH_date) ish 
                  Join Item i on i.Item_ID = ish.Item_FK 
                  Left Join User u on u.User_ID = ish.User_FK join Category c on i.Category_FK = c.Category_Name Where ish.Status_FK = 'Lost' 
                  Order by ish.ISH_Date DESC`;
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        }
        res.send(result);
    });
});

app.post("/api/insertLost", (req, res) => {

    const userSql = `INSERT INTO User (User_Fname, User_Lname, User_Phone, User_Email) values (?, ?, ?, ?);`
    const itemSql = `INSERT INTO Item (Item_Name, Category_FK, Item_Value, Item_Desc) values (?, ?, ?, ?);`
    const ishSql = `INSERT INTO Item_Status_History (Item_FK, User_FK, Status_FK, ISH_Date, ISH_Time, ISH_Location) values (?, ?, 'Lost', ?, ?, ?);`

    db.query(userSql, [req.body.fName, req.body.lName, req.body.phoneNum, req.body.email], (err, uResult) => {
        const userid = uResult.insertId;
        if(err){
            console.log(err)
        }
        db.query(itemSql, [req.body.itemName, req.body.category, req.body.itemValue, req.body.desc], (err, iResult) => {
            const itemid = iResult.insertId;
            if(err){
                console.log(err)
            }
            db.query(ishSql, [itemid, userid, req.body.date, req.body.time, req.body.location], (err, result) => {
                if(err){
                    console.log(err)
                }
            });
        });
    });
});

//Turtles


app.listen(3001, () => {
    console.log("running on port 3001")
});