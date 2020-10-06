export const GoogleVisionApi = ({apiKey}) => {
  return {
    recognizeImage({image}) {
      const postRequestBody = {
        requests: [
          {
            features: [
              {
                type: "WEB_DETECTION",
                maxResults: 3
              }
            ],
            image: {
              content: image
            }
          }
        ]
      }
      return fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        redirect: 'follow',
        cache: 'no-cache',
        body: JSON.stringify(postRequestBody)
      }).then(async resp => {
        if (!resp.ok) {
          throw new Error(resp.statusText)
        }
        return (await resp.json()).responses[0].webDetection.webEntities[0].description
      })
    }
  }
}
