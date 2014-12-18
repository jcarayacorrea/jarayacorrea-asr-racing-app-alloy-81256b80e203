var lang = Alloy.CFG.lang;

var slideMenu = Alloy.Globals.slideMenuES;

if(OS_ANDROID){
	$.win.fullscreen = true;
	
}
//$.ds.contentview.setWidth(Ti.Platform.displayCaps.getPlatformWidth);
var openshift = Alloy.CFG.openshift,
 restConsulta = Alloy.CFG.consulta;
 
var leftData = [];
var rightData = [];


var slideRight = Alloy.Globals.slideRight;

 function changeRightMenu(){
	if(OS_IOS){
	var idM = Ti.Platform.getMacaddress();
	var idMovil= idM.split('-').join('');
}else{
	var idMovil = Ti.Platform.getMacaddress();
}
Alloy.Globals.idMovil = idMovil;
var ApiURlConsulta = openshift + restConsulta + idMovil;
var request = Titanium.Network.createHTTPClient();
request.open('GET',ApiURlConsulta);
request.send();
request.onload = getDataConsulta;

	
}
changeRightMenu();

function getDataConsulta(){
	var response = this.responseText;
	var resp = JSON.parse(response);
	var consulta = resp.consultas;
	var data =[];
	if(consulta.length>0){
	for(var i=0;i<consulta.length;i++){
		var datos = {title: consulta[i].marca+ ' '+consulta[i].modelo+' '+consulta[i].annio+' '+consulta[i].categoria, idAuto:consulta[i].idAuto,marca:consulta[i].marca,modelo:consulta[i].modelo,annio:consulta[i].annio,categoria:consulta[i].categoria};
		data.push(datos);
	}
	
	
	if(data.length>0){
		slideRight = data;
		rightData[0] = createRightSection();
	$.ds.rightTableView.data = rightData;
	}
	}
	
}

Alloy.Globals.rightTableView = $.ds.rightTableView;
Alloy.Globals.leftTableView = $.ds.leftTableView;

exports.loadView = function(view){
var currentView = Alloy.createController(view).getView();
Alloy.Globals.contentView = $.ds.contentview;
$.ds.contentview.add(currentView);
}

function createLeftSection() {
	var section = Ti.UI.createTableViewSection();

	var customView = Ti.UI.createView({
		height : 'auto',
		backgroundColor : "#EEE",
		backgroundGradient : {
			type : "linear",
			startPoint : {
				x : "0%",
				y : "0%"
			},
			endPoint : {
				x : "0%",
				y : "100%"
			},
			colors : [{
				color : "#EEE",
				offset : 0.0
			}, {
				color : "#CCC",
				offset : 1.0
			}]
		}
	});

	var customLabel = Ti.UI.createLabel({
		top : 8,
		bottom : 8,
		left : 10,
		right : 10,
		height : 'auto',
		text : 'HEADER',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#666666'
	});

	customView.add(customLabel);

	section.headerView = customView;
	for (var j = 0; j < slideMenu.length; j++) {
		var args =slideMenu[j];
		section.add(Alloy.createController('menurowleft', args).getView());
	}

	return section;
}

function createRightSection() {
	var section = Ti.UI.createTableViewSection();

	var customView = Ti.UI.createView({
		height : 'auto',
		backgroundColor : "#EEE",
		backgroundGradient : {
			type : "linear",
			startPoint : {
				x : "0%",
				y : "0%"
			},
			endPoint : {
				x : "0%",
				y : "100%"
			},
			colors : [{
				color : "#EEE",
				offset : 0.0
			}, {
				color : "#CCC",
				offset : 1.0
			}]
		}
	});

	var customLabel = Ti.UI.createLabel({
		top : 8,
		bottom : 8,
		left : 10,
		right : 10,
		height : 'auto',
		text : 'HEADER',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#666666'
	});

	customView.add(customLabel);

	section.headerView = customView;
	for (var j = 0; j < slideRight.length; j++) {
		var args =slideRight[j];
		section.add(Alloy.createController('menurowright', args).getView());
	}

	return section;
}

