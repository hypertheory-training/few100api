"use strict";

const Hapi = require("hapi");

const books = [
  { id: "1", title: "Walden", author: "Thoreau" },
  { id: "2", title: "Nature", author: "Emerson" },
  { id: "3", title: "The Sorrows of Young Werther", author: "Goethe" }
];

function getBooks() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(books);
    }, 2000);
  });
}

// Create a server with a host and port
const server = Hapi.server({
  host: "localhost",
  port: 8000,
  routes: { cors: true }
});

// Add the route
server.route({
  method: "GET",
  path: "/books",
  handler: async function(request, h) {
    return await getBooks();
  }
});

// Start the server
const start = async function() {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
};

start();
