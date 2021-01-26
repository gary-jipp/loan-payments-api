
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "vagrant",
  password: process.env.DB_PASS || "123",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "loan-payment",
});

const paymentsQuery =
  "select p.id id, TO_CHAR(date,'YYYY-mm-dd') date, amount, rate \
  from payments p, accounts a \
  where p.account_id=a.id and a.uid=$1 \
  order by date";

const getPayments = function (uid) {
  return pool.query(paymentsQuery, [uid]);
};

module.exports = { getPayments, pool };