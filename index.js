const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
var count = 0;


// Middlewares

server.use((req, res, next) => {

	count++;

	console.log(`Total de requisições ${count}`);

	return next();
})

function checkProjectExists(req, res, next) {
	const { id } = req.params;

	project = projects.find(project => project.id == id);

	if (!project) {
		return res.status(400).send({ message: 'Project does not exists'});
	}

	return next();
}

function checkProjectIdExists(req, res, next) {
	const { id } = req.body;

	project = projects.find(project => project.id == id);

	if (project) {
		return res.status(400).send({ message: 'This project id already exists'});
	}

	return next();
}

// Routes Project
server.get('/projects', (req, res) => {
	return res.json(projects);
})

server.post('/projects', checkProjectIdExists, (req, res) => {
	const { id, title, tasks } = req.body;

	let project = { 
		id,
		title,
		tasks
	}

	projects.push(project);

	return res.json(projects);
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	
	const project = projects.find(project => project.id == id);

	project.title = title;

	return res.json(projects);
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
	const { id } = req.params;

	projectIndex = projects.findIndex(project => project.id == id);

	projects.splice(projectIndex, 1);

	return res.send();
})

// Routes Project + Tasks
server.put('/projects/:id/tasks', checkProjectExists, (req, res) => {
	const { id } = req.params;
	const { title, tasks } =  req.body;

	const project = projects.find(project => project.id == id);

	project.title = title;
	project.tasks.push(tasks);

	return res.json(projects);

})



server.listen(3000);