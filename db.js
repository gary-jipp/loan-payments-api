const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "loan-payment",
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