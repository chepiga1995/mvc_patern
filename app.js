var madel = {
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
	}
};

