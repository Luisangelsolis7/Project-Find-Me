const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.post("/api/insertLost", (req, res) => {
    const sql = `INSERT INTO User (User_Fname, User_Lname, User_Phone, User_Email) values (?, ?, ?, ?);
                    SET @user_id = LAST_INSERT_ID();
                 INSERT INTO Item (Item_Name, Category_FK, Item_Value, Item_Desc) values (?, ?, ?, ?);
                    SET @item_id = LAST_INSERT_ID();
                 INSERT INTO Item_Status_History (Item_FK, User_FK, Status_FK, ISH_Date, ISH_Time, ISH_Location) 
                        values (@item_id, @user_id, 'Lost', ?, ?, ?);`
    db.query(sql,  [req.body.firstName, req.body.lastName, req.body.phone, req.body.email,
                    req.body.itemName, req.body.category, req.body.value, req.body.desc,
                    req.body.date, req.body.time, req.body.location], (err, result) =>{
       if(err){
           console.log(err)
       }

    });
});

app.post("/api/insertUnclaimed", (req, res) => {

    const sql = `INSERT INTO Item (Item_Name, Category_FK, Item_Value, Item_Desc) values (?, ?, ?, ?);
                    SET @item_id = LAST_INSERT_ID();
                 INSERT INTO Item_Status_History (Item_FK, Officer_FK, Status_FK, ISH_Date, ISH_Time, ISH_Location) 
                        values (@item_id, '999', 'Unclaimed', ?, ?, ?);`

        db.query(sql, [req.body.itemName, req.body.category, req.body.value, req.body.desc,
                           req.body.date, req.body.time, req.body.location], (err, iResult) => {
            if(err){
                console.log(err)
            }
        });
});

app.post("/api/insertClaimed", (req, res) => {
    const itemId = req.body.itemId;
    const sql = `INSERT INTO User (User_Fname, User_Lname, User_DOB, User_Phone, User_Email, User_DL) values (?, ?, ?, ?, ?, ?);
                    SET @user_id = LAST_INSERT_ID();
                 INSERT INTO Item_Status_History (Item_FK, User_FK, Status_FK, ISH_Date, ISH_Time, Officer_FK) 
                        values (?, @user_id, 'Claimed', ?, ?, '999');`
    db.query(sql, [req.body.firstName, req.body.lastName, req.body.dob, req.body.phone, req.body.email, req.body.driverlicense,
                   itemId, req.body.date, req.body.time], (err, result) =>{
        if(err){
            console.log(err)
        }
    })

});

app.post("/api/edit", (req, res) => {
    const sql = `UPDATE Item
                 SET Item_Name = ?, Category_FK = ?, Item_Value = ?, Item_Desc = ?
                 Where Item_ID = ?`
    db.query(sql, [req.body.itemName, req.body.category, req.body.value, req.body.desc, req.body.itemId], (err, result) => {
        if (err) {
            console.log(err);
        }
        if (req.body.category === 'Lost' || req.body.category === 'Claimed') {
            const uSql = `UPDATE User
                          SET User_Fname = ?, User_Lname = ?, User_Phone = ?, User_Email = ?
                          Where User_ID = ?`
            db.query(uSql, [req.body.firstName, req.body.lastName, req.body.phone, req.body.email, req.body.userId]), (err, result) => {
                if (err) {
                    console.log(err);
                }
            }
        }
        const ishSql = `Update Item_Status_History
                      SET ISH_Date = ?, ISH_Time = ?, ISH_Location = ?
                      WHERE Item_FK = ? and Status_FK = ?`
        db.query(ishSql, [req.body.date, req.body.time, req.body.location, req.body.itemId, req.body.status], (err, result) => {
            if (err) {
                console.log(err)
            }
        })
    })
});

app.post("/api/deleteItem", (req, res) => {
    const sql = `Delete FROM Item Where Item_ID = ?`
    db.query(sql, req.body.itemId, (err, result) =>{
        if(err){
            console.log(err)
        }
    });

});

app.post("/api/deleteUser", (req, res) => {
    const sql = `Delete FROM User Where User_ID = ?`
    db.query(sql, req.body.userId, (err, result) =>{
        if(err){
            console.log(err)
        }
    });

});

app.post("/api/deleteISH", (req, res) => {
    const sql = `Delete FROM Item_Status_History Where Item_ID = ? and Status_FK = ?'`
    db.query(sql, [req.body.itemId, req.body.status], (err, result) =>{
        if(err){
            console.log(err)
        }
    });

});


app.listen(3001, () => {
    console.log("running on port 3001")
});