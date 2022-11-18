"use strict";

const {
  db,
  models: { User, History },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      email: "cody123@gmail.com",
      password: "123",
      phone: "9999393842",
      isAdmin: false,
      isOwner:false, 
      cuisine: "chinese",
      zipcode: "11230"
    }),
    User.create({
      username: "murphy",
      email: "murphy123@gmail.com",
      password: "123",
      phone: "9999393843",
      isAdmin: false,
      isOwner:false,
      cuisine: "korean",
      zipcode: "11101"
    }),
    User.create({
      username: "paul",
      email: "paul123@gmail.com",
      password: "123",
      phone: "9999393442",
      isAdmin: true,
      isOwner:true,
      cuisine: "carribean",
      zipcode: "11238"
    }),
    User.create({
      username: "Alan",
      email: "alan123@gmail.com",
      password: "123",
      phone: "9999391842",
      isAdmin: true,
      isOwner: true,
    }),
    User.create({
      username: "min",
      email: "min123@gmail.com",
      password: "123",
      phone: "9929393842",
      isAdmin: true,
      isOwner: true,
    }),
    User.create({
      username: "bob",
      password: "123",
      email: "bob@mail.com",
      phone: "9999393842",
      isAdmin: false,
      isOwner: true,
      cuisine: "french",
      zipcode: "12100",
    }),
  ]);

  const histories = await Promise.all([
    History.create({
      restaurantId: 50071766,
      restaurantName: "Mary's Palace",
      timesVisited: 2,
      userId: 2,
    }),
    History.create({
      restaurantId: 50089410,
      restaurantName: "Teriyaki 365",
      timesVisited: 1,
      userId: 2,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  return {
    users,
    histories,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
