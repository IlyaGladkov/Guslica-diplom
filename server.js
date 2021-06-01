const express = require("express");
const database = require("./database.js");

let app = express();
let port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/users", async (req, res) => {
  let client = await database.connect();
  let { rows } = await client.query("SELECT * FROM users");

  res.json(rows);
});

app.post("/users", async ({ body }, res) => {
  let client = await database.connect();

  let fields = ["firstname", "lastname", "patronymic", "email"];
  let fieldValues = fields.map((f) => body[f]);

  if (fieldValues.every((v) => v != null && v !== "")) {
    let {
      rows: [upsertedUser],
    } = await client.query(
      `
          INSERT INTO users
            (firstname, lastname, patronymic, email)
          VALUES
            ($1, $2, $3, $4)
          RETURNING id
        `,
      fieldValues
    );

    return res.json({ ...body, ...upsertedUser });
  }

  res
    .status(400)
    .send(`Missed required fields: ${fields.filter((f) => !body[f]).join()}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
