create database JobApplicationTracker;

use JobApplicationTracker;


-- Creating JobSeeker table

CREATE TABLE JobSeeker 
(
    JobSeekerId INT identity(1,1) PRIMARY KEY ,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    UserName VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Domain VARCHAR(100) NOT NULL,
    Qualification VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Mobile VARCHAR(15) UNIQUE NOT NULL
);


-- inserting values into JobSeeker
INSERT INTO JobSeeker (FirstName, LastName, UserName, Password, Domain, Qualification, Email, Mobile)
VALUES
    ('John', 'Doe', 'johndoe', 'hashedpass1', 'Software Development', 'B.Tech', 'johndoe@example.com', '1876543210'),
    ('Jane', 'Smith', 'janesmith', 'hashedpass2', 'Data Science', 'M.Sc', 'janesmith@example.com', '8765432109'),
    ('Mike', 'Johnson', 'mikejohnson', 'hashedpass3', 'Cyber Security', 'B.Sc', 'mikejohnson@example.com', '7654321098'),
    ('Emily', 'Davis', 'emilydavis', 'hashedpass4', 'Cloud Computing', 'M.Tech', 'emilydavis@example.com', '6543210987'),
    ('David', 'Wilson', 'davidwilson', 'hashedpass5', 'AI & ML', 'Ph.D', 'davidwilson@example.com', '5432109876');



Select * from JobSeeker;

-- Creating JobPortal table

CREATE TABLE JobPortal 
(
    PortalId INT IDENTITY(1,1) PRIMARY KEY,
    PortalName VARCHAR(100) NOT NULL,
    JobName VARCHAR(100) NOT NULL,
    CompanyId INT NOT NULL,
    JobDescription TEXT NOT NULL,
    Position INT NOT NULL,
    PublishedOn DATE NOT NULL,
    Status VARCHAR(10) NOT NULL CHECK (Status IN ('OPEN', 'CLOSED')),
    EndComments TEXT,
	FOREIGN KEY (CompanyId) REFERENCES JobPosters(CompanyId) ON DELETE CASCADE,
);

-- inserting values into JobPortal
INSERT INTO JobPortal (PortalName, JobName, CompanyId, JobDescription, Position, PublishedOn, Status, EndComments)
VALUES
    ('LinkedIn', 'Software Engineer', 1, 'Develop and maintain scalable applications.', 5, '2025-03-01', 'OPEN', NULL),
    ('Indeed', 'Data Analyst', 2, 'Analyze and interpret complex data.', 3, '2025-03-02', 'OPEN', NULL),
    ('Naukri', 'Cyber Security Specialist', 3, 'Ensure IT security and compliance.', 2, '2025-03-03', 'OPEN', NULL),
    ('Monster', 'Cloud Engineer', 4, 'Deploy and manage cloud infrastructure.', 4, '2025-03-04', 'CLOSED', 'Position filled.'),
    ('Glassdoor', 'AI Researcher', 5, 'Develop AI models for automation.', 2, '2025-03-05', 'OPEN', NULL);






-- Creating ApplyJob table

CREATE TABLE ApplyJob 
(
   JobAppID INT IDENTITY(1,1) PRIMARY KEY,
   JobSeekerId INT NOT NULL,
   PortalId INT NOT NULL,
   AppliedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
   Status VarChar(10) NOT NULL CHECK (Status IN ('APPLIED', 'REJECTED', 'SELECTED', 'PENDING')),
   FOREIGN KEY (JobSeekerId) REFERENCES JobSeeker(JobSeekerId) ON DELETE CASCADE,
   FOREIGN KEY (PortalId) REFERENCES JobPortal(PortalId) ON DELETE CASCADE
);

--inserting data into ApplyJob
INSERT INTO ApplyJob (JobSeekerId, PortalId, AppliedOn, Status)
VALUES
    (1, 2, '2025-03-01 10:15:00', 'APPLIED'),
    (2, 1, '2025-03-02 14:30:00', 'PENDING'),
    (3, 3, '2025-03-03 09:45:00', 'SELECTED'),
    (4, 1, '2025-03-04 16:20:00', 'REJECTED'),
    (5, 2, '2025-03-05 11:10:00', 'APPLIED');





-- Creating JobPosters table;

CREATE TABLE JobPosters 
(
    CompanyId INT IDENTITY(1,1) PRIMARY KEY,
    CompanyName VARCHAR(255) NOT NULL,
    City VARCHAR(100) NOT NULL,
    State VARCHAR(100) NOT NULL,
    UserName VARCHAR(100) UNIQUE NOT NULL,
    PasswordHashed VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PhoneNo VARCHAR(50) UNIQUE NOT NULL
);

-- inserting values into JobPosters
INSERT INTO JobPosters (CompanyName, City, State, UserName, PasswordHashed, Email, PhoneNo)
VALUES
    ('Google', 'Mountain View', 'California', 'google_admin', 'hashgoogle', 'hr@google.com', '9876543211'),
    ('Microsoft', 'Redmond', 'Washington', 'microsoft_hr', 'hashmicrosoft', 'hr@microsoft.com', '8765432110'),
    ('Amazon', 'Seattle', 'Washington', 'amazon_jobs', 'hashamazon', 'hr@amazon.com', '7654321109'),
    ('Facebook', 'Menlo Park', 'California', 'facebook_hr', 'hashfacebook', 'hr@facebook.com', '6543211098'),
    ('Tesla', 'Palo Alto', 'California', 'tesla_hr', 'hashtesla', 'hr@tesla.com', '5432109987');





Select * from JobPosters;
Select * from JobPortal;
Select * from JobSeeker;
Select * from ApplyJob;