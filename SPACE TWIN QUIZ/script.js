// script.js - Quiz fully functional with varied results
const LOCALES = {
  en: {
    title: "Find your Space Twin",
    subtitle: "Fun & real astrobiology facts",
    welcomeTitle: "Choose language",
    welcomeSubtitle: "Pick a language to start the offline quiz",
    introTitle: "Quick guide → Your cosmic match in 4 questions!",
    introText: "Answer 4 fun questions and discover which planet shares your vibe + a cool space fact!",
    howTitle: "How to use",
    howList: [
      "Pick a language",
      "Answer 4 questions",
      "Meet your space twin"
    ],
    questions: [
      { q: "Do you prefer cold and calm places or warm and bright places?", a:["Cold & calm","Warm & bright"] },
      { q: "Are you more adventurous or more home-comfort oriented?", a:["Adventurous","Home comfort"] },
      { q: "Do you enjoy long quiet time alone or being surrounded by people?", a:["Quiet alone","With people"] },
      { q: "Do you like observing & thinking or acting & experimenting?", a:["Observe & think","Act & experiment"] }
    ],

  planets: {
    Earth:{
      name:"Earth 🌍",
      tag:"Balanced & social",
      text:"You’re Earth; warm, social and balanced.",
      fact:"Earth hosts life thanks to its liquid water and breathable atmosphere.",
      img:"earth.svg"
    },
    Mars:{
      name:"Mars 🔴",
      tag:"The explorer",
      text:"You’re Mars; tough and adventurous.",
      fact:"Once covered in liquid water, Mars might have hidden traces of microbial life.",
      img:"mars.svg"
    },
    Europa:{
      name:"Europa 🌊",
      tag:"Deep & calm",
      text:"You’re Europa; icy on the outside but mysterious underneath.",
      fact:"Europa is icy outside but may hide an ocean below, a possible home for life.",
      img:"europa.svg"
    },
    Enceladus:{
      name:"Enceladus 💦",
      tag:"Quiet but powerful",
      text:"You’re Enceladus; small but active.",
      fact:"Enceladus shoots water geysers containing organic molecules into space.",
      img:"enceladus.svg"
    },
    Titan:{
      name:"Titan 🌫️",
      tag:"Dreamy & odd",
      text:"You’re Titan; mysterious and unique.",
      fact:"Titan's methane lakes and dense atmosphere create a strange, unique world.",
      img:"titan.svg"
    },
    Kepler:{
      name:"Kepler-452b ✨",
      tag:"Distant ‘what if’",
      text:"You’re Kepler-452b; a distant exoplanet.",
      fact:"Kepler-452b is a distant candidate for life, in its star's habitable zone.",
      img:"kepler.svg"
    }
  },
    btnStart: "Start the quiz",
    btnBack: "Back",
    btnPlayAgain: "Play again",
    btnHome: "Home",
    quit: "Quit"
  },
  fr: {
    title: "Trouve ta planète jumelle",
    subtitle: "Amusant + infos réelles d'astrobiologie",
    welcomeTitle: "Choisis la langue",
    welcomeSubtitle: "Choisis une langue pour commencer le quiz hors-ligne",
    introTitle: "Guide rapide",
    introText: "Guide rapide → Ton double spatial en 4 questions !",
    howTitle: "Comment utiliser",
    howList: [
      "Choisis une langue",
      "Réponds à 4 questions",
      "Découvre ton double spatial"
    ],
  questions: [
    { q: "Quel type d'environnement te correspond le mieux ?", 
      a:["J’aime le calme et la fraîcheur","Je préfère la chaleur et la lumière"] 
    },
    { q: "Comment décrirais-tu ton esprit ?", 
      a:["Toujours partant·e pour l’aventure","Je préfère mon cocon tranquille"] 
    },
    { q: "Comment aimes‑tu passer ton temps libre ?", 
      a:["J’adore mes moments seul·e","J’aime être entouré·e"] 
    },
    { q: "Quelle approche préfères‑tu ?", 
      a:["J’observe et je réfléchis","J’agis et j’expérimente"] 
    }
  ],
planets: {
    Earth:{
      name:"Terre 🌍",
      tag:"Équilibré·e & social·e",
      text:"Tu es la Terre; chaleureuse, sociale et équilibrée.",
      fact:"La Terre abrite la vie grâce à son eau liquide et son atmosphère respirable.",
      img:"earth.svg"
    },
    Mars:{
      name:"Mars 🔴",
      tag:"L'explorateur",
      text:"Tu es Mars; dur et plein de défis.",
      fact:"Autrefois couverte d’eau liquide, Mars pourrait avoir caché des traces de vie microbienne.",
      img:"mars.svg"
    },
    Europa:{
      name:"Europe 🌊",
      tag:"Profond & calme",
      text:"Tu es Europe; glacée en surface mais mystérieuse en dessous.",
      fact:"Europe est glacée mais pourrait cacher un océan sous sa surface, un refuge pour la vie.",
      img:"europa.svg"
    },
    Enceladus:{
      name:"Encelade 💦",
      tag:"Discret mais puissant",
      text:"Tu es Encelade; petit mais actif.",
      fact:"Encelade projette des geysers d’eau contenant des molécules organiques dans l’espace.",
      img:"enceladus.svg"
    },
    Titan:{
      name:"Titan 🌫️",
      tag:"Rêveur & étrange",
      text:"Tu es Titan; mystérieux et différent.",
      fact:"Les lacs de méthane et la dense atmosphère de Titan créent un monde unique et étrange.",
      img:"titan.svg"
    },
    Kepler:{
      name:"Kepler-452b ✨",
      tag:"Lointain 'et si'",
      text:"Tu es Kepler-452b — une exoplanète lointaine.",
      fact:"Kepler-452b est un candidat à la vie, dans la zone habitable de son étoile.",
      img:"kepler.svg"
    }
  },
    btnStart: "Commencer le quiz",
    btnBack: "Retour",
    btnPlayAgain: "Rejouer",
    btnHome: "Accueil",
    quit: "Quitter"
  }
};

