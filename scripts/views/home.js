var Home = (function() {

	var myFirebaseRef = new Firebase("https://practicesafebrowsing.firebaseIO.com");

	var homeData = {
		title: 'Practice Safe Browsing',
		desc: 'Your online activity is being monitored, tracked and recorded. It’s time you take back your privacy with tools that do just that.'
	};

	var faqData = {
		title: 'Frequently Asked Questions',
		list: [
				{
					question: 'What\'s the deal?',
					answer: 'Our online privacy and security is extremely important. That’s why we’ve curated a list of tools to help keep you safe online.'
				},
				{
					question: 'Why do I care?',
					answer: 'Whether it’s government, advertisers or hackers, your information and activity on the web is being monitored and recorded.'
				},
				{
					question: 'Have nothing to hide?',
					answer: 'Believe it or not, everyone has something to hide. <a href="https://www.eff.org/deeplinks/2013/11/busting-eight-common-excuses-nsa-surveillance" target="_blank">Read this article</a> by the Electronic Frontier Foundation to learn more.'
				}
		]
	};

	var submitData = {
		title: 'Submit a tool',
		desc: 'If you know a tool that should be added to our list, send a tweet to @climbrick.'
	};


	// partials
	var homePartial = $('#partial-banner-home').html();
		infoPartialCompiled = _.template( homePartial );

	var faqPartial = $('#partial-banner-faq').html();
		faqPartialCompiled = _.template( faqPartial );

	var submitPartial = $('#partial-banner-submit').html();
		submitPartialCompiled = _.template( submitPartial );

	var toolsPartial = $('#partial-tools').html();
		toolsPartialCompiled = _.template( toolsPartial );


	// DOM Handlers
	$('body').on('click','#nav-home', function(e) {
		e.preventDefault();

		$('#banner').html(infoPartialCompiled( homeData )).hide().fadeIn("slow");
	});

	$('body').on('click','#nav-faq', function(e) {
		e.preventDefault();

		$('#banner').html(faqPartialCompiled( faqData )).hide().fadeIn("slow");
	});

	$('body').on('click','#nav-submit', function(e) {
		e.preventDefault();

		$('#banner').html(submitPartialCompiled( submitData )).hide().fadeIn("slow");
	});

	// filter navigation buttons
	$('body').on('click', '#filter-all', function(e) {
		e.preventDefault();

		filterToSelect = "all";
		setFilter(filterToSelect);
	});

	$('body').on('click', '#filter-browser', function(e) {
		e.preventDefault();

		filterToSelect = "browser";
		setFilter(filterToSelect);
	});

	$('body').on('click', '#filter-chat', function(e) {
		e.preventDefault();

		filterToSelect = "chat";
		setFilter(filterToSelect);
	});

	$('body').on('click', '#filter-email', function(e) {
		e.preventDefault();

		filterToSelect = "email";
		setFilter(filterToSelect);
	});

	$('body').on('click', '#filter-encryption', function(e) {
		e.preventDefault();

		filterToSelect = "encryption";
		setFilter(filterToSelect);
	});

	$('body').on('click', '#filter-os', function(e) {
		e.preventDefault();

		filterToSelect = "OS";
		setFilter(filterToSelect);
	});

	$('body').on('click', '#filter-storage', function(e) {
		e.preventDefault();

		filterToSelect = "storage";
		setFilter(filterToSelect);
	});

	// set filter
	function setFilter( filterToSelect ) {
  	// Retrieving data from Firebase
  	myFirebaseRef.once("value", function(snapshot) {
  		var data = snapshot.val();

  		for( var filter in data ) {
  			if ( filter !== filterToSelect ) {
  				continue;
  			}
		    currentFilter = data[ filter ];
		    $('#tools').html(toolsPartialCompiled( currentFilter )).hide().fadeIn("slow");
  		}
  	});
  }

	// sets an active class on filters when clicked
	function setActive() {
		$('#filters').on('click','li',function(){
			$('#filters li.active').removeClass('active');
			$(this).addClass('active');
		});
	}

	setActive();

	// KICKSTART VIEW
	function initHome() {

		// load banner content
		$('#banner').html(infoPartialCompiled( homeData ));

		// load main content
		setFilter('all');

	}
	return {
		init: initHome
	};
})();
