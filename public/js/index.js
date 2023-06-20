function login() {
  document.getElementById("step1").classList.toggle("oplog"),
    document.getElementById("step2").classList.toggle("cllog");
}

const socket = io();

socket.on("connect", () => {
  console.log("Connected to the server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});
