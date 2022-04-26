require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const credentials = require('./credentials');
const corsOptions = require('./config/corsOptions')


app.use(credentials);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get("/api/getLost", authenticateToken, (req, res) => {
    const sql = `SELECT i.Item_ID, c.Category_Name, i.Item_Name, i.Item_Value, i.Item_Desc, 
                        ish.Status_FK, ish.ISH_Location, ish.ISH_Date, ish.ISH_Time, ish.User_FK,
                        u.User_Fname, u.User_Lname, u.User_DOB, u.User_DL, u.User_Phone, u.User_Email, u.User_AUID,
                        o.Officer_Badge, o.Officer_Fname, o.Officer_Lname 
                  FROM (Select h.Item_FK, h.ISH_Date, h.Status_FK, h.User_FK, h.ISH_Location, h.ISH_Time, h.Officer_FK 
                         From Item_Status_History h, (Select Item_FK, MAX(ISH_Date) as mdate, MAX(ISH_Time) as mtime from Item_Status_History Group by Item_FK) t 
                         where t.Item_FK = h.Item_FK and t.mdate = h.ISH_date and t.mtime = h.ISH_Time) ish 
                         Join Item i on i.Item_ID = ish.Item_FK 
                         Left Join User u on u.User_ID = ish.User_FK 
                         Left Join Officer o on o.Officer_Badge = ish.Officer_FK join Category c on i.Category_FK = c.Category_Name 
                            Where ish.Status_FK = 'Lost' 
                         Order by ish.ISH_Date DESC, ish.ISH_Time DESC`;
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        }
        res.send(result);
    });
});

app.get("/api/getUnclaimed", authenticateToken, (req, res) => {
    const sql = `SELECT i.Item_ID, c.Category_Name, i.Item_Name, i.Item_Value, i.Item_Desc, 
                        ish.Status_FK, ish.ISH_Location, ish.ISH_Date, ish.ISH_Time, ish.User_FK,
                        u.User_Fname, u.User_Lname, u.User_DOB, u.User_DL, u.User_Phone, u.User_Email, u.User_AUID,
                        o.Officer_Badge, o.Officer_Fname, o.Officer_Lname 
                  FROM (Select h.Item_FK, h.ISH_Date, h.Status_FK, h.User_FK, h.ISH_Location, h.ISH_Time, h.Officer_FK 
                         From Item_Status_History h, (Select Item_FK, MAX(ISH_Date) as mdate, MAX(ISH_Time) as mtime from Item_Status_History Group by Item_FK) t 
                         where t.Item_FK = h.Item_FK and t.mdate = h.ISH_date and t.mtime = h.ISH_Time) ish 
                         Join Item i on i.Item_ID = ish.Item_FK 
                         Left Join User u on u.User_ID = ish.User_FK 
                         Left Join Officer o on o.Officer_Badge = ish.Officer_FK join Category c on i.Category_FK = c.Category_Name 
                            Where ish.Status_FK = 'Unclaimed' 
                         Order by ish.ISH_Date DESC, ish.ISH_Time DESC`;
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        }
        res.send(result);
    });
});

app.get("/api/getClaimed", authenticateToken, (req, res) => {
    const sql = `SELECT i.Item_ID, c.Category_Name, i.Item_Name, i.Item_Value, i.Item_Desc, 
                        ish.Status_FK, ish.ISH_Location, ish.ISH_Date, ish.ISH_Time, ish.User_FK,
                        u.User_Fname, u.User_Lname, u.User_DOB, u.User_DL, u.User_Phone, u.User_Email, u.User_AUID,
                        o.Officer_Badge, o.Officer_Fname, o.Officer_Lname 
                  FROM (Select h.Item_FK, h.ISH_Date, h.Status_FK, h.User_FK, h.ISH_Location, h.ISH_Time, h.Officer_FK 
                         From Item_Status_History h, (Select Item_FK, MAX(ISH_Date) as mdate, MAX(ISH_Time) as mtime from Item_Status_History Group by Item_FK) t 
                         where t.Item_FK = h.Item_FK and t.mdate = h.ISH_date and t.mtime = h.ISH_Time) ish 
                         Join Item i on i.Item_ID = ish.Item_FK 
                         Left Join User u on u.User_ID = ish.User_FK 
                         Left Join Officer o on o.Officer_Badge = ish.Officer_FK join Category c on i.Category_FK = c.Category_Name 
                            Where ish.Status_FK = 'Claimed' 
                         Order by ish.ISH_Date DESC, ish.ISH_Time DESC`;
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        }
        res.send(result);
    });
});

