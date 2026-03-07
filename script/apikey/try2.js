const API_KEY = process.argv[2]

const url = `http://localhost:${process.env.PORT || 4000}/api/v1/apikey/try2`

const options = {
  method: 'POST',
  headers: {
    Authorization: API_KEY
  }
}

console.log(url)

const response = await fetch(url, options)
const data = await response.json()

console.log(response.status)
console.log(data)