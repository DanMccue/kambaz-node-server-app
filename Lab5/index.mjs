let assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

let kambazModule = {
  id: "M101",
  name: "HTTP APIs",
  description: "Building RESTful APIs with route handlers",
  course: "CS4550",
};

let todos = [
  {
    id: 1,
    title: "Task 1",
    completed: false,
    description: "Prepare lab APIs",
  },
  { id: 2, title: "Task 2", completed: true, description: "Test route handlers" },
  { id: 3, title: "Task 3", completed: false, description: "Wire async client" },
  { id: 4, title: "Task 4", completed: true, description: "Verify rubric IDs" },
];

const parseInteger = (value) => Number.parseInt(value, 10);

const toIntegerPair = (aRaw, bRaw) => {
  const a = parseInteger(aRaw);
  const b = parseInteger(bRaw);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return null;
  }
  return { a, b };
};

const todoNotFoundMessage = (verb, id) =>
  `Unable to ${verb} Todo with ID: ${id}`;

export default function Lab5Routes(app) {
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });

  app.get("/lab5/add/:a/:b", (req, res) => {
    const ints = toIntegerPair(req.params.a, req.params.b);
    if (!ints) {
      res.status(400).json({ message: "Path parameters must be valid integers" });
      return;
    }
    res.send((ints.a + ints.b).toString());
  });

  app.get("/lab5/subtract/:a/:b", (req, res) => {
    const ints = toIntegerPair(req.params.a, req.params.b);
    if (!ints) {
      res.status(400).json({ message: "Path parameters must be valid integers" });
      return;
    }
    res.send((ints.a - ints.b).toString());
  });

  app.get("/lab5/multiply/:a/:b", (req, res) => {
    const ints = toIntegerPair(req.params.a, req.params.b);
    if (!ints) {
      res.status(400).json({ message: "Path parameters must be valid integers" });
      return;
    }
    res.send((ints.a * ints.b).toString());
  });

  app.get("/lab5/divide/:a/:b", (req, res) => {
    const ints = toIntegerPair(req.params.a, req.params.b);
    if (!ints) {
      res.status(400).json({ message: "Path parameters must be valid integers" });
      return;
    }
    res.send((ints.a / ints.b).toString());
  });

  app.get("/lab5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    const ints = toIntegerPair(String(a), String(b));
    if (!ints) {
      res.status(400).json({ message: "a and b must be valid integers" });
      return;
    }

    let result = "Invalid operation";
    switch (operation) {
      case "add":
        result = (ints.a + ints.b).toString();
        break;
      case "subtract":
        result = (ints.a - ints.b).toString();
        break;
      case "multiply":
        result = (ints.a * ints.b).toString();
        break;
      case "divide":
        result = (ints.a / ints.b).toString();
        break;
    }

    res.send(result);
  });

  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });

  app.get("/lab5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });

  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    assignment = { ...assignment, title: req.params.newTitle };
    res.json(assignment);
  });

  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    const newScore = Number.parseFloat(req.params.newScore);
    if (Number.isNaN(newScore)) {
      res.status(400).json({ message: "Score must be a valid number" });
      return;
    }
    assignment = { ...assignment, score: newScore };
    res.json(assignment);
  });

  app.get("/lab5/assignment/completed/:newCompleted", (req, res) => {
    assignment = {
      ...assignment,
      completed: req.params.newCompleted === "true",
    };
    res.json(assignment);
  });

  app.get("/lab5/module", (req, res) => {
    res.json(kambazModule);
  });

  app.get("/lab5/module/name", (req, res) => {
    res.json(kambazModule.name);
  });

  app.get("/lab5/module/name/:newName", (req, res) => {
    kambazModule = { ...kambazModule, name: req.params.newName };
    res.json(kambazModule);
  });

  app.get("/lab5/module/description/:newDescription", (req, res) => {
    kambazModule = { ...kambazModule, description: req.params.newDescription };
    res.json(kambazModule);
  });

  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((todo) => todo.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });

  app.get("/lab5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
      description: "Created with GET /todos/create",
    };
    todos.push(newTodo);
    res.json(todos);
  });

  app.post("/lab5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });

  app.get("/lab5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((todo) => todo.id === parseInteger(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: todoNotFoundMessage("Delete", id) });
      return;
    }
    todos.splice(todoIndex, 1);
    res.json(todos);
  });

  app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todoIndex = todos.findIndex((todo) => todo.id === parseInteger(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: todoNotFoundMessage("Update", id) });
      return;
    }
    todos[todoIndex].title = title;
    res.json(todos);
  });

  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todoIndex = todos.findIndex((todo) => todo.id === parseInteger(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: todoNotFoundMessage("Update", id) });
      return;
    }
    todos[todoIndex].completed = completed === "true";
    res.json(todos);
  });

  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todoIndex = todos.findIndex((todo) => todo.id === parseInteger(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: todoNotFoundMessage("Update", id) });
      return;
    }
    todos[todoIndex].description = description;
    res.json(todos);
  });

  app.get("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((item) => item.id === parseInteger(id));
    res.json(todo);
  });

  app.delete("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((todo) => todo.id === parseInteger(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: todoNotFoundMessage("Delete", id) });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  });

  app.put("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((todo) => todo.id === parseInteger(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: todoNotFoundMessage("Update", id) });
      return;
    }
    todos = todos.map((todo) =>
      todo.id === parseInteger(id) ? { ...todo, ...req.body, id: todo.id } : todo
    );
    res.sendStatus(200);
  });
}
