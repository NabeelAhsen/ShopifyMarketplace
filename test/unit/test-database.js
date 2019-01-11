/* global describe it */
const mysql = require('mysql');
const { expect } = require('chai');
const env = require('../../src/config/envConfig');

describe('Connection to MySQL database', () => {
  describe('Refuse connection if credentials are wrong', () => {
    it('should refuse connection if password is wrong', (done) => {
      const con = mysql.createConnection({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: 'foo123oof', // Insert the wrong password
        database: env.DB_NAME,
      });

      con.connect((err) => {
        expect(err).to.not.equal(null);
        done(); // tells mocha that our tests are async
      });
    });

    it('should refuse connection if the host is wrong', (done) => {
      const con = mysql.createConnection({
        host: '92', // Insert the wrong host
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
      });

      con.connect((err) => {
        expect(err).to.not.equal(null);
        done(); // tells mocha that our tests are async
      });
    });

    it('should refuse connection if trying to connect to the wrong database', (done) => {
      const con = mysql.createConnection({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: 'foo123oof', // Insert the wrong db name
      });

      con.connect((err) => {
        expect(err).to.not.equal(null);
        done(); // tells mocha that our tests are async
      });
    });

    it('should connect to the correct database', (done) => {
      const con = mysql.createConnection({
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
      });

      con.connect((err) => {
        expect(err).to.equal(null);
        done(); // tells mocha that our tests are async
      });
    });
  });
});
