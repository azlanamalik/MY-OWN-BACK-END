import app from "./app.js"

//this project will be a TDD approach so design the Test cases first
//only job: start the app on a port
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})


//in this implimentation its just the runnign allows for easy access to the code without needing to run up a server