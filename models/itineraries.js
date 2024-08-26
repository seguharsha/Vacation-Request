const config=require('../config/config');
const mysql=require('mysql2');
let db=mysql.createConnection({
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.database
})
db.connect((err)=>{
    if(err){
        console.log('Error connecting to the databasee');
        return ;
    }
    console.log("connected to the database");
})
exports.getAllItineraries=(callback)=>{
    db.query('select * from itineraries',callback);
}

exports.getIdItineraries=(id,callback)=>{
    db.query(`select * from itineraries where id=${id}`,callback);
}
exports.createItineraries=(content,callback)=>{

    let  values=[content.email,content.username,content.acceptedby,content.title,content.destination,content.start_date,content.end_date,content.description,
        content.budget,content.traveler_name,content.traveler_contact,content.total_cost,content.request]
        let query=`insert into itineraries(email,username,acceptedby,title,destination,start_date,end_date,description,budget,traveler_name,traveler_contact,total_cost,request )values (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        db.query(query,values,callback);
}
exports.updateItineraries=(id,updated,callback)=>{
    console.log(updated);
    db.query(`update  itineraries set ? where id=?`,[updated,id],callback);
}

exports.deleteItineraries=(id,callback)=>{
    db.query(`Delete from itineraries where id=${id}`,callback);
}

exports.deleteuser=(id,callback)=>{
    db.query(`Delete from people where id=${id}`,callback);
}
exports.signup=(content,callback)=>{
    let  values=[content.email,content.username,content.password,content.role];
        let query=`insert into people(email,username,password,role) values(?,?,?,?);`;
        db.query(query,values,callback);
}
exports.login=(content,callback)=>{
    console.log(content);
    db.query('select * from people where email=? and password=?;',[content.email,content.password],callback);
}
exports.updatestateaccept=(id,updated,callback)=>{
    console.log(updated);
    db.query(`update  itineraries set ? where id=?`,[updated,id],callback);
}

exports.getAllUsers=(callback)=>{
    db.query('select * from people',callback);
}
exports.updateuser=(id,updated,callback)=>{
    console.log(updated);
    db.query(`update  people set ? where id=?`,[updated,id],callback);
}
