const $ = (id) => document.getElementById(id);

$("makeWish").addEventListener("click", () => {
  const sender = $("sender").value.trim();
  const receiver = $("receiver").value.trim();
  const style = $("wishStyle").value;
  const messages = {
    warm: `May this Diwali fill ${receiver || "your home"} with peace, your heart with love and your days with endless happiness.`,
    fun: `Hey ${receiver || "there"}! May your Diwali sparkle brighter than a sky full of stars. Eat sweets, share smiles and have a super-fun celebration!`,
    traditional: `Wishing ${receiver || "you and your family"} a Shubh Deepawali. May the light of the diyas bring prosperity, peace and joy to your home.`
  };
  $("wishMessage").textContent = messages[style];
  $("wishFrom").textContent = sender ? `With best wishes, ${sender}` : "With love, from VSR DIWALI";
  $("wishCard").classList.remove("card-pop");
  void $("wishCard").offsetWidth;
  $("wishCard").classList.add("card-pop");
});

const questions = [
  {q:"What is Diwali also known as?",a:["Festival of Lights","Festival of Colours","Harvest Festival","Festival of Kites"],correct:0,why:"Diwali is popularly known as the Festival of Lights."},
  {q:"In a popular tradition, whose return to Ayodhya is celebrated?",a:["Lord Krishna","Lord Rama","Lord Ganesha","Lord Hanuman"],correct:1,why:"Many people celebrate Lord Rama's return to Ayodhya with Sita and Lakshmana."},
  {q:"What do people traditionally light during Diwali?",a:["Lantern fish","Diyas","Snow lamps","Paper boats"],correct:1,why:"Diyas are lit as a symbol of light, hope and positivity."},
  {q:"Which message does Diwali remind us of?",a:["Good over evil","Never help anyone","Keep all joy to yourself","Avoid meeting family"],correct:0,why:"Diwali reminds us of the victory of good over evil and light over darkness."}
];
let current = 0, score = 0, selected = null, locked = false;
function renderQuestion(){
  const q=questions[current]; selected=null; locked=false;
  $("questionCount").textContent=`QUESTION ${current+1} OF ${questions.length}`;
  $("progressBar").style.width=`${(current+1)/questions.length*100}%`;
  $("questionText").textContent=q.q;
  $("quizFeedback").textContent="Choose your answer to continue.";
  $("nextQuestion").disabled=true;
  $("nextQuestion").textContent=current===questions.length-1?"See my score →":"Next question →";
  $("answers").innerHTML="";
  q.a.forEach((answer,index)=>{
    const btn=document.createElement("button");btn.className="answer";btn.textContent=answer;
    btn.addEventListener("click",()=>chooseAnswer(index,btn));$("answers").appendChild(btn);
  });
}
function chooseAnswer(index,btn){
  if(locked)return;locked=true;selected=index;
  const q=questions[current];const all=[...$("answers").children];
  all.forEach((el,i)=>{el.disabled=true;if(i===q.correct)el.classList.add("correct");});
  if(index===q.correct){score++;$("quizFeedback").textContent="Correct! "+q.why;}
  else{$("quizFeedback").textContent="Good try! "+q.why;btn.classList.add("wrong");}
  $("nextQuestion").disabled=false;
}
$("nextQuestion").addEventListener("click",()=>{
  if(!locked)return;
  if(current<questions.length-1){current++;renderQuestion();}
  else{
    $("questionCount").textContent="QUIZ COMPLETE";
    $("questionText").textContent=`You scored ${score} out of ${questions.length}!`;
    $("answers").innerHTML=`<div class="answer correct" style="grid-column:1/-1;text-align:center"> ${score===4?"Amazing! You are a Diwali star!":"Well done! Keep learning and keep shining! "} ✨</div>`;
    $("quizFeedback").textContent="Thanks for playing the VSR DIWALI quiz.";
    $("nextQuestion").textContent="Play again ↻";$("nextQuestion").disabled=false;
    $("nextQuestion").onclick=()=>{current=0;score=0;$("nextQuestion").onclick=null;renderQuestion();};
  }
});
renderQuestion();


