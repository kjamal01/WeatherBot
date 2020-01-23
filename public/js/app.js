console.log('Client side javascript file is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "loading..."
    messageTwo.textContent = ''

    // don't fetch the local host 'http://localhost:3000/weather?address=' that we can use on our machine
    // to ensure that it uses heroku when available, and localhost when heroku isnt 

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location 
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }

        })
    })
}) 