/**
- the express/app creation/connection/porting
- the postgres connection via knex
- all middleware
- api routes
 */
//chat bot
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const express = require("express");
require("dotenv").config();
// App
const app = express();
// chatbot
const server = http.createServer(app);
const io = socketio(server);
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatCord Bot";

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

// use process.env variables to keep private variables,

/*require('dotenv').config({ path: '.env' });*/

// Express Middleware
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const bodyParser = require("body-parser"); // turns response into usable format
const cors = require("cors"); // allows/disallows cross-site communication
const morgan = require("morgan"); // logs requests

// db Connection w/ localhost
/*var db = require('knex')({
  client: 'pg',
  connection: process.env.HEROKU_POSTGRES_DATABASE_URL + `?ssl=true`
});*/

var db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgres",
    database: "eventure",
  },
});

// Controllers - aka, the db queries
const test = require("./controllers/test");
// ADD more controls
const users = require("./controllers/users");
const orgs = require("./controllers/orgs");
const events = require("./controllers/events");
const socials = require("./controllers/socials");
const memberships = require("./controllers/memberships");
const achievements = require("./controllers/achievements");
const userachievements = require("./controllers/UserAchievements");
const tags = require("./controllers/tags");
const friendships = require("./controllers/friendships");

const auth = require("./controllers/auth");
const rsvps = require("./controllers/rsvps");

const usermanagedorgs = require("./controllers/UserManagedOrgs");
const userorgs = require("./controllers/userorgs");

const orgmanagedevents = require("./controllers/OrgManagedEvents");
const usermanagedevents = require("./controllers/UserManagedEvents");
const userrsvpedevents = require("./controllers/UserRsvpedEvents");

const userevents = require("./controllers/userevents");
const eventattendees = require("./controllers/eventattendees");

const userfriends = require("./controllers/UserFriends");

const specificevent = require("./controllers/SpecificEvent");
const specificuser = require("./controllers/SpecificUser");
const specificorg = require("./controllers/SpecificOrg");

const upcomingevents = require("./controllers/UpcomingEvents");

const verifymembership = require("./controllers/VerifyMembership");
const verifyfriendship = require("./controllers/VerifyFriendship");

const verifyrsvp = require("./controllers/VerifyRSVP");

const friendcount = require("./controllers/FriendCount");
const eventcount = require("./controllers/EventCount");
const orgcount = require("./controllers/OrgCount");

// const organizations = ('./controllers/organizations');

