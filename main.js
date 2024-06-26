const userName = document.getElementById("name");
const userMail = document.getElementById("mail");
const userMessage = document.getElementById("message");
const userList = document.getElementById("userList");
const errorMessage = document.getElementById("error");

// Check User List exists
if (!localStorage.userList) {
  localStorage.setItem("userList", JSON.stringify([]));
} else {
  let users = JSON.parse(localStorage.userList);
  users.forEach((element) => {
    addUserToDOM(element);
  });
}

// On click button save user
document.getElementById("submitBtn").addEventListener("click", addUserToLocal);

function addUserToLocal(event) {
  event.preventDefault();
  // Check all inputs
  if (!userName.value || !userMail.value || !userMessage.value) {
    errorMessage.innerHTML = "Falta un valor!";
    return;
  }

  errorMessage.innerHTML = "";

  let user = {
    userName: userName.value,
    userMail: userMail.value,
    userMessage: userMessage.value,
  };

  let users = JSON.parse(localStorage.userList);
  users.push(user);
  localStorage.userList = JSON.stringify(users);
  addUserToDOM(user);

  userName.value = "";
  userMail.value = "";
  userMessage.value = "";
}

function addUserToDOM(user) {
  let card = document.createElement("div");
  card.classList.add("user-card");

  card.innerHTML =
    `<p>Nombre: ${user.userName}</p>` +
    `<p>Correo: ${user.userMail}</p>` +
    `<p>Mensaje: ${user.userMessage}</p>`;

  userList.appendChild(card);
}

document.getElementById("deleteBtn").addEventListener("click", emptyUserList);

function emptyUserList(event) {
  event.preventDefault();
  localStorage.setItem("userList", JSON.stringify([]));
  userList.innerHTML = "";
}
