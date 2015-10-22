(function(){
	var list_template = '<button type="button" class="btn btn-primary"'
						+ '>{{name}}</button>';
	var view_template = '<h3 class="cat-name">{{name}}</h3>'
						+ '<img class="cat-img" src="{{src}}">'
						+ '<span class="cat-clicks">{{clicks}}</span>';
	var model = {
		_data:[
			{
				name: "Shit",
				clicks: 0,
				src: "shit.jpg"
			},
			{
				name: "Crap",
				clicks: 0,
				src: "crap.jpg"
			},
			{
				name: "Twins",
				clicks: 0,
				src: "twins.jpg"
			}
		],
		_selected: 0,
		addClicks: function(){
			this._data[this._selected].clicks++;
		},
		select: function(number){
			this._selected = number;
		},
		getData: function(){
			return this._data;
		},
		getSelected: function(){
			return this._selected;
		},
		getCurrentData: function(){
			return this._data[this._selected];
		}
	};

	var octopus = {
		init: function(){
			var selected = model.getSelected();
			var data = model.getCurrentData();
			view_list.init();
			view_list.select(selected);
			view_container.init();
			view_container.render(data);
		},
		getNames: function(){
			return model.getData().map(function(e){return e.name;});
		},
		click_list: function(index){
			model.select(index);
			var data = model.getCurrentData();
			view_list.select(index);
			view_container.init();
			view_container.render(data);
		},
		click_img: function(){
			var data = model.getCurrentData();
			model.addClicks();
			view_container.init();
			view_container.render(data);
		}
	};
	var view_list = {
		init: function(){
			var elem = $("#list");
			elem.on('click', this.click);
			elem.empty();
			var content = '';
			octopus.getNames().forEach(function(element){
				content += list_template.replace('{{name}}', element)
			});
			elem.html(content);
		},
		select: function(number){
			var elem = $("#list");
			elem.find('.active').removeClass('active');
			elem.find('button').eq(number).addClass('active')
		},
		click: function(element){
			octopus.click_list($("#list").find('button')
				   .index($(element.target)));
		}
	}
	var view_container = {
		init: function(){
			var elem = $("#container");
			elem.empty();
			elem.find('img').off();	
		},
		render: function(data){
			var elem = $("#container");
			var content = view_template;
			for (var key in data){
				content = content.replace('{{' + key + '}}', data[key]);
			}		
			elem.html(content);
			elem.find('img').on('click', this.click);
		},
		click: function(){
			octopus.click_img();
		}
	}
	octopus.init();
})();
