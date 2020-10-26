const Fs = require('fs');
const Axios = require('axios');
const Path = require('path');
const FormData = require('form-data');


async function download() {

  const url = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9a200088-6b2b-4506-a544-31da4a95b035/dbelujk-004d00b8-385e-43c2-8dab-8ae380ed39a7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOWEyMDAwODgtNmIyYi00NTA2LWE1NDQtMzFkYTRhOTViMDM1XC9kYmVsdWprLTAwNGQwMGI4LTM4NWUtNDNjMi04ZGFiLThhZTM4MGVkMzlhNy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.sNFubisI7J1dd9hi3lRtnXqjVgtIfK51Rq3-nMbux0w';
  const path = Path.resolve(__dirname, 'files', 'landscape.jpg')
 
  const response = await Axios({
    method: 'GET',
    url,
    responseType: 'stream'

  })

  const fileA = response.data.pipe(Fs.createWriteStream(path))
  let formData = new FormData();
  const stream = Fs.createReadStream(path)

  formData.append('file', stream);
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve()
    })
    response.data.on('error', (err) => {
      reject(err)
    })
  })
}

download();