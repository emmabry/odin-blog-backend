const express = require('express')
const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./prismaClient'); 
const passport = require('passport')
const bcrypt = require('bcryptjs');
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

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.users.findUnique({
        where: { username }
    });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" })
}
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id }
  });

    done(null, user);
  } catch(err) {
    done(err);
  }
});

app.get('/', (req, res) => {
  res.send("Blog backend")
})

app.post('/login', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ message: info.message || 'Authentication failed' });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

    const token = jwt.sign({ user: user }, 'secretkey', { expiresIn: '1h' });

    return res.json({ token: token });
    });
  })(req, res, next);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});

// TODO: Require JWT auth for: delete comment, delete post, create post, getAllUsers, deleteUser, createUser, getUserById?