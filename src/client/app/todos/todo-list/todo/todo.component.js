(function() {
	'use strict';

	angular
		.module('todos')
		.component('todo',{
			bindings: {
				item: '<',
				onComplete:'&',
				onDelete: '&'
			},
			templateUrl:"todos/todo-list/todo/todo.html"
		});
})();