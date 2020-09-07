const { io } = require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");

const bands = new Bands();

bands.addBand(new Band("Monky D Luffy"));
bands.addBand(new Band("Kaido Rey Bestia"));
bands.addBand(new Band("Big Mama"));
bands.addBand(new Band("Zoro and Sanji"));

//Mensaje de socket
io.on("connection", (client) => {
  console.log("Cliente conectado");

  //Emitimos las bandas cread al cliente que esta usando la aplicación

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje!!!", payload);

    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });

  // //Nuevo mensaje on es para escuchar
  // client.on("emitir-mensaje", (payload) => {
  //   // io.emit("nuevo-mensaje", payload); //para emitir el mensaje a todos
  //   client.broadcast.emit("nuevo-mensaje", payload); //Para emitir a todos menos al que lo emitio
  // });

  client.on("vote-band", (payload) => {
    console.log(payload.id);
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (payload) => {
    bands.addBand(new Band(payload.name));
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload) => {
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });
});
