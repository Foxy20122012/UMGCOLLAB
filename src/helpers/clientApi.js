import forge from 'node-forge'

const constants = {
  urlWebApi: process.env.urlWebApi,
  urlUploadApi: process.env.urlUploadApi,
  publicKey: process.env.publicKey
}

const uris = {
  procedure: '',
  upload: '/upload'
}

const encryptRsa = function (obj) {
  const encoded = forge.util.encodeUtf8(obj)
  const publicKey = forge.pki.publicKeyFromPem(constants.publicKey)
  const encrypted = publicKey.encrypt(encoded, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: forge.mgf1.create()
  })
  const base64 = forge.util.encode64(encrypted)
  return base64
}


const callWs = async (uri, json) => {
  // Send the form data to our API and get a response.
  const response = await fetch(uri, {
    // Body of the request is the JSON data we created above.
    body: JSON.stringify(json),
    // Tell the server we're sending JSON.
    headers: {
      'Content-Type': 'application/json',
    },
    // The method is POST because we are sending data.
    method: 'POST',
  })

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.
  const result = await response.json()
  return result.data // return data rows
}

const execute = async (spName, params, encriptado = 0, loading = false, connInfo = undefined) => {
  let model = {}
  if (typeof spName === 'string') {
    model.nombre = spName
    model.loading = loading
    // verifica que los parametros vengan como Array
    model.parametros = params ?? []
    // si la información se envía encriptada
    if (encriptado === 1) {
      const paramsToEncrypt = {
        nombre: spName,
        parametros: params
      }
      const paramsEncryptedString = encryptRsa(JSON.stringify(paramsToEncrypt))

      model.nombre = ''
      model.encriptado = 1
      model.parametros = paramsEncryptedString
    }
  } else if(typeof spName === 'object') {
    if (encriptado === 1) {
      const paramsEncryptedString = encryptRsa(JSON.stringify(spName))
      model.parametros = paramsEncryptedString
      model.encriptado = 1
      model.loading = loading
    } else {
      model = spName
      model.loading = loading
    }
  }

  if (connInfo) {
    return await callWs(connInfo.api + '/' + connInfo.env + '/' + connInfo.exposeRoute + '?apikey=' + connInfo.apikey, model)
  }
  return await callWs(constants.urlWebApi + uris.procedure, model)
}


export { execute }