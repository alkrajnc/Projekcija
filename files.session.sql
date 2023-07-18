CREATE DATABASE file_list;
CREATE TABLE file_list.files (
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
ALTER TABLE file_list.files
ADD COLUMN isActiveTv1 boolean
AFTER isActiveTv0;
ALTER TABLE file_list.files COLUMN `isActive` TO `isActiveTv1`;
ALTER TABLE file_list.files DROP COLUMN isActive
select *
from files;