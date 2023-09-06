const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Server
app.listen(3001, () => {
  console.log('Your server run at port 3001');
});
// connection
const db = mysql.createPool({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'mir-derikvand',
});
/////////////////////////////////////////////////// COURSE API //////////////////////////////////////////////////////////

//Get Member Data
app.get('/getMembers', (req, res) => {
  db.query('SELECT * FROM tbl_aza', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Update Member
app.put('/updateMember', (req, res) => {
  const id = req.body.id;
  const fullName = req.body.fullName;
  const fatherName = req.body.fatherName;
  const phone = req.body.phone;
  const work = req.body.work;
  const semat = req.body.semat;
  const mantagheh = req.body.mantagheh;

  const sqlUpdate =
    'UPDATE tbl_aza SET fullName = ?,  fatherName= ?, phone= ?, work= ?, semat= ?, mantagheh=  ? WHERE id = ?';
  db.query(
    sqlUpdate,
    [fullName, fatherName, phone, work, semat, mantagheh, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Update Member Successfuul');
      }
    }
  );
});

// add new Member
app.post('/InsertNewMember', (req, res) => {
  const fullName = req.body.fullName;
  const fatherName = req.body.fatherName;
  const phone = req.body.phone;
  const work = req.body.work;
  const semat = req.body.semat;
  const mantagheh = req.body.mantagheh;

  db.query(
    'INSERT INTO tbl_aza (fullName, fatherName, phone, work, semat, mantagheh) VALUES (?,?,?,?,?,?)',
    [fullName, fatherName, phone, work, semat, mantagheh],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send('New Member added successfull');
      }
    }
  );
});

//Delete Member
app.delete('/deleteMember/:id', (req, res) => {
  const id = req.params.id;
  const sqlDelete = 'DELETE FROM tbl_aza WHERE id = ?';
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('Delete Member Successfuul');
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
