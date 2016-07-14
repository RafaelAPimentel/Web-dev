
		$( document ) .ready(function() {
		
			$(  "a" ) .click(function( event ) {
			
				alert( "Thanks for visiting!"  );
			
			});
			
			$("button").click(
				function(){
					$("h1").hide();
			});
			
			$("#div").hover(
					
				function () {
					$(this).css({"background-color":"red"});
					$(this).text("click the toggle button and hover over the green box");
					},
					
				function() {
					$(this).css({"background-color":"blue"});
				});
			
			
			$('#div').dblclick(
				
				function() {
					$(this).css({"background-color":"green"});
				});
			
			$('#div').click(
				
				function (){
					$(this).css({"background-color":"purple"});
				});
				
			$("#move").hover(function(){
				$(this).animate({left: "900px"}, "slow");
				$(this).animate({fontSize: '2.5em'}, "slow");
				$(this).text("nice little trick huh?");
			
			})
			
			$("#toggle").click(function(){
				$("#toggle1").toggle("slow");
			})
		});
