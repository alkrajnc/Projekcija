CREATE DATABASE file_list;


CREATE TABLE files
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    file_name VARCHAR(255) NOT NULL,
    file_location VARCHAR(255) NOT NULL,
    file_type VARCHAR(15) NOT NULL,
    upload_time DATETIME NOT NULL
);


update files
   set isActive = 1
where id = 1;

-- Delete rows from table 'files'
DELETE FROM files
WHERE file_name = 'undefined';


ALTER TABLE files ADD COLUMN isActiveTv1 boolean AFTER isActiveTv0;
ALTER TABLE files COLUMN `isActive` TO `isActiveTv1`
ALTER TABLE files DROP COLUMN isActive
select * from files;
