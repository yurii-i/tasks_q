const tasks = require('../models/tasks.js');

module.exports = {
	index : (req, res) => {
		tasks.getCountTasks().then((result) => {
			res.render('index.hbs', {tasksCount : result});
		});
	},
	tasks : (req, res) => {
		res.render('tasks.hbs');
	},
	get_tasks : (req, res) => {	
		let {maxTasksCountOnPage, currentPageNumber} = req.body;
		// validation
		maxTasksCountOnPage = Number(maxTasksCountOnPage);
		currentPageNumber = Number(currentPageNumber);

		Promise.all([
			tasks.getCountTasks(),
			tasks.getTasks(maxTasksCountOnPage, currentPageNumber)
			]).then(result => { 
  				console.log(result);
  				res.json({tasksCount : result[0], tasks : result[1]});
			});	
	},
	set_tasks : (req, res) => {
		try {
			console.log(req.body)
			console.log(req.params)
			console.log(req.query)
			if (Array.isArray(req.body)) {
				// bulkwrite
				// validation objects
				let uniqTasks = new Set();
				req.body.forEach((taskData) => {
					uniqTasks.add(JSON.stringify(taskData));
				})

				uniqTasks = [...uniqTasks].map((str) => {
					return JSON.parse(str);
				})

				uniqTasks.length === 1000;
				uniqTasks = uniqTasks.filter(Boolean);
				tasks.setManyTasks(uniqTasks).then((result) => {
					res.send(result);
				})
			}
			else if (typeof req.body === 'object') {
				let {name, description, priority} = req.body;
				// validation
				tasks.setTasks(req.body).then((result) => {
					res.send(result);
				})
			}
		}
		catch(err) {console.log(err)}
	},
	remove_tasks : (req, res) => {
		let {priority, action} = req.body;
		let filter = {priority : -1};
		if (action.toLowerCase() === 'g') filter = {priority : { $gt: priority } };
		else if (action.toLowerCase() === 'l') filter = {priority : { $lt: priority } };
		else if (action.toLowerCase() === 'e') filter = {priority};
		tasks.removeTasks(filter).then((result) => {
			res.send(result);
		})
	}
}
