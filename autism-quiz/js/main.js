// GLOBAL VARIABLES
const questions = {
    // More questions will be added later
    0: {
      thequestion: "Autism is ________",
      incorr: ["a disease", "the label for disability identity politics", "a sickness kids can overcome"],
      correcta: "developmental disability",
      further: "Autism, like most developmental disabilities, exists when someone is born. Autistic people are born autistic, and they will be autistic for their entire lives.",
    },
    1: {
      thequestion:
        "How much help do autistic people need?",
      incorr: ["A lot of help with one thing", "Not much help with a certain thing.", "May need help depending on the task."],
      correcta: "All of the above",
      further: "Autism is on a spectrum. The spectrum indicates that some autistic people may need a lot of help with one thing, while other autistic people may not need help with the same thing. One person may look “less autistic” than another person, but there is no such thing as being “more” or “less” autistic.",
    },
    2: {
      thequestion: "What is executive functioning?",
      incorr: ["How autistics live their lives", "A theory behind how cognitive functioning works", "How Autism Speaks runs their meetings"],
      correcta: "A group of skills that help people stay on track",
      further: "Autistic people can have a hard time with executive functioning. It may be hard to make a plan for what to do, start something new, or got autistics to stop what they're currently doing. It may even be hard to remember what they want to do.",
    },
    3: {
      thequestion:
        "Meltdowns are when an autistic person can not control our feelings, and they happen ________ .",
      incorr: ["when autistics do not get their way", "when neurotypicals emotionally abuse an autistic", "when autistics get extremely angry"],
      correcta: "when an autistic gets too stressed",
      further: "Meltdowns can look scary to other people. But they do not happen on purpose, and they are not the same thing as tantrums. Autistic people cannot control when a meltdown happens",
    },
    4: {
      thequestion:
        "In what ways do autistic people think, see, or even feel things differently?",
      incorr: ["Autistics love a predictable routine. Unwanted change can be scary for autistics.", "Autistics see small details that may or may not be a big deal", "Autistics learn differently"],
      correcta: "All of the above",
      further: "Autistics learn and see the world differently, they notice details, and enjoy routine.",
    },
    5: {
      thequestion: "Non-speaking autistics...",
      incorr: ["do not have anything to contribute to conversations.", "are hiding something.", "are not autistic at all."],
      correcta: "None of the above",
      further: "Non-speaking autistics do not talk, and that is just one of the many differences between other autistics on the spectrum. Just because someone cannot talk does not mean they have nothing to say. It does not mean they do not care about people, or that they have a crippling intellectual disability. Non-speaking autistics deserve proper help communicating in ways that work for them.",
    },
    6: {
      thequestion:
        "Can girls be autistic?",
      incorr: [
        "Only boys can be autistic",
        "Only boys and transgender people can be autistic",
        "Girls can act like they are autistic, but it is something else entirely",
      ],
      correcta: "Yes, although girls may not act or be like autistic boys.",
      further: "Girls and women get diagnosed with autism less than boys. Lots of people think of autism as a boys thing, so girls might get diagnosed with other disabilities instead. Girls can be autistic, too.",
    },
    7: {
      thequestion: "There is no ________ inside of an autistic person.",
      incorr: [
        "mistake",
        "standard body language",
        "demon",
      ],
      correcta: "normal person",
      further: "Some people talk about autism like it is not part of who autistics are. They think there is secretly a “normal” person inside every autistic, and say autism keeps them from being normal. They want to get rid of autism so autistics can be normal, but no one can make autistics normal by getting rid of the autism. Autistic people are autistic all the way through. There is no normal person trapped inside an autistic person. Autism is just part of who they are. Being autistic can always be a good thing.",
    },
    8: {
      thequestion: "Are autistic people childish?",
      incorr: [
        "Adults with developmental disabilities need help with things kids can do by themselves. Because of this, autistic people have kids brains.",
        "Some autistic adults cannot work because of their interest in kids games or TV shows.",
        "Autistic people are like Peter Pan. They will never grow up.",
      ],
      correcta: "None of the above",
      further: "Being a kid is not about what someone can and cannot do, or about how they talk or play. Neither is being an adult. People learn and grow every year they are alive. People are the age they are no matter who they are. Being mentally a certain age is just a social construct dictated by society.",
    },
    9: {
      thequestion:
        "Which fact about autism is true?",
      incorr: ["Autism continually destroys the body, it must be cured.", "Autistics have a hard time taking personal responsibility.", "Autistics can never contribute to society."],
      correcta: "Autism is just a way some brains work, and that's okay.",
      further: "Autistic people experience unique challenges, like everyone else does. Yet they also have strengths. There are things about autism that make life harder, but that does not mean that autism is terrible. A lot of the things that are hard for autistic people are not hard because of autism. They are hard because of other people. This doesn't make autism bad. It just means that other people are being unfair. We need to make the world a better place for autistic people.",
    },
    total: 10,
  },
  // Certain divs to show and hide
  resultDiv = document.getElementById("result"),
  lastresultDiv = document.getElementById("last-result"),
  // Buttons (some may need to be removed due to earlier drafts)
  beginBtn = document.getElementById("begin-btn"),
  homeBtn = document.getElementById("home"),
  clearBtn = document.getElementById("clear"),
  // Different windows
  notesDiv = document.getElementById("notes"),
  quizDiv = document.getElementById("quiz"), // also used for answer buttons
  finishDiv = document.getElementById("finish"),
  // Inputs (might need to remove if found in an earlier draft)
  initalsInput = document.getElementById("initials")
  score = 0
