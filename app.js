const express = require('express')
const session = require('express-session');
const path = require("node:path");
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const passport = require('passport')
const bcrypt = require("bcryptjs")
const LocalStrategy = require('passport-local').Strategy;
require("dotenv").config();

const prisma = new PrismaClient();

const app = express();

app.use(
  session({
      cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // ms
  },
      secret: 'a santa at nasa',
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(
      new PrismaClient(),
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});

app.get('/posts', async (req, res, next) => {
  const posts = await prisma.posts.findMany()
  res.json({ posts: posts })
})
