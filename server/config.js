const config = {
    db: {
      host: "localhost",
      user: "root",
      password: "admin",
      database: "file_list",
      port: '/var/run/mysqld/mysqld.sock'
    },
    listPerPage: 10,
  };
module.exports = config;