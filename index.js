
// below we are bringin in our server .js and setting up the server listen so when we run the server it knows which port we want it to run on
const server = require('./server.js');

server.listen(4000, () => {
    console.log('this server is running on port 4000')
})