const teddyMessages = [
  "Namaste! VSR DIWALI mein aapka swagat hai! 🪔",
  "Aapne apne friends ko Happy Diwali wish kiya? 💌",
  "Diwali ko Festival of Lights bhi kehte hain! ✨",
  "Chalo Quiz khelte hain! Dekhte hain kitna jaante ho! 😄",
  "Mithai share karo aur smiles spread karo! 🍬",
  "Aapko Diwali mein sabse zyada kya pasand hai? 🧸",
  "Is Diwali kisi ki help zaroor karna! ❤️"
];

let teddyIndex = 0;

const teddy = document.querySelector(".teddy");
const teddySpeech = document.querySelector(".teddy-speech");

function teddyTalk() {
  teddyIndex = (teddyIndex + 1) % teddyMessages.length;
  teddySpeech.textContent = teddyMessages[teddyIndex];
}

if (teddy && teddySpeech) {
  teddy.addEventListener("click", teddyTalk);

  setInterval(teddyTalk, 9000);
}

// RANDOM HINGLISH DIWALI QUIZ

const questionBank = [
  {
    q: "Diwali ko aur kis naam se jaana jaata hai?",
    a: ["Festival of Lights", "Festival of Rain", "Sports Day", "Holi"],
    correct: 0
  },
  {
    q: "Shri Ram ji kitne saal baad Ayodhya laute the?",
    a: ["10 saal", "12 saal", "14 saal", "16 saal"],
    correct: 2
  },
  {
    q: "Diwali par ghar mein kya jalate hain?",
    a: ["Diyas", "Football", "Books", "Paper boat"],
    correct: 0
  },
  {
    q: "Diwali humein kya sikhati hai?",
    a: [
      "Achhaai ki jeet",
      "Ladai karna",
      "Gussa karna",
      "Safai na karna"
    ],
    correct: 0
  },
  {
    q: "Diwali par ghar ko kis se sajate hain?",
    a: ["Rangoli aur lights", "Shoes", "Bags", "Books"],
    correct: 0
  },
  {
    q: "Diwali par log kya share karte hain?",
    a: ["Mithai aur wishes", "Homework", "Exams", "Raincoat"],
    correct: 0
  },
  {
    q: "Diwali par kaunsi sweet popular hai?",
    a: ["Laddoo", "Noodles", "Sandwich", "Popcorn"],
    correct: 0
  },
  {
    q: "Diya kis cheez ka symbol hai?",
    a: ["Roshni aur umeed", "Andhera", "Gussa", "Traffic"],
    correct: 0
  }
];

let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let quizLocked = false;

function startQuiz() {
  quizQuestions = [...questionBank]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  quizIndex = 0;
  quizScore = 0;
  showQuestion();
}

function showQuestion() {
  const q = quizQuestions[quizIndex];

  quizLocked = false;

  document.getElementById("questionCount").textContent =
    `QUESTION ${quizIndex + 1} OF 4`;

  document.getElementById("questionText").textContent = q.q;

  document.getElementById("progressBar").style.width =
    `${((quizIndex + 1) / 4) * 100}%`;

  document.getElementById("quizFeedback").textContent =
    "Apna answer choose karo!";

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.a.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer";
    button.textContent = answer;

    button.onclick = () => checkAnswer(index, button);

    answers.appendChild(button);
  });

  const next = document.getElementById("nextQuestion");
  next.disabled = true;
  next.textContent = quizIndex === 3
    ? "Score dekho →"
    : "Next Question →";
}

function checkAnswer(index, button) {
  if (quizLocked) return;

  quizLocked = true;

  const q = quizQuestions[quizIndex];
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;

    if (i === q.correct) {
      btn.classList.add("correct");
    }
  });

  if (index === q.correct) {
    quizScore++;
    document.getElementById("quizFeedback").textContent =
      "Bilkul sahi! 🎉";
  } else {
    button.classList.add("wrong");

    document.getElementById("quizFeedback").textContent =
      "Oops! Koi baat nahi, correct answer green hai. 😊";
  }

  document.getElementById("nextQuestion").disabled = false;
}

