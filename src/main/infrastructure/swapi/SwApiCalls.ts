import Person from "./Person";

const SW_API_BASE_URL = "https://swapi.co/api/";
const SW_API_PEOPLE_URL = "https://swapi.co/api/people/";


const getRandomIntInclusive = (min: number, max: number) => {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
};

export function handleErrors(response: Response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const FIRST_PERSON_ID = 1;
const LAST_PERSON_ID = 88;

export function randomPerson(): Promise<Person> {
    const randomId = getRandomIntInclusive(FIRST_PERSON_ID, LAST_PERSON_ID);
    return fetch(`${SW_API_PEOPLE_URL}${randomId}`)
        .then(handleErrors)
        .then(res => res.json())
        .then(res => {
            return {...res, id: randomId}
        })
}
