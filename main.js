import express from 'express';
import { join } from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import "dotenv/config.js";
import cookieParser from 'cookie-parser';
import dataRouter from './routes/data.route.js';
import { createTable, db } from './util/db.js';
import submitRouter from './routes/submit.route.js';
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';
import apiRouter from './routes/api.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.set("view engine", "ejs")

app.use(express.static(join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  const data = db.prepare(`
    SELECT owner, COUNT(*) as num_items
    FROM puppets
    GROUP BY owner
  `).all();
  res.render("index", { owners: data })
});

app.use('/', dataRouter);
app.use('/', submitRouter)
app.use('/', authRouter)
app.use('/admin', adminRouter)
app.use('/api', apiRouter)

const port = 3000;
app.listen(port, () => {
  db.exec(createTable)
  console.log(`Server is running on port ${port}`);
});
