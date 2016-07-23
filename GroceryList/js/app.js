var app = angular.module('groceryListApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'views/groceryList.html',
		controller: 'HomeController'
	})
	.when('/addItem',{
		templateUrl: 'views/addItem.html',
		controller: 'GroceryListItemController'
	})
	.when('/addItem/edit/:id',{
		templateUrl: 'views/addItem.html',
		controller: 'GroceryListItemController'
	})
	.otherwise({
		redirectTo: '/'
	})
});

app.service("GroceryService",function(){
	var groceryService = {};

	groceryService.groceryItems = [
	{id:1, completed: true, itemName: 'milk', date: new Date("August 1, 2016 11:13:00")},
	{id:2, completed: true, itemName: 'cookies', date: new Date("August 2, 2016 11:13:00")},
	{id:3, completed: true, itemName: 'ice cream', date: new Date("August 3, 2016 11:13:00")},
	{id:4, completed: true, itemName: 'potatoes', date: new Date("August 4, 2016 11:13:00")},
	{id:5, completed: true, itemName: 'cereal', date: new Date("August 5, 2016 11:13:00")},
	{id:6, completed: true, itemName: 'bread', date: new Date("August 6, 2016 11:13:00")},
	{id:7, completed: true, itemName: 'eggs', date: new Date("August 7, 2016 11:13:00")},
	{id:8, completed: true, itemName: 'tortillas', date: new Date("August 8, 2016 11:13:00")}
	];

	groceryService.findById = function(id){
		for(var item in groceryService.groceryItems){
			if(groceryService.groceryItems[item].id === id){
				console.log(groceryService.groceryItem);
				return groceryService.groceryItems[item];
			}
			
		}
	};

	groceryService.getNewId = function(){
		if(groceryService.newId){
			groceryService.newId++;
			return groceryService.newId;
		}
		else{
			var maxId = _.max(groceryService.groceryItems,function(entry){
				return entry.id;
			})
			groceryService.newId = maxId.id+1;
			return groceryService.newId;
		}
	};
	groceryService.removeItem =function(entry){
		var index = groceryService.groceryItems.indexOf(entry);

		groceryService.groceryItems.splice(index,1);
	};
	groceryService.markCompleted = function(entry){
		entry.completed = !entry.completed;
	}
	groceryService.save = function(entry){
		var updateItem = groceryService.findById(entry.id);
		if(updateItem){
			updateItem.completed = entry.completed;
			updateItem.itemName = entry.itemName;
			updateItem.date = entry.date;
		}
		else{
			entry.id = groceryService.getNewId();
			groceryService.groceryItems.push(entry);
		}
		
	};

	return groceryService;
});

app.controller("HomeController",['$scope','GroceryService',function($scope,GroceryService){
	$scope.appTitle = "Grocery List";
	$scope.groceryItems = GroceryService.groceryItems;
	$scope.removeItem = function(entry){
		GroceryService.removeItem(entry);
	}

	$scope.markCompleted = function(entry){
		GroceryService.markCompleted(entry);
	}

}]);

app.controller("GroceryListItemController",['$scope','$routeParams','$location','GroceryService',function($scope,$routeParams,$location,GroceryService){
	if(!$routeParams.id){
		$scope.groceryItem = {id:0,completed:false,itemName:"",date: new Date()};
	}
	else{
		$scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id)));
	}
	$scope.save = function(){
		GroceryService.save($scope.groceryItem);
		$location.path('/');
	}

}]);



app.directive("rpGroceryItem",function(){
	return{
		restrict: "E",
		templateUrl: "views/groceryItem.html"
	}
});