const db=require('../models/itineraries');
const jwt=require('jsonwebtoken');

const createToken=(student)=>{
    let email=student[0].email;
    let username=student[0].username;
    let role=student[0].role;
    return jwt.sign({email,username,role},'Harsha secret key',{
        expiresIn:3*24*60*60 
    });
}
exports.getAllItineraries=(req,res)=>{
    db.getAllItineraries((err,callback)=>{
        if(err)
        {
            console.log('Error retriving Itineraries'+err);
            res.status(500).send("Error while retriveing ALL data");
                return;
        }
        res.send(callback);
    });
};

exports.getIdItineraries=(req,res)=>{
  const id=req.params.id;
    db.getIdItineraries(id,(err,callback)=>{
            if(err){
                console.log('Error retriving Itineraries with given id '+err);
                res.status(500).send(`Error while retriveing ${id} data`);
                return;
            }
            res.send(callback);
    });
}
exports.createItineraries = (req, res) => {
    const student = req.body;
    if (student.length==0){
        res.status(500).send('Error creating Itineraries');
return;
    }
    console.log("Received data:", student);
    
    db.createItineraries(student, (err) => {
      if (err) {
        console.error('Error creating Itineraries', err);
        res.status(500).send('Error creating Itineraries');
        return;
      }
      res.status(201).send('Itineraries created successfully');
    });
  };
  
  exports.putIdItineraries=(req,res)=>{
    const id=req.params.id;
    const body=req.body;
    console.log(body.length);
    if (body.length==0){
        res.status(500).send('Error creating Itineraries');
return;
    }
    db.updateItineraries(id,body,(err,callback)=>{
        if(err)
        {
            console.log('Error while updataing data'+err);
            res.status(500).send(`Error while updataing data`);
            return;
        }
        res.send(`User id ${id} updataed successfully`);
    })
}
exports.deleteIdItineraries=(req,res)=>{
    const id=req.params.id;
    db.deleteItineraries(id,(err,callback)=>{
        if(err){
            console.log('Error while deleting data'+err)
            res.status(500).send(`Cannot find the userID for deletion`);
            return;
        }
        res.send(`User id ${id} deleted successfully`)
    })
}
        
exports.deleteuser=(req,res)=>{
  const id=req.params.id;
  db.deleteuser(id,(err,callback)=>{
      if(err){
          console.log('Error while deleting data'+err)
          res.status(500).json({error:`Cannot find the userID for deletion`});
          return;
      }
      res.send(`User id ${id} deleted successfully`)
  })
}

exports.signup = (req, res) => {
    const student = req.body;
    if (student.length==0){
        res.status(500).send('Error creating Itineraries');
return;
    }
    console.log("Received data:", student);
    
    db.signup(student, (err) => {
      if (err) {
        console.error('Error signup', err);
        res.status(500).send('Error :EXISTING EMAIL OR WRONG CREDENTIALS');
        return;
      }
    //   const token=createToken(student);
    //   res.cookie('jwt',token,{httpOnly:true,maxAge:1000*3*24*60*60 });

      res.status(201).json("Sign Up Successfull");
    });
  };
  
  exports.login=(req,res)=>{
    const student = req.body;
    if (student.length==0){
        res.status(500).send('Error creating Itineraries');
return;
    }
    console.log("Received data:", student);
    
    db.login(student, (err,callback) => {
      if (err) {
        console.error('Error login', err);
        res.status(500).json('Incorrect Email or Password');
        return;
      }
        // console.log(callback);
      if(callback.length>0){
        const token=createToken(callback);
      res.cookie('loginjwt',token,{httpOnly:true,maxAge:1000*3*24*60*60});
      res.status(200).json({email:student.email});
    return;  
    }
      res.status(400).json("EMAIL OR PASSWORD WRONG");
 
    });
};
exports.logout_get=(req,res)=>{
res.cookie('loginjwt','',{maxAge:1});

res.redirect('/login');
}

exports.updatestateaccept = (req, res) => {
  const student = req.body;
  if (student.length==0){
      res.status(500).json('Error update state accepted');
return;
  }
  console.log("Received data:", student);
  
  db.updatestateaccept(student, (err) => {
    if (err) {
      console.error('Error updating state accepted', err);
      res.status(500).json('Error update state accepted');
      return;
    }
    res.status(201).json('Item updated  csuccessfully');
  });
};


exports.getAllUsers=(req,res)=>{
  db.getAllUsers((err,callback)=>{
      if(err)
      {
          console.log('Error retriving Itineraries'+err);
          res.status(500).json("Error while retriveing ALL data");
              return;
      }
      res.send(callback);
  });
};



exports.updateuser=(req,res)=>{
  const id=req.params.id;
  const body=req.body;
  console.log(body.length);
  if (body.length==0){
      res.status(500).send('Error updating user');
return;
  }
  db.updateuser(id,body,(err,callback)=>{
      if(err)
      {
          console.log('Error while updataing data'+err);
          res.status(500).json({error:`Error while updataing data`});
          return;
      }
      res.send(`User id ${id} updataed successfully`);
  })
}
