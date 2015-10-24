(function(){
	var list_template = '<button type="button" class="btn btn-primary"'
						+ '>{{name}}</button>';
	var view_template = '<h3 class="cat-name">{{name}}</h3>'
						+ '<img class="cat-img" src="{{src}}">'
						+ '<span class="cat-clicks">{{clicks}}</span>'
						+ '<div class="clear"></div>'
						+ '<button type="button" class="btn btn-default">Admin</button>';
	var admin_template = '<form>'
						 + '<div class="form-group">'
						 + '  <label for="exampleInputName">Cat name</label>'
						 + '  <input type="text" value="{{name}}" class="form-control" id="exampleInputName" placeholder="Cat name">'
						 + '</div>'
						 + '<div class="form-group">'
						 + '  <label for="exampleInputSrc">Cat image</label>'
						 + '   <input type="text" value="{{src}}" class="form-control" id="exampleInputSrc" placeholder="Cat image">'
						 + ' </div>'
						 + ' <div class="form-group">'
						 + '   <label for="exampleInputClicks">Cat clicks</label>'
						 + '   <input type="number" value="{{clicks}}" class="form-control" id="exampleInputClicks" placeholder="Cat clicks">'
						 + ' </div>'
						 + ' <button type="button" class="btn btn-success">Change</button>'
						 + ' <button type="button" class="btn btn-danger">Cancel</button>'
						 + '</form>';  					
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
		_is_admin_open: 0,
		addClicks: function(){
			this._data[this._selected].clicks++;
		},
		select: function(number){
			this._selected = number;
		},
		adminOpen: function(){
			this._is_admin_open = 1;
		},
		adminClose: function(){
			this._is_admin_open = 0;
		},
		getCurrentStatus: function(){
			return this._is_admin_open;
		},
		getData: function(){
			return this._data;
		},
		getSelected: function(){
			return this._selected;
		},
		getCurrentData: function(){
			return this._data[this._selected];
		},
		setData: function(name, src, clicks){
			this._data[this._selected].clicks = clicks;
			this._data[this._selected].src = src;
			this._data[this._selected].name = name;
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
			model.adminClose();
			view_admin.init();
			view_container.init();
			view_container.render(data);
		},
		click_img: function(){
			var data = model.getCurrentData();
			var status = model.getCurrentStatus(); 
			model.addClicks();
			view_container.init();
			view_container.render(data, status);
		},
		save_changes: function(){
			var data = model.getCurrentData();
			var selected = model.getSelected();
			model.setData.apply(model, arguments);
			view_admin.init();
			model.adminClose();
			view_list.init();
			view_list.select(selected);
			view_container.init();
			view_container.render(data);
		},
		open_admin: function(){
			var data = model.getCurrentData();
			view_admin.init();
			model.adminOpen();
			view_admin.render(data);
		},
		cancel: function(){
			var data = model.getCurrentData();
			view_admin.init();
			model.adminClose();
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
	};
	var view_container = {
		init: function(){
			var elem = $("#container");
			elem.empty();
			elem.find('img').off();	
		},
		render: function(data, admin){
			var elem = $("#container");
			var content = view_template;
			for (var key in data){
				content = content.replace('{{' + key + '}}', data[key]);
			}		
			elem.html(content);
			elem.find('img').on('click', this.click);
			if(!admin){
				elem.find('button').on('click', this.admin);
			} else {
				elem.find('button').addClass('active');
			}
		},
		click: function(){
			octopus.click_img();
		},
		admin: function(){
			var elem = $("#container");
			octopus.open_admin();
			elem.find('button').addClass('active');
			elem.find('button').off();
		}
	};
	var view_admin = {
		init: function(){
			var elem = $("#admin");
			elem.empty();
			elem.find('button').off();	
		},
		render: function(data){
			var elem = $("#admin");
			var content = admin_template;
			for (var key in data){
				content = content.replace('{{' + key + '}}', data[key]);
			}		
			elem.html(content);
			elem.find('button.btn-success').on('click', this.save_changes);
			elem.find('button.btn-danger').on('click', this.cancel);
		},
		save_changes: function(){
			//name, src, clicks
			var name = $('#exampleInputName').val();
			var src = $('#exampleInputSrc').val();
			var clicks = $('#exampleInputClicks').val();
			octopus.save_changes(name, src, clicks);
		},
		cancel: function(){
			octopus.cancel();
		}
	};
	
	octopus.init();
})();
