const SW_API_BASE_URL = "https://swapi.dev/api/";
const SW_API_PEOPLE_URL = `${SW_API_BASE_URL}/people`;

const getRandomIntInclusive = (min, max) => {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
};

export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const FIRST_PERSON_ID = 1;
const LAST_PERSON_ID = 88;

function randomPerson() {
  const randomId = getRandomIntInclusive(FIRST_PERSON_ID, LAST_PERSON_ID);
  return fetch(`${SW_API_PEOPLE_URL}/${randomId}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        return {...res, id: randomId}
      })
}
