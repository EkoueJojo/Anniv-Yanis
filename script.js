const dog_walking = document.getElementById("dog_walking");
const dog_sitting = document.getElementById("dog_sitting");
const dialogContainer = document.getElementById("dialogue-container");
const dialogueText = document.getElementById("dialogue-text");
const nextBtn = document.getElementById("next-btn");
const animationContainer = document.getElementById("animation-container");
const cadeauContainer = document.getElementById("cadeau-container");
const cadeau = document.getElementById("cadeau");
const gateau = document.getElementById("gateau");
const ouvrirBtn = document.getElementById("ouvrir-btn");
const lettreContainer = document.getElementById("lettre-container");
const smokeContainer = document.getElementById("smokeContainer");
const flecheBtn = document.getElementById("fleche");
const textanniversaire = document.getElementById("texte-anniversaire");
const plume = document.getElementById("plume");

const SMOKE_FRAME_COUNT = 7;
const SMOKE_FRAME_DURATION = 100;
const SMOKE_GENERATION_INTERVAL = 250;
const SMOKE_ANIMATION_INTERVAL = 50;
const SMOKE_MOVE_SPEED = 2;
const SMOKE_GENERATION_RATIO = 2;
const SMOKE_FRAME_CHANGE_RATIO = 5;
const SMOKE_MAX_BRIGHTNESS = 3 / 4;
const SMOKE_MAX_X_POSITION = 70;

let smokeGenerationInterval;
let smokeAnimationInterval;

const dialogues = [
  "Bonjour, c'est un dialogue d'exemple.",
  "Voici la deuxième ligne du dialogue.",
  "Et voici la troisième ligne du dialogue.",
];

const lettre = "Ton texte d'anniversaire ici...";

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
  dialogContainer.style.display = "flex";
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

function typeLettre() {
  if (charIndex < lettre.length) {
    textanniversaire.textContent += lettre.charAt(charIndex);
    charIndex++;
    setTimeout(typeLettre, typingSpeed);
  }
  else {
    plume.style.opacity = "1";
    plume.classList.add("fadein_animation")
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
    dog_sitting.classList.add("fadeout_animation");
  }
}

nextBtn.addEventListener("click", showNextDialogue);

dog_sitting.addEventListener("animationend", () => {
  dog_sitting.style.display = "none";
  cadeauContainer.style.display = "flex";
  cadeauContainer.classList.add("fadein_animation");
});

cadeauContainer.addEventListener("animationend", () => {
  cadeau.classList.add("cadeau_shake_animation");
});

let iteration = 0;
cadeau.addEventListener("animationiteration", () => {
  if(iteration == 3){
    ouvrirBtn.style.opacity = "1";
    ouvrirBtn.disabled = false;
  }
  else{
    iteration++;
  }
});

function openCadeau()
{
  cadeau.style.display = "none";
  gateau.style.display = "initial";
  gateau.classList.add("fadein_animation");
  balloons.style.visibility = "visible";
  balloons.style.animation = "balloons 15s 1";
  animationContainer.style.backgroundImage = "initial";
  animationContainer.style.backgroundColor = "#E1E5CD";
  animationContainer.classList.add("fadein_animation");
  ouvrirBtn.innerText = "Faire un vœu";
  ouvrirBtn.removeEventListener("click", openCadeau);
  ouvrirBtn.addEventListener("click", eteindreBougie);
}

function eteindreBougie()
{
  ouvrirBtn.classList.add("fadeout_animation");
  ouvrirBtn.style.opacity = "0";
  gateau.src = "gateauEteint.png";
  flecheBtn.classList.add("fadein_animation");
  flecheBtn.style.display = "initial";
  flecheBtn.addEventListener("click", showLettre);

  smokeGenerationInterval = setInterval
  (
    () =>
    {
      if (Math.floor(Math.random() * SMOKE_GENERATION_RATIO) == 0)
      {
        let smokeImage = document.createElement("img");
        smokeImage.className = "smoke";
        smokeImage.src = `smoke${SMOKE_FRAME_COUNT}.png`;
        smokeImage.style.filter = `brightness(${Math.random() * SMOKE_MAX_BRIGHTNESS})`;
        smokeImage.style.bottom = "0";
        smokeImage.style.left = `${Math.floor(Math.random() * 2 * SMOKE_MAX_X_POSITION) - SMOKE_MAX_X_POSITION}px`;
        smokeContainer.appendChild(smokeImage);
      }
    },
    SMOKE_GENERATION_INTERVAL
  );

  smokeAnimationInterval = setInterval
  (
    () =>
    {
      for (let smokeImage of document.getElementsByClassName("smoke"))
      {
        let frameNumber = parseInt(smokeImage.src[smokeImage.src.indexOf("smoke") + 5]);

        smokeImage.style.bottom = `${parseInt(smokeImage.style.bottom.slice(0, -2)) + SMOKE_MOVE_SPEED}px`;

        if (Math.floor(Math.random() * SMOKE_FRAME_CHANGE_RATIO) == 0)
        {
          if (frameNumber == 1)
          {
            smokeImage.remove();
          }
          else
          {
            smokeImage.src = `smoke${frameNumber - 1}.png`;
          }
        }
      }
    },
    SMOKE_ANIMATION_INTERVAL
  );
}

function showLettre()
{
  clearInterval(smokeGenerationInterval);

  lettreContainer.classList.add("fadein_animation");
  lettreContainer.style.display = "initial";
  flecheBtn.classList.remove("fadein_animation");
  flecheBtn.classList.add("fadeout_animation");
  flecheBtn.removeEventListener("click", showLettre);
  typeLettre();
}

// Ouvrir le cadeau
ouvrirBtn.addEventListener("click", openCadeau);