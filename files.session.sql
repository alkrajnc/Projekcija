


CREATE TABLE files
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    file_name VARCHAR(255) NOT NULL,
    file_location VARCHAR(255) NOT NULL,
    file_type VARCHAR(15) NOT NULL,
    upload_time DATETIME NOT NULL
)


update files
   set isActive = 1
where id = 1

ALTER TABLE files ADD COLUMN isActive boolean AFTER upload_time
select * from files
