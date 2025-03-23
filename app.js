const express = require('express')
const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./prismaClient'); 
const passport = require('passport')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy;
require("dotenv").config();
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();
app.use(express.json());

app.use(
  session({
      cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // ms
  },
      secret: 'a santa at nasa',
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(
      prisma,
      {
          checkPeriod: 2 * 60 * 1000,  //ms
          dbRecordIdIsSessionId: true,
          dbRecordIdFunction: undefined,
      }
  )
  })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/posts/", postsRouter);
app.use("/comments/", commentsRouter);
app.use("/users/", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});

app.get('/', (req, res) => {
  res.send("Blog backend")
})

app.post('/login', (req, res) => {
  const user = {
    id: 1,
    username: 'emma',
    email: 'emma@bryan.com'
  }
  jwt.sign({ user: user }, 'secretkey', (err, token) => {
    res.json(
      {token : token}
    );
  });
})

// TODO: Require JWT auth for: delete comment, delete post, create post, getAllUsers, deleteUser, createUser, getUserById?