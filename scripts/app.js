(function(){

	var Views = {};

	Views.home = function home() {
		Home.init();
	};

	Routes.register('home', Views.home );

	Routes.init('home');
	
})();