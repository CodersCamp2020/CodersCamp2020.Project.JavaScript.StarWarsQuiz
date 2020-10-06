const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const StarWarsApi = ({starWarsApiBaseUrl}) => {
  return {
    find({category, id}) {
      return fetch(`${starWarsApiBaseUrl}/${category}/${id}`)
          .then(handleErrors)
          .then(response => response.json())
          .then(responseJson => {
            return {id, name: responseJson.name}
          });
    }
  }
}
