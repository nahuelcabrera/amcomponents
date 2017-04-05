(function(){
	'use strinct';

	angular
		.module('todos')
		.component('todoList',{
			bindings:{
				todos:'<',
				onComplete:'&',
				onDelete:'&'
			},
			templateUrl:"todos/todo-list/todo-list.html"
		});		
})();