let lang = 'en';
let answers = [];
let qIndex = 0;

// Weights for each planet per question per choice
const WEIGHTS = [
  {Earth:[1,1], Mars:[0,2], Europa:[2,0], Enceladus:[2,0], Titan:[1,1], Kepler:[0,1]},
  {Earth:[1,1], Mars:[1,3], Europa:[0,1], Enceladus:[1,2], Titan:[0,2], Kepler:[2,1]},
  {Earth:[1,1], Mars:[1,2], Europa:[2,3], Enceladus:[2,1], Titan:[1,2], Kepler:[0,1]},
  {Earth:[1,2], Mars:[2,3], Europa:[2,2], Enceladus:[1,2], Titan:[1,3], Kepler:[1,2]}
];

function $(id){ return document.getElementById(id); }

function showScreen(id){
  ['screenLang','screenIntro','screenQuiz','screenResult'].forEach(s=>{
    const el = $(s);
    if(!el) return;
    el.style.display = (s===id) ? 'block' : 'none';
  });
  window.scrollTo(0,0);
}

function setLanguage(l){
  lang = l;
  const L = LOCALES[l];
  $('appTitle').textContent = L.title;
  $('appSub').textContent = L.subtitle;
  $('langTitle').textContent = L.welcomeTitle;
  $('screenIntro').querySelector('#introTitle').textContent = L.introTitle;
  $('screenIntro').querySelector('#introText').textContent = L.introText;

  const howList = $('howList');
  howList.innerHTML = '';
  L.howList.forEach(li=>{
    const item = document.createElement('li'); item.textContent = li; howList.appendChild(item);
  });

  $('startQuizBtn').textContent = L.btnStart;
  $('backLangBtn').textContent = L.btnBack;
  $('replayBtn').textContent = L.btnPlayAgain;
  $('homeBtn').textContent = L.btnHome;
  $('quitBtn').textContent = L.quit;

  renderQuestion();
  showScreen('screenIntro');
}

function startQuiz(){
  answers = [];
  qIndex = 0;
  showScreen('screenQuiz');
  renderQuestion();
}

function renderQuestion(){
  const L = LOCALES[lang];
  if(qIndex >= L.questions.length){
    computeResult();
    return;
  }
  const q = L.questions[qIndex];
  $('questionBox').textContent = q.q;
  $('progBar').style.width = Math.round((qIndex / L.questions.length) * 100) + '%';

  const answersBox = $('answersBox');
  answersBox.innerHTML = '';
  q.a.forEach((ans, idx)=>{
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = ans;
    btn.onclick = ()=> recordAnswer(idx);
    answersBox.appendChild(btn);
  });
}

function recordAnswer(choiceIdx){
  answers.push(choiceIdx);
  qIndex++;
  if(qIndex < LOCALES[lang].questions.length){
    renderQuestion();
  } else {
    computeResult();
  }
}

function computeResult(){
  const scores = {Earth:0,Mars:0,Europa:0,Enceladus:0,Titan:0,Kepler:0};
  for(let i=0;i<answers.length;i++){
    const choice = answers[i];
    for(const p in scores){
      scores[p] += WEIGHTS[i][p][choice];
    }
  }

  // Find top score, random tie breaker
  let maxScore = Math.max(...Object.values(scores));
  const topPlanets = Object.keys(scores).filter(p=>scores[p]===maxScore);
  const top = topPlanets[Math.floor(Math.random()*topPlanets.length)];
  displayPlanet(top);
}

function displayPlanet(key){
  const L = LOCALES[lang];
  const p = L.planets[key];
  $('resultImage').src = 'src/' + p.img;
  $('resultImage').alt = p.name;
  $('resultName').textContent = p.name;
  $('resultTag').textContent = p.tag;
  $('resultText').textContent = p.text;
  $('factText').textContent = (lang==='en' ? 'Scientific snapshot: ' : 'Fait scientifique : ') + p.fact;

  showScreen('screenResult');

  const card = $('resultCard');
  card.classList.remove('fade-in');
  void card.offsetWidth;
  card.classList.add('fade-in');
}

window.addEventListener('load', ()=>{
  $('btnEn').addEventListener('click', ()=> setLanguage('en'));
  $('btnFr').addEventListener('click', ()=> setLanguage('fr'));
  $('startQuizBtn').addEventListener('click', ()=> startQuiz());
  $('backLangBtn').addEventListener('click', ()=> showScreen('screenLang'));
  $('replayBtn').addEventListener('click', ()=> startQuiz());
  $('homeBtn').addEventListener('click', ()=> showScreen('screenLang'));
  $('quitBtn').addEventListener('click', ()=> showScreen('screenLang'));
});