function rowSelectLeft(e) {
	var opened=false;
	var currentView = $.ds.contentview.getChildren();
	if (currentView.id != e.row.customView) {
		$.ds.contentview.removeAllChildren();
		switch(e.row.customView){
			case 'searchWindow':
			Alloy.Globals.marca = '';
			Alloy.Globals.modelo = '';
			Alloy.Globals.anho = '';
			Alloy.Globals.idAuto= '';
			opened = true;
			break;
			case 'modelWindow':
			if(Alloy.Globals.marca != ''){
				opened = true;
			}
			break;
			case 'anhoWindow':
			if(Alloy.Globals.marca != '' && Alloy.Globals.modelo != ''){
				opened = true;
			}
			break;
			case 'tiposWindow':
			if(Alloy.Globals.marca != '' && Alloy.Globals.modelo != ''  && Alloy.Globals.anho != ''){
				opened = true;
			}
			break;
			case 'detailWindow':
			if(Alloy.Globals.idAuto != '') {
				opened = true;
			}
			break;
			case 'imagenWindow':
			if(Alloy.Globals.idAuto != '') {
				opened = true;
			}
			break;
			case 'idiomaWindow':
			opened = true;
			break;
			case 'aboutDialog':
			
			switch(lang){
				case 'po':
				var creadoPor ='Creado por:\n';
				break;
				case 'en':
				var creadoPor ='Create by:\n';
				break;
				default:
				var creadoPor ='Creado por:\n';
				break;
			}
			var dialog = Ti.UI.createAlertDialog({
		title: 'Asr Racing',
		message:'version 1.0\n'+
				creadoPor+
				'Juan C. Araya\n'+
				'Daniel Silva\n'+
				'Alexis Saavedra\n'
		});
		dialog.show();
		if(currentView.id!=null){
			currentView = Alloy.createController(currentView.id).getView();
		$.ds.contentview.add(currentView);
		}else{
			currentView = Alloy.createController('searchWindow').getView();
		$.ds.contentview.add(currentView);
		}
		break;
		}
		if(opened){
		currentView = Alloy.createController(e.row.customView).getView();
		$.ds.contentview.add(currentView);
		}else{
			
		}
		
	}
}

function rowSelectRight(e) {
	//Tener en memoria busqueda anterior
	Alloy.Globals.idAuto = e.row.idAuto;
	Alloy.Globals.marca = e.row.marca;
	Alloy.Globals.modelo = e.row.modelo;
	Alloy.Globals.anho = e.row.annio;
	Alloy.Globals.categoria = e.row.categoria;
	var currentView = $.ds.contentview.getChildren();
		$.ds.contentview.removeAllChildren();
		currentView = Alloy.createController("detailWindow").getView();
		$.ds.contentview.add(currentView);
	}



	leftData[0] = createLeftSection();
	


// Pass data to widget leftTableView and rightTableView

$.ds.leftTableView.data = leftData;



exports.loadView("searchWindow");

// Swap views on menu item click
$.ds.leftTableView.addEventListener('click', function selectRow(e) {
	rowSelectLeft(e);
	$.ds.toggleLeftSlider();
});
$.ds.rightTableView.addEventListener('click', function selectRow(e) {
	rowSelectRight(e);
	$.ds.toggleRightSlider();
});

// Set row title highlight colour (left table view)
var storedRowTitle = null;
$.ds.leftTableView.addEventListener('touchstart', function(e) {
	storedRowTitle = e.row.customTitle;
	storedRowTitle.color = "#FFF";
});
$.ds.leftTableView.addEventListener('touchend', function(e) {
	storedRowTitle.color = "#666";
});
$.ds.leftTableView.addEventListener('scroll', function(e) {
	if (storedRowTitle != null)
		storedRowTitle.color = "#666";
});


Ti.App.addEventListener("sliderToggled", function(e) {
	if (e.direction == "right") {
		$.ds.leftMenu.zIndex = 2;
		$.ds.rightMenu.zIndex = 1;
	} else if (e.direction == "left") {
		$.ds.rightMenu.zIndex = 2;
		$.ds.leftMenu.zIndex = 1;
		
	}
});


$.win.addEventListener('android:back',function(){});

if (Ti.Platform.osname === 'iphone')
	$.win.open({
		transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
else
	$.win.open();
