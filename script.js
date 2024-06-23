const dog_walking = document.getElementById("dog_walking");
const dog_sitting = document.getElementById("dog_sitting");
const dialogContainer = document.getElementById("dialogue-container");
const dialogueText = document.getElementById("dialogue-text");
const nextBtn = document.getElementById("next-btn");
const cadeauContainer = document.getElementById("cadeau-container");
const cadeau = document.getElementById("cadeau");
const ouvrirBtn = document.getElementById("ouvrir-btn");
const lettreContainer = document.getElementById("lettre-container");
const flecheBtn = document.getElementById("fleche-btn");

const dialogues = [
  "Bonjour, c'est un dialogue d'exemple.",
  "Voici la deuxième ligne du dialogue.",
  "Et voici la troisième ligne du dialogue.",
];

let currentDialogueIndex = 0;
let charIndex = 0;
const typingSpeed = 50; // Vitesse de saisie en ms par caractère

// Jouer la vidéo du berger allemand
setTimeout(() => {
  dog_walking.style.left = "40%";
}, 500); // Délai pour commencer l'animation après le chargement

// Afficher le cadeau après l'animation du chien
dog_walking.addEventListener("transitionend", () => {
  dog_walking.style.display = "none";
  dog_sitting.style.display = "block";
  dialogContainer.style.display = "block";
  typeDialogue();
});

function typeDialogue() {
  if (charIndex < dialogues[currentDialogueIndex].length) {
    dialogueText.textContent +=
      dialogues[currentDialogueIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeDialogue, typingSpeed);
  } else {
    nextBtn.disabled = false; // Réactiver le bouton une fois le texte terminé
  }
}

function showNextDialogue() {
  nextBtn.disabled = true; // Désactiver le bouton pendant la saisie
  dialogueText.textContent = ""; // Réinitialiser le texte de la bulle
  charIndex = 0;
  currentDialogueIndex++;
  if (currentDialogueIndex < dialogues.length) {
    typeDialogue();
  } else {
    // alert("Fin du dialogue");
    currentDialogueIndex = 0; // Réinitialiser l'index si tu veux boucler
    // typeDialogue();
    dialogContainer.style.display = "none";
    dog_sitting.classList.add("dog_fading_animation");
  }
}

nextBtn.addEventListener("click", showNextDialogue);

dog_sitting.addEventListener("animationend", () => {
  dog_sitting.style.display = "none";
  cadeauContainer.style.display = "block";
  cadeauContainer.classList.add("cadeau_fading_animation");
});

cadeauContainer.addEventListener("animationend", () => {
  cadeau.classList.add("cadeau_shake_animation");
});

cadeau.addEventListener("animationend", () => {
  ouvrirBtn.style.display = "block";
});

// Ouvrir le cadeau
ouvrirBtn.addEventListener("click", () => {
  // cadeauContainer.style.display = "none";
  // lettreContainer.style.display = "block";
  // cadeauContainer.classList.remove("cadeau_fading_animation");
  // cadeau.classList.add("cadeau_shake_animation");
});

// Bouton pour défiler la lettre
flecheBtn.addEventListener("click", () => {
  alert(
    "Lettre défilée (tu peux ajouter du code ici pour faire défiler la lettre)"
  );
});
