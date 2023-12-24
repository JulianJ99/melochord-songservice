const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "postgresdb",
  database: "melochord",
  password: "123",
  port: 5432
});
//get all songs from the database
const getSongs = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM songs", (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};
//create a new song record in the database
const createSong = (body) => {
  return new Promise(function (resolve, reject) {
    
    const { title, album, artist, createdAt, updatedAt} = body;
    pool.query(
      "INSERT INTO songs (title, album, artist, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, album, artist, createdAt, updatedAt],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new song has been added: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
//delete a song
const deleteSong = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM songs WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Song deleted with ID: ${id}`);
      }
    );
  });
};
//update a song record
const updateSong = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { title, album, artist} = body;
    pool.query(
      "UPDATE songs SET title = $1, album = $2, artist = $3 WHERE id = $4 RETURNING *",
      [title, album, artist, id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Song updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};
module.exports = {
  getSongs,
  createSong,
  deleteSong,
  updateSong
};