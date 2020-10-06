import {Ok, Error} from 'folktale/result'

export const GoogleVisionApi = ({apiKey}) => {
  return {
    recognizeImage({image}) {
      const request = {
        "requests": [{
          "features": [{
            "type": "WEB_DETECTION",
            "maxResults": 3
          }],
          "image": {
            "content": image
          }
        }]
      };
      return fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        redirect: 'follow',
        cache: 'no-cache',
        body: JSON.stringify(request)
      })
          .then(async resp => resp.ok ? Ok((await resp.json()).responses[0].webDetection.webEntities[0].description) : Error(resp.statusText))
    }
  }
}
