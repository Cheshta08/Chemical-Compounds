const mysql = require("mysql2");

//local mysql db connection
const connection = mysql.createConnection({
  host:  "localhost",
  user:   "root",
  password: "Chinky1",
  database: "chemicalDB",
  port: 3308
});

// Function to get all rows from a table
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    
  }
  console.log('Connected to MySQL!');
});
function getChemicalCompounds() {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, CompoundName, CompoundDescription, strImageSource, strImageAttribution, dateModified FROM compounds`;
    
    connection.query(query, (error, results) => {
      if (error) {
        console.log('Error fetching chemical compounds:', error);
        return reject(error); // Reject the promise with the error
      }
      resolve(results); // Resolve the promise with the results
    });
  })
}

function getChemicalCompoundsById(CompoundId) {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, CompoundName, CompoundDescription, strImageSource, strImageAttribution, dateModified FROM compounds WHERE id = ?`;
    
    connection.query(query, [CompoundId], (error, results) => {
      if (error) {
        console.log('Error fetching chemical compound by ID:', error);
        return reject(error); // Reject the promise with the error
      }
      resolve(results.length ? results[0] : null); // Resolve the promise with the result
    });
  });
}
 function UpdateCompoundDetail(CompoundId, data) {
  try {
    const conn =  connection; // Await the connection
    const [result] =  conn.query(`UPDATE ?? SET ? WHERE id = ?`, [
      "compound",
      data,
      CompoundId,
    ]);
    return result;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getChemicalCompounds,
  getChemicalCompoundsById,
  UpdateCompoundDet: UpdateCompoundDetail,
};
