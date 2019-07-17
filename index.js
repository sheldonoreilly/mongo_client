require("dotenv").config();
const app = require("./server");
const { MongoClient } = require("mongodb");
const MoviesDAO  = require("./src/dao/moviesDAO");

const port = process.env.PORT || 8000;

MongoClient.connect(
  process.env.MFLIX_DB_URI,
  { useNewUrlParser: true }
)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await MoviesDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
