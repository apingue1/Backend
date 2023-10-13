import server from "./server/express.js"

const port = 3000;

 

server.get('/', (req, res) => {

   res.json({message:"welcome to the dress store app"});

});

 

server.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});

 