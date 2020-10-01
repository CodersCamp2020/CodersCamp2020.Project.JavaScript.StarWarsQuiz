import 'regenerator-runtime/runtime' //async/await with Parcel
import {GoogleVisionApi} from "./GoogleVisionApi";
import {QuizGame} from "./QuizGame";
import {StarWarsPeopleApi} from "./StarWarsPeopleApi";
import {PeopleMode} from "./PeopleMode";
import {MainMenuView} from "./MainMenuView";
import {QuizGamePresenter} from "./QuizGamePresenter";
import {QuizGameView} from "./QuizGameView";

const API_KEY = 'AIzaSyAu5cv9vSquTVHFDuFRvbNX4FtN0TLwVrk'
const SW_API_BASE_URL = "https://swapi.dev/api";

const starWarsPeopleApi = StarWarsPeopleApi({starWarsApiBaseUrl: SW_API_BASE_URL})
const googleVisionApi = GoogleVisionApi({apiKey: 'AIzaSyAu5cv9vSquTVHFDuFRvbNX4FtN0TLwVrk'})

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

/*
async function randomPersonTest({starWarsPeopleApi}) {
  const person = await starWarsPeopleApi.getById({id: randomPersonId()})
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

randomPersonTest({starWarsPeopleApi}).then(c => console.log(c));
*/

const mode = PeopleMode({starWarsPeopleApi});

const quizGame = QuizGame({
  mode,
  humanProvider: quizGame => GoogleVisionPlayer({playerName: "Google Vision", googleVisionApi, quizGame}),
  googleProvider: quizGame => HumanPlayer({playerName: "Mateusz", quizGame})
})


MainMenuView({
  onPlayTheGame: () => {
    const quizModeMenu = document.getElementById("swquiz-mode")
    quizModeMenu.style.display = 'none'
    const quizGameView = QuizGameView({
      renderOn: '#swquiz-game',
      presenterSupplier: view => QuizGamePresenter({quizGame, quizGameView: view})
    });
    quizGameView.startGame().then(() => console.log("GAME STARTED!"));
  }
})

