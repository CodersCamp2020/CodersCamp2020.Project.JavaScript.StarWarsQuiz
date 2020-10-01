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
  return getRandomIntInclusive(FIRST_PERSON_ID, LAST_PERSON_ID);
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


const StarshipsMoe = () => {
  return {}
}

const VehiclesModes = () => {
  return {}
}

const ONE_SECOND = 1000;

const startQuiz = ({mode, onTimesUp}) => QuizGame({mode, onTimesUp})

const QuizGame = ({mode, onTimesUp}) => {
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
}

const mode = PeopleMode({starWarsPeopleApi});
mode.nextQuestion()
    .then(q => console.log(q))

startQuiz({
  mode, onTimesUp: () => {
    console.log("TIMES UP!")
  }
})