app.get("/api/getDonated", authenticateToken, (req, res) => {
    const sql = `SELECT i.Item_ID, c.Category_Name, i.Item_Name, i.Item_Value, i.Item_Desc, 
                        ish.Status_FK, ish.ISH_Date, ish.ISH_Time,
                        o.Officer_Badge
                  FROM (Select h.Item_FK, h.ISH_Date, h.Status_FK, h.User_FK, h.ISH_Location, h.ISH_Time, h.Officer_FK 
                         From Item_Status_History h, (Select Item_FK, MAX(ISH_Date) as mdate, MAX(ISH_Time) as mtime from Item_Status_History Group by Item_FK) t 
                         where t.Item_FK = h.Item_FK and t.mdate = h.ISH_date and t.mtime = h.ISH_Time) ish 
                         Join Item i on i.Item_ID = ish.Item_FK 
                         Left Join Officer o on o.Officer_Badge = ish.Officer_FK join Category c on i.Category_FK = c.Category_Name 
                            Where ish.Status_FK = 'Donated' 
                         Order by ish.ISH_Date DESC, ish.ISH_Time DESC`;
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        }
        res.send(result);
    });
});

app.get("/api/getDestroyed", authenticateToken, (req, res) => {
    const sql = `SELECT i.Item_ID, c.Category_Name, i.Item_Name, i.Item_Value, i.Item_Desc, 
                        ish.Status_FK, ish.ISH_Date, ish.ISH_Time,
                        o.Officer_Badge
                  FROM (Select h.Item_FK, h.ISH_Date, h.Status_FK, h.User_FK, h.ISH_Location, h.ISH_Time, h.Officer_FK 
                         From Item_Status_History h, (Select Item_FK, MAX(ISH_Date) as mdate, MAX(ISH_Time) as mtime from Item_Status_History Group by Item_FK) t 
                         where t.Item_FK = h.Item_FK and t.mdate = h.ISH_date and t.mtime = h.ISH_Time) ish 
                         Join Item i on i.Item_ID = ish.Item_FK 
                         Left Join Officer o on o.Officer_Badge = ish.Officer_FK join Category c on i.Category_FK = c.Category_Name 
                            Where ish.Status_FK = 'Destroyed' 
                         Order by ish.ISH_Date DESC, ish.ISH_Time DESC`;
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        }
        res.send(result);
    });
});