// App Middleware
const whitelist = ["http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("combined")); // use 'tiny' or 'combined'

// App Routes - Auth
app.get("/", (req, res) => res.send("hello world"));
app.get("/crud", (req, res) => test.getTableData(req, res, db));
app.post("/crud", (req, res) => test.postTableData(req, res, db));
app.put("/crud", (req, res) => test.putTableData(req, res, db));
app.delete("/crud", (req, res) => test.deleteTableData(req, res, db));
// ADD more routes
app.get("/users", (req, res) => users.getTableData(req, res, db));
app.post("/users", (req, res) => users.postTableData(req, res, db));
app.put("/users", (req, res) => users.putTableData(req, res, db));
app.delete("/users", (req, res) => users.deleteTableData(req, res, db));
// Organization Routes
app.get("/orgs", (req, res) => orgs.getTableData(req, res, db));
app.post("/orgs", (req, res) => orgs.postTableData(req, res, db));
app.put("/orgs", (req, res) => orgs.putTableData(req, res, db));
app.delete("/orgs", (req, res) => orgs.deleteTableData(req, res, db));
// Events Routes
app.get("/events", (req, res) => events.getTableData(req, res, db));
app.post("/events", (req, res) => events.postTableData(req, res, db));
app.put("/events", (req, res) => events.putTableData(req, res, db));
app.delete("/events", (req, res) => events.deleteTableData(req, res, db));
// Socials Routes
app.get("/socials", (req, res) => socials.getTableData(req, res, db));
app.post("/socials", (req, res) => socials.postTableData(req, res, db));
app.put("/socials", (req, res) => socials.putTableData(req, res, db));
app.delete("/socials", (req, res) => socials.deleteTableData(req, res, db));
// Memberships Routes
app.get("/memberships", (req, res) => memberships.getTableData(req, res, db));
app.post("/memberships", (req, res) => memberships.postTableData(req, res, db));
app.put("/memberships", (req, res) => memberships.putTableData(req, res, db));
app.delete("/memberships", (req, res) =>
  memberships.deleteTableData(req, res, db)
);
// Tags Routes
app.get("/tags", (req, res) => tags.getTableData(req, res, db));
app.post("/tags", (req, res) => tags.postTableData(req, res, db));
app.put("/tags", (req, res) => tags.putTableData(req, res, db));
app.delete("/tags", (req, res) => tags.deleteTableData(req, res, db));

// Friendship Routes
app.get("/friendships", (req, res) => friendships.getTableData(req, res, db));
app.post("/friendships", (req, res) => friendships.postTableData(req, res, db));
app.put("/friendships", (req, res) => friendships.putTableData(req, res, db));
app.delete("/friendships", (req, res) =>
  friendships.deleteTableData(req, res, db)
);

// Auth Routes
app.post("/auth", (req, res) => auth.postTableData(req, res, db));
// RSVP routes
app.get("/rsvps", (req, res) => rsvps.getTableData(req, res, db));
app.post("/rsvps", (req, res) => rsvps.postTableData(req, res, db));
app.put("/rsvps", (req, res) => rsvps.putTableData(req, res, db));
app.post("/rsvps", (req, res) => rsvps.postTableData(req, res, db));
app.delete("/rsvps", (req, res) => rsvps.deleteTableData(req, res, db));
// Achievement Routes
app.get("/achievements", (req, res) => achievements.getTableData(req, res, db));
app.post("/achievements", (req, res) =>
  achievements.postTableData(req, res, db)
);
app.put("/achievements", (req, res) => achievements.putTableData(req, res, db));
app.post("/achievements", (req, res) =>
  achievements.postTableData(req, res, db)
);
app.delete("/achievements", (req, res) =>
  achievements.deleteTableData(req, res, db)
);
// User Achievement Routes
app.get("/userachievements", (req, res) =>
  userachievements.getTableData(req, res, db)
);
app.post("/userachievements", (req, res) =>
  userachievements.postTableData(req, res, db)
);
app.put("/userachievements", (req, res) =>
  userachievements.putTableData(req, res, db)
);
app.post("/userachievements", (req, res) =>
  userachievements.postTableData(req, res, db)
);
app.delete("/userachievements", (req, res) =>
  userachievements.deleteTableData(req, res, db)
);

app.post("/usermanagedorgs", (req, res) =>
  usermanagedorgs.postTableData(req, res, db)
);
app.post("/userorgs", (req, res) => userorgs.postTableData(req, res, db));

app.post("/orgmanagedevents", (req, res) =>
  orgmanagedevents.postTableData(req, res, db)
);
app.post("/usermanagedevents", (req, res) =>
  usermanagedevents.postTableData(req, res, db)
);
app.post("/userrsvpedevents", (req, res) =>
  userrsvpedevents.postTableData(req, res, db)
);
app.post("/userevents", (req, res) => userevents.postTableData(req, res, db));

app.post("/eventattendees", (req, res) =>
  eventattendees.postTableData(req, res, db)
);

app.post("/userfriends", (req, res) => userfriends.postTableData(req, res, db));

app.post("/specificevent", (req, res) =>
  specificevent.postTableData(req, res, db)
);
app.post("/specificuser", (req, res) =>
  specificuser.postTableData(req, res, db)
);
app.post("/specificorg", (req, res) => specificorg.postTableData(req, res, db));

app.post("/verifymembership", (req, res) =>
  verifymembership.postTableData(req, res, db)
);
app.post("/verifyfriendship", (req, res) =>
  verifyfriendship.postTableData(req, res, db)
);

app.post("/verifyrsvp", (req, res) => verifyrsvp.postTableData(req, res, db));

app.get("/upcomingevents", (req, res) =>
  upcomingevents.getTableData(req, res, db)
);

app.post("/orgcount", (req, res) => orgcount.postTableData(req, res, db));
app.post("/eventcount", (req, res) => eventcount.postTableData(req, res, db));
app.post("/friendcount", (req, res) => friendcount.postTableData(req, res, db));

// app.get('/organizations', (req, res) => organizations.getTableData(req, res, db))
// app.post('/organizations', (req, res) => organizations.postTableData(req, res, db))
// app.put('/organizations', (req, res) => organizations.putTableData(req, res, db))
// app.delete('/organizations', (req, res) => organizations.deleteTableData(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`);
});

// // chatapp
// PORT = 3002;

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
