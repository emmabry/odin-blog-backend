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

app.get('/', (req, res) => {
  res.send("Blog backend")
})

app.get('/posts', async (req, res, next) => {
  const posts = await prisma.posts.findMany()
  res.json({ posts: posts })
})

app.get('/posts/:id', async (req, res, next) => {
  const post = await prisma.posts.findUnique({
    where: { id: parseInt(req.params.id) }
  });
  res.json({ post: post })
})

app.get('/posts/:id/comments', async (req, res, next) => {
  const comments = await prisma.comments.findMany({
    where: { post_id: parseInt(req.params.post_id) }
  });
  res.json({ comments: comments })
})

app.get('/comments/:comment_id', async (req, res, next) => {
  const comment = await prisma.comments.findMany({
    where: { id: parseInt(req.params.post_id) }
  });
  res.json({ comment: comment })
})

app.get('/users', async (req, res, next) => {
  const users = await prisma.users.findMany();
  res.json({ users: users })
});

app.get('/users/:id', async (req, res, next) => {
  const user = await prisma.users.findMany({
    where: { id: req.params.id }
  });
  res.json({ user: user })
});

app.get('/users/:id/comments', async (req, res, next) => {
  const comments = await prisma.comments.findMany({
    where: { user_id: req.params.id }
  });
  res.json({ comments: comments })
});

app.get('/users/:id/posts', async (req, res, next) => {
  const posts = await prisma.posts.findMany({
    where: { user_id: req.params.id }
  });
  res.json({ posts: posts })
});