const url = `http://localhost:${process.env.PORT || 4000}/api/v1/apikey/try4`

const options = {
  method: 'POST'
}

console.log(url)

const response = await fetch(url, options)
const data = await response.json()

console.log(response.status)
console.log(data)