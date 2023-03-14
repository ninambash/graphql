let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');
let db = require('./db'); ///mockup of a database 
const port = 8080;

let schema = buildSchema(`  
type Query {
  hello: String
  employees: [Employee]

}
type Employee {
  id: ID!
  firstName:String
  lastName: String
}

 `);
///this is the resolver used to execute the query
let root = { 
  hello: () => "Hello world",
  employees:() => db.employees.list()
   
    
 };

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(port, () => {
   console.log(`Server Listening on ${port}`)
})