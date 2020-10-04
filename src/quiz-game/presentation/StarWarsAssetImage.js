export async function imageBase64({type, id}) {
  const url = `static/assets/img/modes/${type}/${id}.jpg`
  return fetch(url)
      .then(response => response.blob())
      .then(async imageBlob => Buffer.from(await imageBlob.arrayBuffer()).toString('base64'))
}
