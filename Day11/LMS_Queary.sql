create database lms
go

use lms
go

create table Employee
(
   EmpId INT PRIMARY KEY, 
   EmployName varchar(30), 
   MgrId INT REFERENCES Employee(EmpId),
   LeaveAvail INT, 
   DateOfBirth DateTime,
   Email varchar(30),
   Mobile varchar(30)
)
GO
Create Table LeaveHistory
(
   LeaveId INT IDENTITY(1,1) Primary Key,
   EmpId INT REFERENCES Employee(EmpID),
   LeaveStartDate DateTime,
   LeaveEndDate DateTime,
   noOfDays INT,
   LeaveStatus Varchar(30) DEFAULT 'PENDING',
   LeaveReason varchar(30),
   ManagerComments varchar(30)
)

INSERT INTO LeaveHistory (EmpId, LeaveStartDate, LeaveEndDate, LeaveReason)  
VALUES  
-- Employee ID: 1000
(1000, '2025-08-10', '2025-08-12', 'Family Vacation'),
(1000, '2025-09-15', '2025-09-17', 'Medical Checkup'),
(1000, '2025-10-05', '2025-10-07', 'Festival Celebration'),
(1000, '2025-11-22', '2025-11-24', 'Personal Work'),
(1000, '2025-12-10', '2025-12-12', 'Training Program'),

-- Employee ID: 2000
(2000, '2025-10-10', '2025-10-11', 'Going Home'),
(2000, '2025-11-11', '2025-11-14', 'Marriage'),
(2000, '2025-12-01', '2025-12-03', 'Medical Emergency'),
(2000, '2026-01-05', '2026-01-06', 'Family Function'),
(2000, '2026-02-15', '2026-02-18', 'Vacation Trip'),

-- Employee ID: 3000
(3000, '2025-12-12', '2025-12-14', 'Convocation'),
(3000, '2026-01-10', '2026-01-12', 'Festival Celebration'),
(3000, '2026-02-20', '2026-02-22', 'Personal Work'),
(3000, '2026-03-15', '2026-03-17', 'Health Checkup'),
(3000, '2026-04-05', '2026-04-08', 'Outstation Travel'),

-- Employee ID: 4000
(4000, '2025-06-20', '2025-06-22', 'Business Trip'),
(4000, '2025-07-15', '2025-07-17', 'Annual Leave'),
(4000, '2025-08-05', '2025-08-06', 'Medical Emergency'),
(4000, '2025-09-10', '2025-09-12', 'Family Function'),
(4000, '2025-10-25', '2025-10-27', 'Festival Celebration'),

-- Employee ID: 5000
(5000, '2025-11-01', '2025-11-03', 'Team Outing'),
(5000, '2025-12-15', '2025-12-17', 'Marriage'),
(5000, '2026-01-05', '2026-01-06', 'Parental Visit'),
(5000, '2026-02-20', '2026-02-22', 'Personal Work'),
(5000, '2026-03-10', '2026-03-12', 'Work from Home');

select * from LeaveHistory;
 
GO


Insert into Employee values(1000,'Muskan',NULL,20,'12-12-2002','muskan@gmail.com','992445552'),
(2000,'Aadithian',1000,22,'05-12-2002','aadi@gmail.com','99293444'),
(3000,'Avinash',1000,28,'11-11-2001','Avin@gmail.com','9922445'),
(4000,'Prashanth',2000,18,'11-12-2002','prash@gmail.com','99234544'),
(5000,'Anjali',3000,18,'12-12-2002','anjali@gmail.com','9994222')
select * from Employee;
select empId from employee where MgrId=1000;
select empId from employee where MgrId=2000;
select empId from employee where MgrId=3000;

select * from LeaveHistory where empID IN(
select empId from employee where MgrId=1000) AND LeaveStatus='PENDING'

select * from LeaveHistory where empID IN(
select empId from employee where MgrId=2000) AND LeaveStatus='PENDING'

select * from LeaveHistory where empID IN(
select  empId from employee where MgrId=3000) AND LeaveStatus='PENDING'
