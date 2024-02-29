const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const app = express();

//json perser
app.use(express.json());
app.use(cors())

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))


const generateId = () => {
  return Math.floor(Math.random() * 256);
};

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];



const date = new Date();
app.get("/info", (request, response) => {
  const currentDate = new Date().toLocaleString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  response.send(`<div>
    <p>Phonebooss has info for ${persons.length}</p>
    <p>${currentDate} ${timeZone}</p>
    </div>`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
  
});

app.get("/api/persons/:id", (request, response) => {
  let id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return response.status(404).end();
  }
  response.json(person);
});
app.delete("/api/persons/:id", (request, response) => {
  let id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  let personObject = persons.find((person) => person.name === body.name);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or Nummber missing",
    });
  } else if (personObject) {
    return response.status(400).json({
      error: "Name already exist, Name must be unique",
    });
  } else {
    const newPerson = {
      name: body.name,
      number: body.number,
      id: generateId(),
    };
    persons = persons.concat(newPerson);
    response.json(persons);
  }
});

const PORT = 3001;
app.listen(3001, () => {
  console.log(`Server is running on port ${PORT}`);
});
