(function(){
	'use strict';

	angular
		.module('todos')
		.service('TodosService', TodosService);

	TodosService.$inject = ['$http'];

	function TodosService($http){
		this.getTodos = getTodos;
		this.addTodo = addTodo;
		this.onComplete = onComplete;
		this.onDelete = onDelete;


		function getTodos (){
			return $http.get('/api/todos')
        .then(function (response) {
            return response.data;
        });
			//return this.listTodo;
		}

		function addTodo(label) {
           this.listTodo.push({label: label, id: this.listTodo.length + 1});
           return this.listTodo;
        }

        // function addTodo(label) {
        //     return $http.post('/api/todos/')
        //         .then(function (response) {
        //             return response.data;
        //         });
        // }

        function onComplete(todo) {
            this.listTodo = this.listTodo.map(function(item){
                return item.id === todo.id ? Object.assign({}, item, {complete: true}) : item
            });
            return this.listTodo;
        }

        function onDelete(id) {
            this.listTodo = this.listTodo.filter(function(item){
                return id !== item.id;
            });
            return this.listTodo;
        }
	}
})();