document.getElementById("nextQuestion").onclick = () => {
  if (!quizLocked) return;

  if (quizIndex < 3) {
    quizIndex++;
    showQuestion();
  } else {
    document.getElementById("questionText").textContent =
      `Tumhara Score: ${quizScore}/4 🎉`;

    document.getElementById("answers").innerHTML =
      `<div class="answer correct">
        ${quizScore === 4
          ? "Waah! Diwali Champion! 🏆"
          : "Bahut badhiya! Phir se try karo! ✨"}
      </div>`;

    document.getElementById("quizFeedback").textContent =
      "Naye questions ke liye dobara khelo!";

    const next = document.getElementById("nextQuestion");
    next.textContent = "Play Again ↻";
    next.onclick = startQuiz;
  }
};

startQuiz();


/* VSR DIWALI - RANDOM HINGLISH QUIZ */

const diwaliQuestions = [
  {
    q: "Diwali ko kis naam se bhi jaana jaata hai?",
    a: ["Festival of Lights", "Festival of Food", "Festival of Water", "Festival of Colours"],
    correct: 0
  },
  {
    q: "Diwali par log apne ghar mein kya jalate hain?",
    a: ["Candles aur Diye", "Torch", "Street Light", "Flashlight"],
    correct: 0
  },
  {
    q: "Diwali par kis Devi ki pooja ki jaati hai?",
    a: ["Saraswati Ji", "Lakshmi Ji", "Durga Ji", "Parvati Ji"],
    correct: 1
  },
  {
    q: "Diwali kis baat ki jeet ka prateek hai?",
    a: ["Andhere par roshni", "Garmi par sardi", "Paani par hawa", "Raat par din"],
    correct: 0
  },
  {
    q: "Bhagwan Ram kitne saal ke vanvaas ke baad Ayodhya laute the?",
    a: ["10 saal", "12 saal", "14 saal", "16 saal"],
    correct: 2
  },
  {
    q: "Diwali par ghar ko kis cheez se sajaya jaata hai?",
    a: ["Rangoli", "Patthar", "Ret", "Mitti"],
    correct: 0
  },
  {
    q: "Diwali ke aas-paas kaunsa festival aata hai?",
    a: ["Holi", "Govardhan Puja", "Christmas", "Baisakhi"],
    correct: 1
  },
  {
    q: "Diwali par log ek doosre ko kya dete hain?",
    a: ["Shubhkamnayein aur mithai", "Homework", "Books only", "Shoes"],
    correct: 0
  },
  {
    q: "Diwali ka sambandh kis shehar mein Ram Ji ki wapsi se hai?",
    a: ["Mathura", "Ayodhya", "Delhi", "Jaipur"],
    correct: 1
  },
  {
    q: "Diwali par ghar ke darwaze par kya banaya jaata hai?",
    a: ["Rangoli", "Map", "Chart", "Poster"],
    correct: 0
  },
  {
    q: "Diya mein aam taur par kya jalta hai?",
    a: ["Tel ya Ghee", "Paani", "Juice", "Doodh"],
    correct: 0
  },
  {
    q: "Diwali par kaunsi mithai popular hai?",
    a: ["Laddu", "Salad", "Sandwich", "Soup"],
    correct: 0
  },
  {
    q: "Diwali par log ek doosre ko kya bolte hain?",
    a: ["Happy Holi", "Happy Diwali", "Happy Eid", "Happy New Year"],
    correct: 1
  },
  {
    q: "Diwali ka festival aam taur par kis calendar ke mahine mein aata hai?",
    a: ["Kartik", "Chaitra", "Shravan", "Jyeshtha"],
    correct: 0
  },
  {
    q: "Diwali par ghar ki safai kyun ki jaati hai?",
    a: ["Ghar ko saaf aur sundar banane ke liye", "Ghar ko band karne ke liye", "Sone ke liye", "Khelne ke liye"],
    correct: 0
  },
  {
    q: "Diwali par kis tarah ki decoration hoti hai?",
    a: ["Lights aur flowers", "Sirf books", "Sirf shoes", "Sirf toys"],
    correct: 0
  },
  {
    q: "Diwali humein kya sikhati hai?",
    a: ["Achchai aur roshni ka mahatva", "Ladai karna", "Gussa karna", "Kachra failana"],
    correct: 0
  },
  {
    q: "Diwali par kaunsi cheez jalana avoid karna chahiye?",
    a: ["Diya", "Electric lights", "Unsafe firecrackers", "Candles"],
    correct: 2
  }
];