app.post("/api/insertLost", (req, res) => {
    const sql = `INSERT INTO User (User_Fname, User_Lname, User_Phone, User_Email, User_DL, User_AUID) values (?, ?, ?, ?, ?, ?);
                    SET @user_id = LAST_INSERT_ID();
                 INSERT INTO Item (Item_Name, Category_FK, Item_Value, Item_Desc) values (?, ?, ?, ?);
                    SET @item_id = LAST_INSERT_ID();
                 INSERT INTO Item_Status_History (Item_FK, User_FK, Status_FK, ISH_Date, ISH_Time, ISH_Location) 
                        values (@item_id, @user_id, 'Lost', ?, ?, ?);`
    db.query(sql,  [req.body.firstName, req.body.lastName, req.body.phone, req.body.email, req.body.ID, req.body.AUID,
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
    const idArr = req.body.itemId;
    const sql = `INSERT INTO User (User_Fname, User_Lname, User_DOB, User_Phone, User_Email, User_AUID, User_DL, User_DLState) values (?, ?, ?, ?, ?, ?, ?, ?);
                    SET @user_id = LAST_INSERT_ID();
                 INSERT INTO Item_Status_History (Item_FK, User_FK, Status_FK, ISH_Date, ISH_Time, Officer_FK) 
                        values (?, @user_id, 'Claimed', ?, ?, '999');`
    idArr.forEach(item => {
        db.query(sql, [req.body.firstName, req.body.lastName, req.body.dob, req.body.phone, req.body.email, req.body.AUID, req.body.driverlicense, req.body.dlState,
            item, req.body.date, req.body.time], (err, result) => {
            if (err) {
                console.log(err)
            }
        })
    })

});

app.post("/api/insertDonated", (req, res) => {
    const idArr = req.body.itemId;
    const sql = `INSERT INTO Charity (Charity_Name, Charity_Address, Charity_City, Charity_State, Charity_Zip, Charity_Contact, Charity_Phone) values (?, ?, ?, ?, ?, ?, ?);
                    SET @charity_id = LAST_INSERT_ID();
                 INSERT INTO Item_Status_History (Item_FK, User_FK, Status_FK, ISH_Date, ISH_Time, Officer_FK) 
                        values (?, @charity_id, 'Donated', ?, ?, '999');`
    idArr.forEach(item => {
        db.query(sql, [req.body.name, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.contact, req.body.phone,
            item, req.body.date, req.body.time], (err, result) => {
            if (err) {
                console.log(err)
            }
        })
    })

});

app.post("/api/insertDestroyed", (req, res) => {
    const idArr = req.body.itemId;
    const sql = `INSERT INTO Item_Status_History (Item_FK, Status_FK, ISH_Date, ISH_Time, Officer_FK) 
                        values (?, 'Destroyed', ?, ?, '999');`
    idArr.forEach(item => {
        db.query(sql, [item, req.body.date, req.body.time], (err, result) => {
            if (err) {
                console.log(err)
            }
        })
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
        if (req.body.status === 'Lost' || req.body.status === 'Claimed') {
            const uSql = `UPDATE User
                          SET User_Fname = ?, User_Lname = ?, User_Phone = ?, User_Email = ?, User_DOB = ?, User_DL = ?
                          Where User_ID = ?`
            db.query(uSql, [req.body.firstName, req.body.lastName, req.body.phone, req.body.email, req.body.dob, req.body.dl, req.body.userId]), (err, result) => {
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

app.post("/api/delete", (req, res) => {
    const sql = `Delete FROM Item_Status_History Where Item_FK = ? and Status_FK = ?`
    db.query(sql, [req.body.itemId, req.body.status], (err, result) =>{
        if(err){
            console.log(err)
        }
    });

});

app.post("/api/register",[check('email').isEmail().normalizeEmail(), check('password').isLength({min : 8})], async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors);
            return res.status(422).json({errors : errors.array()})
        }
        const {email, password, badge} = req.body;
        const hash = await bcrypt.hash(password, 10);
        const sql =`Insert into Officer (Officer_Email, Hash, Officer_Badge) values (?, ?, ?);`
        await db.query(sql, [email, hash, badge], (err, result) => {
            if(err){
                console.log(err)
            }
        });
        res.status(200).json('All good');
    }catch (e){
        console.log(e);
        res.status(500).send('Error!')
    }
});

app.post("/api/login", async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send('No Email or Password');
    try{
        let sql="SELECT * from Officer where Officer_Email= ? Limit 1";
        await db.query(sql, email, (err, result) => {
            if(err){
                console.log(err)
            }
            if(result.length != 0) {
                let passwordHash = result[0]["Hash"];
                const verified = bcrypt.compareSync(password, passwordHash);
                if (verified) {
                    const user = {email: email, badge:result[0]["Officer_Badge"]};
                    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'});
                    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});
                    res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'none', secure: true, maxAge: 24*60*60*1000});
                    res.status(200).json({badge:result[0]["Officer_Badge"], accessToken: accessToken});

                }
                else{
                     res.status(401).send("Invalid Login");
                }

            }else{
                 res.status(401).send("Invalid Login");
            }
        });
    }catch{
        return res.status(500).send();
    }
});

app.get("/api/refresh", (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt){
        res.status(401).send();
    }
    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.status(403);
            const accessToken = jwt.sign({"email":decoded.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'});
            res.json({accessToken: accessToken});
        }
    )

});

app.get("/api/clear", async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt){
        res.status(204).send();
    }
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: true, maxAge: 24*60*60*1000});
    res.status(204).send();
    //const refreshToken = cookies.jwt;

});




function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!authHeader) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user.email;
        next();
    })

}





app.listen(3001, () => {
    console.log("Running on port 3001")
});