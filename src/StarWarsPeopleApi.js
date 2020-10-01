const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const StarWarsPeopleApi = ({starWarsApiBaseUrl}) => {
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
