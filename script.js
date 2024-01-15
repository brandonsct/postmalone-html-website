//SO CHIN TING 1155156676

// FOR SUBSCRIBE BOX
function subscribe() {
  alert("Thanks for subscribing!");
  removeParent();
}
function removeParent() {
  document.getElementById("upper_sticky").parentElement.remove();
}

//FOR TOGGLE SOCIAL MEDIA BOX
let clickToggle = 0;
function removeElementid() {
  if (clickToggle % 2 == 0) {
    document.getElementById("toggle").parentElement.style.left = "0px";
  } else {
    document.getElementById("toggle").parentElement.style.left = "-62px";
  }
  clickToggle++;
}

//task 1 change only text in columns
let cycle = ["text-start", "text-center", "text-end"];
function alignText() {
  const firstElement = cycle.shift();

  document.getElementById("concert").className = firstElement;
  console.log("this turn is", firstElement);
  cycle.push(firstElement);
  console.log("cycle", cycle);
}

//task 2
function spotLight() {
  let newInput = prompt("Post malone accomplishment", "Grammy award");
  if (newInput != "") {
    let spotLightSection = document.getElementById("spotListReal");
    let newParagraph = document.createElement("li");
    newParagraph.innerHTML = newInput;
    spotLightSection.appendChild(newParagraph);
  }
}

//task3
// progress bar
let viewportHeight = window.innerHeight;
window.onscroll = function () {
  var htmlElement = document.documentElement;
  var bodyElement = document.body;
  var docHeight = Math.max(
    htmlElement.clientHeight,
    htmlElement.scrollHeight,
    htmlElement.offsetHeight,
    bodyElement.scrollHeight,
    bodyElement.offsetHeight
  );
  let percentScroll = (scrollY / (docHeight - viewportHeight)) * 100;

  percentScroll = Math.trunc(Math.round(percentScroll));
  $("#progress-bar")
    .width(`${percentScroll}%`)
    .attr("aria-valuenow", percentScroll)
    .text(`${percentScroll}%`);
};

let countShow = 0;
function showProgress() {
  console.log("show progress", countShow);
  countShow++;

  if (countShow % 2 == 0) {
    document.getElementById("progressBar").style.display = "none";
  } else {
    document.getElementById("progressBar").style.display = "block";
  }
}

//comment box
function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

// 4 submit comment  &  5 form validation
async function processform() {
  try {
    let email = document.getElementById("new-email").value;
    let comment = document.getElementById("new-comment").value;
    let color = document.querySelector("input[name=new-color]:checked").value;

    if (comment.length < 1) {
      alert("Please enter a comment");
      return;
    }
    if (color.length < 1) {
      alert("Please select a color");
      return;
    }
    if (email.length < 1) {
      alert("Please enter an email");
      return;
    }

    console.log("email", email);
    console.log("comment", comment);
    console.log("color", color);

    validateEmail(email);
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    let target = document.getElementById("comments");
    let newComment = document.createElement("div");
    target.appendChild(newComment);
    let element = `<div><svg height="100" width="100"><circle cx="50" cy="50" r="40" fill="${color}"></svg></div><div><h5></h5><p></p></div>`;
    newComment.innerHTML = element;
    newComment.className = "d-flex";
    newComment.querySelectorAll("div")[0].className = "flex-shrink-0";
    newComment.querySelectorAll("div")[1].className = "flex-grow-1";
    let lastComment = document.querySelector("#comments").lastElementChild;
    newComment.id = "c" + (Number(lastComment.id.substr(1)) + 1);
    newComment.querySelector("h5").innerHTML =
      document.querySelector("#new-email").value;
    newComment.querySelector("p").innerHTML =
      document.querySelector("#new-comment").value;
    newComment.querySelector("circle").setAttribute("fill", color);
    document.querySelector("#comments").appendChild(newComment);
    document.querySelector("form").reset();
    console.log("button is clicked");
    let existingData = [];
    console.log("this si the declaration", existingData);

    // 6 load comments from json via get api
    existingData = await getData(existingData);
    existingData.push({ email: email, comment: comment, color: color });

    console.log("this si the current", existingData);

    //6 save comments to json via put api
    await fetch("http://127.0.0.1:8080/comment.json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(existingData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("JSON file updated successfully.");
        } else {
          console.log("Failed to update JSON file.");
        }
      })
      .catch((error) => {
        console.log("Error occurred while updating JSON file:", error);
      });

    const text = "textInput.value"; // to retrieve the value, i.e., a string, in the HTML element
  } catch (err) {
    console.log(err);
    alert("Make sure enter all the information");
  }
}
//RETRIEVE EXISTING COMMENTS WITH GET API
async function getData(existingData) {
  await fetch("http://127.0.0.1:8080/comment.json", {
    method: "GET",
  })
    .then((result) => result.json())
    .then((result) => {
      console.log("this is get11", result);
      existingData = result;
      console.log("this is data", existingData);
    })
    .then(() => {
      console.log("this is now", existingData);
      console.log("i ma here");
    })
    .catch((err) => console.log(err));
  return existingData;
}
//LOAD DATA TO PAGE WHEN PAGE IS LOADED
window.onload = async function () {
  try {
    fetch("http://127.0.0.1:8080/comment.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((data) => {
        for (i = 0; i < data.length; i++) {
          let comment = data[i];
          console.log(comment);
          let email = comment.email;
          let commentText = comment.comment;
          let color = comment.color;
          makeNewComment(email, commentText, color);
        }
      });
  } catch {
    console.log(err);
  }
};

//CREATE NEW COMMENT AJAX
async function makeNewComment(email, comment, color) {
  let target = document.getElementById("comments");
  let newComment = document.createElement("div");
  target.appendChild(newComment);
  let element = `<div><svg height="100" width="100"><circle cx="50" cy="50" r="40" fill="${color}"></svg></div><div><h5></h5><p></p></div>`;
  newComment.innerHTML = element;
  newComment.className = "d-flex";
  newComment.querySelectorAll("div")[0].className = "flex-shrink-0";
  newComment.querySelectorAll("div")[1].className = "flex-grow-1";
  let lastComment = document.querySelector("#comments").lastElementChild;
  newComment.id = "c" + (Number(lastComment.id.substr(1)) + 1);
  newComment.querySelector("h5").innerHTML = email;
  newComment.querySelector("p").innerHTML = comment;
  newComment.querySelector("circle").setAttribute("fill", color);
  document.querySelector("#comments").appendChild(newComment);
  document.querySelector("form").reset();
  console.log("button is clicked");
}