const quizQuestion = document.getElementById("questionText");
const quizAnswers = document.getElementById("answers");
const quizCount = document.getElementById("questionCount");
const quizProgress = document.getElementById("progressBar");
const quizFeedback = document.getElementById("quizFeedback");
const quizNext = document.getElementById("nextQuestion");
const quizResult = document.getElementById("quizResult");

let selectedQuestions = [];
let currentQuestion = 0;
let diwaliScore = 0;
let answered = false;

function startDiwaliQuiz() {
  selectedQuestions = [...diwaliQuestions]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  currentQuestion = 0;
  diwaliScore = 0;

  quizResult.hidden = true;
  quizNext.hidden = false;
  quizNext.textContent = "Next Question →";
  quizNext.disabled = true;

  showDiwaliQuestion();
}

function showDiwaliQuestion() {
  answered = false;

  const question = selectedQuestions[currentQuestion];

  quizCount.textContent =
    `QUESTION ${currentQuestion + 1} OF ${selectedQuestions.length}`;

  quizProgress.style.width =
    `${(currentQuestion / selectedQuestions.length) * 100}%`;

  quizQuestion.textContent = question.q;
  quizAnswers.innerHTML = "";
  quizFeedback.textContent = "Apna answer select karo!";

  question.a.forEach((option, index) => {
    const button = document.createElement("button");

    button.className = "answer-btn";
    button.textContent = option;

    button.addEventListener("click", () => {
      if (answered) return;

      answered = true;

      const allButtons = quizAnswers.querySelectorAll("button");

      allButtons.forEach((btn, i) => {
        btn.disabled = true;

        if (i === question.correct) {
          btn.classList.add("correct");
        }
      });

      if (index === question.correct) {
        diwaliScore++;
        quizFeedback.textContent = "🎉 Bilkul sahi jawab!";
      } else {
        button.classList.add("wrong");
        quizFeedback.textContent =
          "❌ Galat jawab! Sahi answer green mein hai.";
      }

      quizNext.disabled = false;
    });

    quizAnswers.appendChild(button);
  });

  quizNext.disabled = true;
  quizNext.textContent =
    currentQuestion === selectedQuestions.length - 1
      ? "See Result →"
      : "Next Question →";
}

function finishDiwaliQuiz() {
  quizProgress.style.width = "100%";
  quizQuestion.textContent = "Quiz Complete! 🎉";
  quizAnswers.innerHTML = "";
  quizFeedback.textContent = "Bahut achha!";

  quizNext.hidden = true;
  quizResult.hidden = false;

  let message = "";

  if (diwaliScore === 4) {
    message = "Amazing! Tum Diwali Champion ho! 🏆";
  } else if (diwaliScore >= 2) {
    message = "Great job! Tumhe Diwali ke baare mein achhi knowledge hai! ✨";
  } else {
    message = "Good try! Next round mein aur achha karna! 🌟";
  }

  quizResult.innerHTML = `
    <h2>Your Score: ${diwaliScore}/4</h2>
    <p>${message}</p>
    <button id="playAgainQuiz" class="primary-btn">
      Play Again ↻
    </button>
  `;

  document.getElementById("playAgainQuiz")
    .addEventListener("click", startDiwaliQuiz);
}

quizNext.addEventListener("click", () => {
  if (!answered) return;

  if (currentQuestion < selectedQuestions.length - 1) {
    currentQuestion++;
    showDiwaliQuestion();
  } else {
    finishDiwaliQuiz();
  }
});

if (quizQuestion && quizAnswers && quizNext) {
  startDiwaliQuiz();
}
