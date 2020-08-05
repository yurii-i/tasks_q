const mongoose = require('mongoose');

mongoose.connect('mongodb://task_mongo:27017/tasks', {useNewUrlParser: true, useUnifiedTopology: true});

const tasksSchema = mongoose.Schema({
    name: String,
    description: String,
    priority : Number
});

const Tasks = mongoose.model('Tasks', tasksSchema);

module.exports = {
	setTask : function (taskData) {
		return new Promise((resolve) => {
			let {name, description, priority} = taskData;
			let _id = new mongoose.Types.ObjectId();
			let newTask = new Tasks({_id, name, description, priority})

			newTask.save(function(err) {
				if (err) {
					console.log(err);
					resolve(false);
				}
				else {
					resolve(true);
				}
			})
		})
	},
	bulkWrite : function (tasks) {
		return new Promise((resolve) => {
			Tasks.insertMany(tasks, function(err) {
				if (err) {
					console.log(err);
					resolve(false);
				}
				else {
					resolve(true);
				}
			})
		})
	},
	removeTask : function (filter) {
		return new Promise((resolve) => {
			Tasks.deleteMany(filter, function(err, result) {
				if (err) {
					console.log(err);
					resolve(false);
				}
				else {
					resolve(true);
				}
			});
		})
	},
	getTasks : function (skip, limit) {
		return new Promise((resolve) => {
			console.log('skip', skip)
			console.log('limit', limit)
			Tasks.find({}, {}, { skip, limit }, function(err, arr) {
				console.log('find');
				if (err) {
					console.log(err);
					resolve([]);
				}
				else {
					resolve(arr);
				}
			});
		})
	},
	getCountTasks : function () {
		return new Promise((resolve) => {
			Tasks.count({}, function(err, count) {
				if (err) {
					console.log(err);
					resolve(0);
				}
				resolve(count);
			});
		})
	}
}
