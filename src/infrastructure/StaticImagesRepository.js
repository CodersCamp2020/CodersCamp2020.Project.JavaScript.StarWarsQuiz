export const StaticImagesRepository = () => {
  return {
    find({type, id}) {
      return fetch(`static/assets/img/modes/${type}/${id}.jpg`)
          .then(response => response.blob())
          .then(async imageBlob => Buffer.from(await imageBlob.arrayBuffer()).toString('base64'))
    }
  }
}
