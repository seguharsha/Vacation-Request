create database assignment10;
use assignment10;
create table itineraries (id int auto_increment primary key ,email varchar(100),username varchar(100),acceptedby varchar(100),title varchar(200) not null, destination varchar(200) not null, 
start_date date not null, end_date date not null, description varchar(200) not null, budget int not null, 
traveler_name varchar(200) not null, traveler_contact varchar(200) not null, total_cost int not null,request varchar(100));
insert into itineraries(email,username,acceptedby,title,destination,start_date,end_date,description,budget,traveler_name,traveler_contact,total_cost,request ) 
values('sai@gmail.com','sai','Harsha','Trip to Ladakh','Ladakh','2024-02-1','2024-02-10','went to ladakh for 10 days',20000,'Harshasegu','9876543210',10000,'pending');
insert into itineraries(email,username,acceptedby,title,destination,start_date,end_date,description,budget,traveler_name,traveler_contact,total_cost,request) 
values('sai@gmail.com','sai','Harsha','Summer Trip Hyderabad','Hyderabad','2023-01-1','2023-03-10','went to Hyderabad for 5 days',10000,'ELishanee','987654000',100000,'accepted');
create table people(id int auto_increment primary key,username varchar(200), email varchar(100) unique, password varchar(100),role varchar(100));
insert into people(email,username,password,role) values('harsha@gmail.com','Harsha','123456','Admin');
insert into people(email,username,password,role) values('segu@gmail.com','sandeep','12345','User');
insert into people(email,username,password,role) values('sai@gmail.com','sai','12345','User');

select * from people where email='elishane0981@gmail.com' and password='123456';
select * from people;
select * from itineraries;

