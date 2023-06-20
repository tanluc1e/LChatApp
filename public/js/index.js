var wrap = document.getElementById("wrap");

// ====================== UI FUNCTIONS ======================
function login() {
  document.getElementById("step1").classList.toggle("oplog"),
    document.getElementById("step2").classList.toggle("cllog");
}

// ====================== SOCKET LISTENERS ======================
const socket = io();
socket.on("connect", () => {
  console.log("Connected to the server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});

// ====================== FETCH ======================
(function () {
  fetch("/chats")
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      json.map((data) => {
        console.log(data);
      });
    });
})();
