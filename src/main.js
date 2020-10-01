import 'regenerator-runtime/runtime' //async/await with Parcel
import {GoogleVisionApi} from "./GoogleVisionApi";

const API_KEY = 'AIzaSyAu5cv9vSquTVHFDuFRvbNX4FtN0TLwVrk'
const SW_API_BASE_URL = "https://swapi.dev/api";

const getRandomIntInclusive = (min, max) => {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const randomPersonId = () => {
  const FIRST_PERSON_ID = 1;
  const LAST_PERSON_ID = 83;
  const random = getRandomIntInclusive(FIRST_PERSON_ID, LAST_PERSON_ID);
  if (random === 17) {
    return randomPersonId()
  }
  return random;
}

const StarWarsPeopleApi = ({starWarsApiBaseUrl}) => {
  return {
    getById({id}) {
      return fetch(`${starWarsApiBaseUrl}/people/${id}`)
          .then(handleErrors)
          .then(response => response.json())
          .then(responseJson => {
            return {id, ...responseJson}
          });
    }
  }
}

const starWarsPeopleApi = StarWarsPeopleApi({starWarsApiBaseUrl: SW_API_BASE_URL})

async function imageOf({type, id}) {
  const url = `static/assets/img/modes/${type}/${id}.jpg`
  return fetch(url)
      .then(response => response.blob())
      .then(async imageBlob => Buffer.from(await imageBlob.arrayBuffer()).toString('base64'))
}

const googleVisionApi = GoogleVisionApi({apiKey: 'AIzaSyAu5cv9vSquTVHFDuFRvbNX4FtN0TLwVrk'})

const PeopleMode = ({starWarsPeopleApi}) => {
  return {
    async nextQuestion() {
      const peopleIds = new Set()
      for (let i = 0; peopleIds.size < 4; i++) {
        peopleIds.add(randomPersonId())
      }
      const rightAnswerId = [...peopleIds][getRandomIntInclusive(0, 3)]
      const answers = await Promise.all([...peopleIds].map(id => starWarsPeopleApi.getById({id})));
      return {
        image: await imageOf({type: "people", id: rightAnswerId}),
        rightAnswer: answers.find(it => it.id === rightAnswerId),
        answers
      }
    }
  }
}

const ExactMatchCheckStrategy = ({correctAnswer, givenAnswer}) => correctAnswer === givenAnswer

const PartialMatchCheckStrategy = ({correctAnswer, givenAnswer}) => {
  const correctWords = correctAnswer.split(' ')
  const givenWords = givenAnswer.split(' ')
  return correctWords.some(r => givenWords.includes(r)) || givenWords.some(r => correctWords.includes(r));
}

const IncludesCheckStrategy = ({correctAnswer, givenAnswer}) => {
  return correctAnswer.includes(givenAnswer);
}

const AnswerChecker = ({checkStrategy}) => {
  return {
    isAnswerCorrect({question, givenAnswer}) {
      const rightAnswerName = question.rightAnswer.name;
      return checkStrategy({correctAnswer: rightAnswerName, givenAnswer})
    }
  }
}


/*const StarshipsMode = () => {
  return {}
}

const VehiclesMode = () => {
  return {}
}*/

const ONE_SECOND = 1000;

const startQuiz = ({mode, onTimesUp}) => QuizGame({mode, onTimesUp})

/**
 * Generuje pytania i zapisuje ktory user jest na ktorym
 * @param mode
 * @param onTimesUp
 * @constructor
 */
const QuizGame = async ({humanProvider, googleProvider, mode, onTimesUp}) => {
  const MAX_TIME = 10 * ONE_SECOND;
  let passedTime = 0;
  const timer = setInterval(() => {
    console.log("ONE SECOND")
    passedTime += ONE_SECOND;
    if (passedTime === MAX_TIME) {
      onTimesUp()
    }
  }, ONE_SECOND)
  clearInterval(timer)

  const human = humanProvider(this)
  const google = googleProvider(this)
  const question = await mode.nextQuestion()
  return {
    giveAnswer({player, answerName}) {

    }
  }
}


class PlayerAnswered {
  constructor({uuid, subscriptionId, subscriberId, timestamp}) {
    this.eventId = uuid;
    this.subscriptionId = subscriptionId;
    this.subscriberId = subscriberId;
    this.timestamp = timestamp;
  }
}

const HumanPlayer = ({playerName, quizGame, onQuestionCallback}) => {
  let currentQuestion;
  return {
    async onQuestion({question}) {
      onQuestionCallback({question})
      return Promise.resolve()
    },
    giveAnswer({answerName}) {
      quizGame.giveAnswer({player: playerName, answerName})
    }
  }
}

const GoogleVisionPlayer = ({playerName, quizGame, googleVisionApi}) => {
  return {
    async onQuestion({question}) {
      const recognized = await googleVisionApi.recognizeImage({
        image: question.image
      }).then(result => result.value);
      quizGame.giveAnswer({player: playerName, answerName: recognized})
    }
  }
}

async function randomPersonTest() {
  const person = await StarWarsPeopleApi({starWarsApiBaseUrl: SW_API_BASE_URL}).getById({id: randomPersonId()})
  const recognizedPerson = await googleVisionApi.recognizeImage({
    image: await imageOf({
      type: "people",
      id: person.id
    })
  }).then(result => result.value);
  const isGoogleCorrect = person.name === recognizedPerson;
  console.table({
    'Person Name': person.name,
    'Google Vision API Answer': recognizedPerson,
    'Is Vision API correct': isGoogleCorrect
  });
  return isGoogleCorrect;
}

randomPersonTest().then(c => console.log(c));


const mode = PeopleMode({starWarsPeopleApi});

const quiz = QuizGame({
  mode,
  humanProvider: quizGame => GoogleVisionPlayer({playerName: "Google Vision", googleVisionApi, quizGame}),
  googleProvider: quizGame => HumanPlayer({playerName: "Mateusz", quizGame}),
  onTimesUp: () => {
    console.log("TIMES UP!")
  }
})


const QuizGameView = ({renderOn, presenterSupplier}) => {
  const element = document.querySelector(renderOn)
  if (!element) {
    throw new Error(`Element ${renderOn} not exists!`)
  }

}

const quizGameView = QuizGameView({
  renderOn: '#swquiz-game'
})

const MainMenuView = () => {
  const playTheGameButton = document.getElementById("play-the-game-button")
  playTheGameButton.addEventListener('click', () => {
    console.log("CLICKED!")
  })
}

const mainMenuView = MainMenuView()
