//Check off specific todo by licking

$("ul").on("click","li",function(){
 $(this).toggleClass("completed");
});

//click on x to delete todo
$("ul").on("click","span",function(event){
	event.stopPropagation();
	$(this).parent().fadeOut(function(){
		$(this).remove();
	});
});

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//grabbing new todo text
		var todoText = $(this).val()
		//creat a new li and add to ul
		$("ul").append("<li><span><i class='fa fa-trash'></i></span>"+todoText+"</li>");
		$(this).val("");
	}
});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
})
