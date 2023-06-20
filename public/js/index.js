const socket = io();

var wrap = document.getElementById("wrap"),
  submit = document.getElementById("send"),
  input = document.getElementsByClassName("message")[0],
  usernameInput = document.getElementById("username"),
  user = "" || localStorage.getItem("username");

function checkTime(e) {
  return e < 10 && (e = "0" + e), e;
}

(function checkLogin() {
  if (user) {
    $(".initModal").css("display", "none");
  }
})();

// ====================== UI FUNCTIONS ======================
function login() {
  document.getElementById("step1").classList.toggle("oplog"),
    document.getElementById("step2").classList.toggle("cllog");
}

// ====================== HANDLES ======================
// LOGIN
function loginEnter(event, value) {
  if (event.key === "Enter") {
    user = value;
    $(".initModal").css("display", "none");
    localStorage.setItem("username", user);
    localStorage.setItem("msb", "my");
  }
}

//SEND
submit.onclick = function () {
  var tm = new Date();

  const messageHTML =
    '<div class="msb"><div onclick="DoSmilie(\'' +
    user +
    '\');" class="cover" style="background-image: url(' +
    user +
    ');"></div><div class="cover_n">' +
    user +
    "</div><span>" +
    user +
    "</span> <time>" +
    "Just now" +
    "</time><div>" +
    input.value +
    "</div></div>";
  wrap.innerHTML += messageHTML;

  socket.emit("username", user);
  socket.emit("chat message", input.value);
  socket.emit("time", nowTime);

  input.value = "";
};

// ====================== SOCKET LISTENERS ======================
socket.on("connect", () => {
  console.log("Connected to the server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});

socket.on("received", (data) => {
  console.log("received listen");
  const messageHTML =
    '<div class="msb"><div onclick="DoSmilie(\'' +
    data.username +
    '\');" class="cover" style="background-image: url(' +
    data.username +
    ');"></div><div class="cover_n">' +
    data.username +
    "</div><span>" +
    data.username +
    "</span> <time>" +
    "Just now" +
    "</time><div>" +
    data.message +
    "</div></div>";
  wrap.innerHTML += messageHTML;
});
// ====================== FETCH ======================
(function () {
  fetch("/chats")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((message) => {
        const messageHTML =
          '<div class="msb"><div onclick="DoSmilie(\'' +
          message.username +
          '\');" class="cover" style="background-image: url(' +
          message.username +
          ');"></div><div class="cover_n">' +
          message.username +
          "</div><span>" +
          message.username +
          "</span> <time>" +
          formatTimeAgo(message.createdAt) +
          "</time><div>" +
          message.message +
          "</div></div>";
        wrap.innerHTML += messageHTML;
      });
      window.scrollTo(0, document.body.scrollHeight);
    });
})();
