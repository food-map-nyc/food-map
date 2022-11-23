"use strict";

const {
  db,
  models: { User, History, Wishlist },
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
      isOwner: false,
      cuisine: "chinese",
      zipcode: "11230",
      imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
    }),
    User.create({
      username: "murphy",
      email: "murphy123@gmail.com",
      password: "123",
      phone: "9999393843",
      isAdmin: false,
      isOwner: false,
      cuisine: "korean",
      zipcode: "11101",
      imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
    }),
    User.create({
      username: "paul",
      email: "paul123@gmail.com",
      password: "123",
      phone: "9999393442",
      isAdmin: true,
      isOwner: true,
      cuisine: "carribean",
      zipcode: "11238",
      imageUrl: "https://media.istockphoto.com/id/1219935640/photo/sancocho-soup-or-stew.jpg?b=1&s=170667a&w=0&k=20&c=5up43MnFKa6yUFdpcnBwqoIAB1k86QZ72ZKdK-wo5V0="
    }),
    User.create({
      username: "Alan",
      email: "alan123@gmail.com",
      password: "123",
      phone: "9999391842",
      isAdmin: true,
      isOwner: true,
      imageUrl: "https://media.istockphoto.com/id/1347703842/photo/gourmet-plated-fishcake-with-vegetables.jpg?b=1&s=170667a&w=0&k=20&c=zRH9vmxgyrJPNMHyZ_BkpycOxqg0QPqtXygRxOQY7yk="
    }),
    User.create({
      username: "min",
      email: "min123@gmail.com",
      password: "123",
      phone: "9929393842",
      isAdmin: true,
      isOwner: true,
      imageUrl: "https://media.istockphoto.com/id/1308223808/photo/grilled-salmon-fillet-and-fresh-vegetable-salad-mediterranean-diet.jpg?b=1&s=170667a&w=0&k=20&c=3Hqmj_jGcF6m2Tj4Cb_Sek0GMSM2AuEUk6LcHNrf7kc="
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
      imageUrl: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
    }),
  ]);

  const histories = await Promise.all([
    History.create({
      restaurantId: "0CjK3esfpFcxIopebzjFxA",
      restaurantName: "Joe's Shanghai",
      timesVisited: 2,
      imageUrl:
        "https://s3-media4.fl.yelpcdn.com/bphoto/xM4eGRjk_EfSc1V8MdkRXw/o.jpg",
      userId: 1,
    }),
    History.create({
      restaurantId: "jjJc_CrkB2HodEinB6cWww",
      restaurantName: "LoveMama",
      timesVisited: 1,
      imageUrl:
        "https://s3-media1.fl.yelpcdn.com/bphoto/bLlFKTlVuLfmF-lIDGIjZA/o.jpg",
      userId: 1,
      favorite: true,
    }),
  ]);

  const wishlists = await Promise.all([
    Wishlist.create({
      restaurantId: "hdiuRS9sVZSMReZm4oV5SA",
      restaurantName: "Da Andrea",
      imageUrl:
        "https://s3-media2.fl.yelpcdn.com/bphoto/ZbJxx7Rl8fUH7Pg4GU2p3g/o.jpg",
      userId: 1,
    }),
    Wishlist.create({
      restaurantId: "ysqgdbSrezXgVwER2kQWKA",
      restaurantName: "Juliana's",
      imageUrl:
        "https://s3-media2.fl.yelpcdn.com/bphoto/HB5-BoJaVwOP5wLMG57TlA/o.jpg",
      userId: 1,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  return {
    users,
    histories,
    wishlists,
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