let questNums = [...Array(questions.total).keys()], // array 0 to num of questions
  num = 1 // Question number

  // Keep some windws hidden until the required time
quizDiv.style.display = "none"
resultDiv.style.display = "none"
lastresultDiv.style.display = "none"
finishDiv.style.display = "none"
// No cheating
console.log("HEY! No peaking at the quiz answers! You have been warned!")


// Show me the questions

function showQ(question) {
  // Which question is it?
  document.getElementById("question").textContent = question.thequestion
  // Get random numbers to randomize the right and wrong answers
  const rightChoice = Math.floor(Math.random() * question.incorr.length + 1)
  // Switch up the wrong answers
  question.incorr.sort(function (a, b) {
    return 0.5 - Math.random()
  })
  // Show the choices on the buttons
  let wrongIndx = 0 // Index the wrong answers
  for (let btnInd = 0; btnInd <= question.incorr.length; btnInd++) {
    if (btnInd === rightChoice) {
      // The correct answer is put on a button with this code
      document.getElementById(`answ${btnInd}`).textContent = question.correcta
    } else {
      // The incorrect answer is put on a button with this code
      document.getElementById(`answ${btnInd}`).textContent =
        question.incorr[wrongIndx]
      wrongIndx++
    }
  }
}

// Show the end of the quiz once a user is done with this function
function endQuiz() {
  // Give us the window
  finishDiv.style.display = "flex"
  // Hide the other windows
  notesDiv.style.display = "none"
  quizDiv.style.display = "none"
  // Show the final results
  document.getElementById(
    "final-result"
  ).textContent = `Yay! Your final score is ${score} / ${questions.total}`
  // Show the results of the final question (probably not working at present)
  lastresultDiv.textContent = resultDiv.textContent
}

// Here we evaluate the answers
function evalThis(event) {
  if (event.target.matches("button")) {
    const iSelected = event.target.textContent
    if (iSelected === questions[questNums[num]].correcta) {
      // The answer is correct
      resultDiv.textContent = "Good answer!"
      score = score + 1
    } else {
      // Tne answer is not correct, let's explain why
      resultDiv.textContent = `Sorry, the correct answer is ${
        questions[questNums[num]].correcta
      }. ${
        questions[questNums[num]].further
      }`
    }
    num++ // Move forward to the next question with this function
    resultDiv.style.display = "block" // This is where the result of the question is displayed
    if (questions[questNums[num]]) {
      showQ(questions[questNums[num]])
    } else {
      endQuiz()
    }
  }
}

function startQuiz() {
  // Show us the quiz window here
  quizDiv.style.display = "flex"
  // Hide the other windows
  notesDiv.style.display = "none"
  finishDiv.style.display = "none"
  // Hide the results windows
  resultDiv.style.display = "none"
  // Show a random question
  questNums.sort(function (a, b) {
    return 0.5 - Math.random()
  })
  // start at question 0
  num = 0
  showQ(questions[questNums[num]])
}

// Button Event Listeners
beginBtn.addEventListener("click", startQuiz)
quizDiv.addEventListener("click", function (event) {
  evalThis(event)
})