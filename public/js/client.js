$(() => {
	function appendToList(notes) {
		var list = [];
		var content, note;
		for(var i in notes) {
			note = notes[i];
			content = '<div><h4>'+note['title']+' <small>(by '+note['author']+')</small> <a class="pull-right" href="#" data-note="'+note['_id']+
			'"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></h4></div>'
			+'<p>'+note['text']+'</p>';
			list.push('<li class="list-group-item">'+content+'</li>');
		}
		$('.list-group').append(list);
	}

	//Downoload notes and append to the list
	$.get('/notes', appendToList);	

	//Delete the note
	$('.list-group').on('click','a[data-note]', (event) => {
		if(!confirm('Are you sure?')) {
			return false;
		}

		var target = $(event.currentTarget);

		$.ajax({
			type: 'DELETE',
			url: '/notes/'+target.data('note')
		}).done(() => {
			target.parents('li').remove();
		});
	});
	//Add a new note
	$('form').on('submit', (event) => {
		event.preventDefault();
		var form = $('form');
		var noteData = form.serialize();

		$.ajax({
			type: 'POST',
			url: '/notes',
			data: noteData
		}).done((note) => {
			appendToList([note]);
			form.trigger('reset');
		});
	});
});