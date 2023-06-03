const user = {
  name: getRandomName(),
};
const drone = new ScaleDrone("6q0D78bDQzB4XHAp", { data: user });
drone.on("open", (error) => {
  if (error) {
    alert("Stranica se ne može učitati");
    return console.error(error);
  }
  const room = drone.subscribe("observable-room");
  room.on("open", (error) => {
    if (error) {
      alert("Greška!");
      return console.error(error);
    }
  });
  room.on("data", (text, member) => {
    if (member) {
      showMessage(text, member.clientData.name);
    }
  });
});function getRandomName() {
  const names = [
    "Ana", "Boris", "Cvita", "Dino", "Ena", "Filip", "Goga", "Hrvoje",
    "Iva", "Jakov", "Kristina", "Luka", "Marija", "Nino"

  ];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}
const username = getRandomName();
alert("Dobrodošli, " + user.name + "!");
const chatWindow = document.querySelector(".chatWindow");
const InputText = document.getElementById("inputText");
const button = document.getElementById("button");

const showMessage = (text, sender) => {
  const messageDiv = document.createElement("div");
  messageDiv.textContent = sender + ":" + text;
  messageDiv.classList.add("chatText");
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;

};

const addMessage = (event) => {
  event.preventDefault();

const message = InputText.value.trim();
  if (message !== "") {
    drone.publish({
      room: "observable-room",
      message: InputText.value,
    });
    InputText.value = "";
  } 
  else {
    console.log(
      "Inače pričljiv osta sam bez teksta... Ne možete poslati praznu poruku!"
    );
  }
};
 
button.addEventListener("click", addMessage);
InputText.addEventListener("onkeypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addMessage();
  }
});