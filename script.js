const dog = document.getElementById("dog");
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

const lettre = "« Sanahilwa y’a Yanis sanahilwa y’a yanis sanahilwa sanahilwa sanahilwa y’a yanisssss »  (t’as intérêt à avoir chanté comme si c’était les chants de l’OM sinon jetée de bouteilles sur ton crâne). D’un « imagine t’es pas dz » à te souhaiter aujourd’hui un joyeux 20ème anniversaire. Ça fait maintenant 3 somptueuses années que j’ai la chance de passer à tes côtés et qu’Allah me permette de pouvoir te voir souffler de nombreuses bougies encore. Aujourd'hui, le 27 juin, est l'occasion rêvée pour te rappeler tous ces merveilleux éléments qui te constituent. D’un côté nous avons l’Eau, celle qui représente tous nos rires aux éclats, ces moments moins drôles où tu as su sortir les armes pour combattre mes larmes, mais aussi tu me rappelle l’Eau de par sa riche symbolique qui évoque le renouveau et la pureté. Mais tu me fais aussi penser au Feu par ta personnalité tout aussi brûlante d’ambitions que chaleureuse, et à la Terre par ton pouvoir de parvenir à fabriquer un bouclier indestructible en réussissant à réceptionner avec brio les épreuves qu’Allah souhaite te faire endurer. Et grâce à toute cette force qui je sais à été bâti grâce à une patience inestimable, je suis sûr que tu seras finalement emporter par le Vent comme Chihiro vers la destination que ton coeur réclame. Tant bien même que je ne partage pas ta vie depuis ta naissance, je continue d’être reconnaissante mainte fois de t’avoir connu lors de cette fameuse nuit de mars car ce jour là marqua l’arrivée d’une personne dont l’être ne me laissa plus jamais indifférente. Mon cher Yanis, je te souhaite toutes les richesses que ce monde a à offrir. Qu’Allah fasse que tu sois compté par les êtres qu’il affectionne et qu’il souhaite guider continuellement. Je te souhaite un mémorable anniversaire accompagné de deux grosses boussa sur tes deux joues.";

let currentDialogueIndex = 0;
let charIndex = 0;
const typingSpeed = 50; // Vitesse de saisie en ms par caractère

dog.style.marginRight = "calc(100% + 0px)";

// Jouer la vidéo du berger allemand
setTimeout(() => {
  dog.style.removeProperty("margin-right");
}, 500); // Délai pour commencer l'animation après le chargement

// Afficher le cadeau après l'animation du chien
dog.addEventListener("transitionend", () => {
  dog.src = "dog_sitting.png";
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
    dog.classList.add("fadeout_animation");
  }
}

nextBtn.addEventListener("click", showNextDialogue);

dog.addEventListener("animationend", () => {
  dog.style.display = "none";
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
  lettreContainer.classList.add("fadein_animation");
  lettreContainer.style.display = "initial";
  flecheBtn.classList.remove("fadein_animation");
  flecheBtn.classList.add("fadeout_animation");
  clearInterval(smokeGenerationInterval);
  flecheBtn.removeEventListener("click", showLettre);
  typeLettre();
}

// Ouvrir le cadeau
ouvrirBtn.addEventListener("click", openCadeau);