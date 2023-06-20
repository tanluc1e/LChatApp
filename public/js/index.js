const socket = io();

var wrap = document.getElementById("wrap"),
  submit = document.getElementById("send"),
  input = document.getElementsByClassName("message")[0],
  usernameInput = document.getElementById("username"),
  userimageInput = document.getElementById("image"),
  user = "" || localStorage.getItem("username"),
  image = "" || localStorage.getItem("userphoto");

function checkTime(e) {
  return e < 10 && (e = "0" + e), e;
}

(function checkLogin() {
  if (user) {
    $(".initModal").css("display", "none");
  }
})();

(function checkPhoto() {
  if (image) {
    $(".chk").css("display", "none");
  }
})();

// ====================== UI FUNCTIONS ======================
(function ($) {
  $.sanitize = function (input) {
    var output = input
      .replace(/<script[^>]*?>.*?<\/script>/gi, "#@$!*6")
      .replace(/<[\/\!]*?[^<>]*?>/gi, "&!2%=_^")
      .replace(/<![\s\S]*?--[ \t\n\r]*>/gi, "@#%&7^")
      .replace(/<style[^>]*?>.*?<\/style>/gi, "#^$!$&1")
      .replace(/\[img\](.*?)\[\/img\]/gi, '<img class="pic" src="$1">')
      .replace(/\[a\](.*?)\[\/a\]/gi, '<a href="$1">$1</a>')
      .replace(
        /\[audio\](.*?)\[\/audio\]/gi,
        '<div class="audio"><div class="audio-side"><div class="audio-btn"><div class="control" data-src="$1"><i class="material-icons">play_arrow</i></div></div></div><div class="audio-text">$1</div></div>'
      )
      .replace(/#a01/gi, '<img class="emoji" src="./img/emoji/a01.png">')
      .replace(/#a02/gi, '<img class="emoji" src="./img/emoji/a02.png">')
      .replace(/#a03/gi, '<img class="emoji" src="./img/emoji/a03.png">')
      .replace(/#a04/gi, '<img class="emoji" src="./img/emoji/a04.png">')
      .replace(/#a05/gi, '<img class="emoji" src="./img/emoji/a05.png">')
      .replace(/#a06/gi, '<img class="emoji" src="./img/emoji/a06.png">')
      .replace(/#a07/gi, '<img class="emoji" src="./img/emoji/a07.png">')
      .replace(/#a08/gi, '<img class="emoji" src="./img/emoji/a08.png">')
      .replace(/#a09/gi, '<img class="emoji" src="./img/emoji/a09.png">')
      .replace(
        /#cat1.1/gi,
        '<img class="sticker" src="./img/stickers/cat/cat1.webp">'
      )
      .replace(
        /#cat1.2/gi,
        '<img class="sticker" src="./img/stickers/cat/cat2.webp">'
      )
      .replace(
        /#cat1.3/gi,
        '<img class="sticker" src="./img/stickers/cat/cat3.webp">'
      )
      .replace(
        /#cat1.4/gi,
        '<img class="sticker" src="./img/stickers/cat/cat4.webp">'
      )
      .replace(
        /#cat1.5/gi,
        '<img class="sticker" src="./img/stickers/cat/cat5.webp">'
      )
      .replace(
        /#cat1.6/gi,
        '<img class="sticker" src="./img/stickers/cat/cat6.webp">'
      )
      .replace(
        /#cat2.1/gi,
        '<img class="sticker" src="./img/stickers/cat2/cat1.webp">'
      )
      .replace(
        /#cat2.2/gi,
        '<img class="sticker" src="./img/stickers/cat2/cat2.webp">'
      )
      .replace(
        /#cat2.3/gi,
        '<img class="sticker" src="./img/stickers/cat2/cat3.webp">'
      )
      .replace(
        /#cat2.4/gi,
        '<img class="sticker" src="./img/stickers/cat2/cat4.webp">'
      )
      .replace(
        /#cat2.5/gi,
        '<img class="sticker" src="./img/stickers/cat2/cat5.webp">'
      )
      .replace(
        /#cat2.6/gi,
        '<img class="sticker" src="./img/stickers/cat2/cat6.webp">'
      )
      .replace(
        /#cat2.7/gi,
        '<img class="sticker" src="./img/stickers/cat2/cat7.webp">'
      )
      .replace(
        /#cat2.8/gi,
        '<img class="sticker" src="./img/stickers/cat2/cat8.webp">'
      )
      .replace(
        /#cat2.9/gi,
        '<img class="sticker" src="./img/stickers/cat2/cat9.webp">'
      )
      .replace(
        /#cat2.10/gi,
        '<img class="sticker" src="./img/stickers/cat2/cat10.webp">'
      )
      .replace(
        /#cat2.11/gi,
        '<img class="sticker" src="./img/stickers/cat2/cat11.webp">'
      );

    return output;
  };
  $.logcheck = function (input) {
    var output = input
      .replace(/<script[^>]*?>.*?<\/script>/gi, "#@$!*6")
      .replace(/<[\/\!]*?[^<>]*?>/gi, "&!2%=_^")
      .replace(/<![\s\S]*?--[ \t\n\r]*>/gi, "@#%&7^")
      .replace(/<style[^>]*?>.*?<\/style>/gi, "#^$!$&1")
      .replace(/\[img\](.*?)\[\/img\]/gi, "%37f@j")
      .replace(/\[a\](.*?)\[\/a\]/gi, "f*64$-");
    return output;
  };
})(jQuery);

document.getElementById("emoji_c").onpaste = function (e) {
  for (
    var t = (e.clipboardData || e.originalEvent.clipboardData).items,
      a = null,
      n = 0;
    n < t.length;
    n++
  )
    0 === t[n].type.indexOf("image") && (a = t[n].getAsFile());
  if (null !== a) {
    var l = new FileReader();
    (l.onload = function (e) {
      (document.getElementById("pastedImage").src = e.target.result),
        (document.getElementById("emoji_c").value =
          "[img]" + e.target.result + "[/img]");
    }),
      l.readAsDataURL(a);
  }
};

$(document).ready(function () {
  $("#pastedImage, #send").click(function () {
    $("img#pastedImage").removeAttr("src");
  });
}),
  (document.getElementById("pastedImage").onclick = function (e) {
    document.getElementById("emoji_c").value = "";
  });

// LOGIN
function login() {
  document.getElementById("step1").classList.toggle("oplog"),
    document.getElementById("step2").classList.toggle("cllog");
}

// TYPING
var goTyp = new Object(),
  inTypping = !1;
$("input#emoji_c").keypress(function () {
  clearInterval(goTyp),
    inTypping ||
      ((document.getElementById("status").innerHTML =
        '<img class="load" src="./img/loader.gif" alt="load">'),
      (inTypping = !0),
      window.scrollTo(0, document.body.scrollHeight)),
    inTypping &&
      (goTyp = setInterval(function () {
        (document.getElementById("status").innerHTML = ""),
          (inTypping = !1),
          clearInterval(goTyp);
      }, 1e3));
});

// SETTINGS
function op_set() {
  document.getElementById("set-i").classList.toggle("opn");
}

function es_toggle() {
  document.getElementById("es_togg").classList.toggle("vis");
}

// EMOJI
function emoji_alert() {
  document.getElementById("emoji_b").classList.toggle("vis");
}

// GIF BOX
function gif_box() {
  document.getElementById("gif_box").classList.toggle("open");
}

// EMOJI PARSE TO TEXT
function DoSmilie(addSmilie) {
  var revisedmsgage,
    currentmsgage = document.getElementById("emoji_c").value;
  revisedmsgage = currentmsgage + addSmilie;
  document.getElementById("emoji_c").value = revisedmsgage;
  document.getElementById("emoji_c").focus();
  return;
}

// GIF SEARCH
function giphyApiSearch(search) {
  var url,
    xmlHttp = new XMLHttpRequest();

  search = search.split(" ").join("+");
  url =
    "https://api.giphy.com/v1/gifs/search?q=" +
    search +
    "&api_key=ZfWEu6nQUFRyjGM9em6z8ons59Tv2qBc&limit=9";

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      addPics(xmlHttp.responseText);
  };
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}

function addPics(gif) {
  document.querySelector(".pic-container").innerHTML = "";
  gif = JSON.parse(gif);
  if (gif.data.length > 0) {
    for (var x = 0; x < gif.data.length; x++) {
      var el = document.createElement("img");
      el.setAttribute("id", "gifpasted");
      el.setAttribute("src", gif.data[x].images.original.url);
      el.setAttribute(
        "onclick",
        "gif_box();DoSmilie('[img]" +
          gif.data[x].images.original.url +
          "[/img]');"
      );
      document.querySelector(".pic-container").appendChild(el);
    }
  } else {
    document.querySelector(".error-container").innerHTML =
      "Không tìm thấy gì.<br>Hãy thử tìm kiếm cái khác!";
  }
}

function startGiphySearch(e) {
  e.preventDefault();
  var userSearch = document.querySelector("#gif-search-input").value;
  document.querySelector("#gif-search-input").value = "";
  document.querySelector(".error-container").innerHTML = "";
  giphyApiSearch(userSearch);
}

document
  .querySelector("#gif-search-form")
  .addEventListener("submit", function (e) {
    startGiphySearch(e);
  });

document.querySelector("#search-btn").addEventListener(
  "click",
  function (e) {
    startGiphySearch(e);
  },
  false
);

giphyApiSearch("cat");

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

// SET PHOTO
function photoEnter(event, value) {
  if (event.key === "Enter") {
    image = value;
    $(".chk").css("display", "none");
    localStorage.setItem("userphoto", image);
  }
}

//SEND
submit.onclick = function () {
  var tm = new Date();

  const messageHTML =
    '<div class="msb"><div onclick="DoSmilie(\'' +
    user +
    '\');" class="cover" style="background-image: url(' +
    image +
    ');"></div><div class="cover_n">' +
    user +
    "</div><span>" +
    user +
    "</span> <time>" +
    "Just now" +
    "</time><div>" +
    $.sanitize(input.value) +
    "</div></div>";
  wrap.innerHTML += messageHTML;

  socket.emit("username", user);
  socket.emit("chat message", input.value);
  socket.emit("userphoto", image);

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
    data.userphoto +
    ');"></div><div class="cover_n">' +
    data.username +
    "</div><span>" +
    data.username +
    "</span> <time>" +
    "Just now" +
    "</time><div>" +
    $.sanitize(data.message) +
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
          message.userphoto +
          ');"></div><div class="cover_n">' +
          message.username +
          "</div><span>" +
          message.username +
          "</span> <time>" +
          formatTimeAgo(message.createdAt) +
          "</time><div>" +
          $.sanitize(message.message) +
          "</div></div>";
        wrap.innerHTML += messageHTML;
      });
      window.scrollTo(0, document.body.scrollHeight);
    });
})();
