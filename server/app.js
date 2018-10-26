const express = require("express");
const axios = require("axios");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const API_KEY = "urTDMV5QaTnFaZGhO9rj";

const getBusLocations = socket => {
  try {
    axios
      .get(
        `
          http://api.translink.ca/rttiapi/v1/buses?apikey=${API_KEY}`
      )
      .then(({ data }) => {
        console.log("updated");
        socket.emit("BusLocationsUpdated", data);
      });
  } catch (error) {
    console.log("Error", error);
  }
};

let interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getBusLocations(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => console.log("Server is running on port 3000"));
