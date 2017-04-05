(function () {
    'use strict';

    angular
        .module('app', [
        	'todos'
        ]);

})();
(function(){
	'use strict';

	angular
		.module('todos', []);
})();
(function(){angular.module('todos').run(['$templateCache', function($templateCache) {$templateCache.put('todos/todos-root.html','<div><todo-form on-add="$ctrl.addTodo($event);"></todo-form><todo-list todos="$ctrl.todos" on-complete="$ctrl.onComplete($event);" on-delete="$ctrl.onDelete($event);"></todo-list></div>');
$templateCache.put('todos/todo-form/todo-form.html','<form ng-submit="$ctrl.submit();"><input ng-model="$ctrl.label"><code>{{$ctrl.label}}</code><button type="submit">Add todo</button></form>');
$templateCache.put('todos/todo-list/todo-list.html','<ul><li ng-repeat="todo in $ctrl.todos"><todo item="todo" on-complete="$ctrl.onComplete({$event:$event});" on-delete="$ctrl.onDelete({$event:$event});"></todo></li></ul>');
$templateCache.put('todos/todo-list/todo/todo.html','<div><span ng-class="{ complete: $ctrl.item.complete}">{{$ctrl.item.label}}</span><button type="button" ng-click="$ctrl.onComplete({ $event: { todo: $ctrl.item } });">Done</button><button type="button" ng-click="$ctrl.onDelete({ $event: { todo: $ctrl.item } });">Delete</button></div>');}]);})();
(function(){
	'use strinct';

	angular
		.module('todos')
		.component('todoForm',{
			controller: TodoFormController,
			bindings:{
				onAdd:'&'
			},
			templateUrl:"todos/todo-form/todo-form.html"
		});


	TodoFormController.$inject = [];

	function TodoFormController() {

		this.submit = function(){
			if(!this.label) return;
			this.onAdd({
				$event: {label: this.label}
			});
			this.label = '';
		};

	}
})();
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
(function(){
	angular
		.module('todos')
		.component('todosRoot',{
			controller: TodosController,
			require:{

			},

			templateUrl:'todos/todos-root.html'
		});
	TodosController.$inject = ['TodosService'];

	function TodosController(TodosService){

		var _self = this;

        this.$onInit = function(){
            TodosService.getTodos().then(function successCallback(response) {
      				_self.todos = response;
      			}, function errorCallback(error) {
      				console.log(error);
      			});
        };

		this.onComplete = function($event){
			var todo = $event.todo;
			_self.todos = TodosService.onComplete(todo);
		};

		this.onDelete = function($event){
			var id = $event.todo.id;
			_self.todos = TodosService.onDelete(id);
		};

		this.addTodo = function($event){
			var label = $event.label;
			_self.todos = TodosService.addTodo(label);
		};

        // this.addTodo = function($event){
        //     var label = $event.label;
        //     TodosService.addTodo(label).then(function successCallback(response) {
        //         _self.todos = response;
        //     }, function errorCallback(error) {
        //         console.log(error);
        //     });
        //     // _self.todos = TodosService.addTodo(label);
        // };
	}

})();

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
