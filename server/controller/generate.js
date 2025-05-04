var myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

var raw = JSON.stringify({
  key: 'Fa29hssGg50ZugFkfmRv6K0Gp7fu6QBZw8xyUVdb7BLfr23AZuUKtRSnGLle',
  prompt:
    'cat in batman costume',
  negative_prompt: 'bad quality',
  width: '512',
  height: '512',
  safety_checker: false,
  seed: null,
  samples: 1,
  base64: false,
  webhook: null,
  track_id: null,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

fetch('https://modelslab.com/api/v6/realtime/text2img', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));