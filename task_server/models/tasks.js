const mongoWork = require('../src/mongoWork');

module.exports = {
	getTasks : function (maxTasksCountOnPage, currentPageNumber) {
		return new Promise((resolve) => {
			mongoWork.getTasks((currentPageNumber-1)*maxTasksCountOnPage, maxTasksCountOnPage).then((result) => {
				resolve(result);
			});
		})
	},
	setTasks : function (taskData) {
		return new Promise((resolve) => {
			mongoWork.setTask(taskData).then((result) => {
				resolve(result);
			});
		})
	},
	getCountTasks : function () {
		return new Promise((resolve) => {
			mongoWork.getCountTasks().then((result) => {
				resolve(result);
			});
		})
	},
	setManyTasks : function (tasks) {
		return new Promise((resolve) => {
			mongoWork.bulkWrite(tasks).then((result) => {
				resolve(result);
			})
		})
	},
	removeTasks : function (filter) {
		return new Promise((resolve) => {
			mongoWork.removeTask(filter).then((result) => {
				resolve(result);
			})
		})
	}
}
