
var lang = Alloy.CFG.lang;

switch(lang){
	case 'po':
	$.searchText.hintText = 'Digite busca marca';
	var slideMenu = Alloy.Globals.slideMenuPO;
	break;
	case 'en':
	$.searchText.hintText = 'Enter trademark search';
	var slideMenu = Alloy.Globals.slideMenuEN;
	break;
	default:
	$.searchText.hintText = 'Ingrese marca a buscar';
	var slideMenu = Alloy.Globals.slideMenuES;
}

modificaMenuIdioma();
//$.mainWindow.add($.searchView);
function changeView(view){
	var conView = Alloy.Globals.contentView;
	var currentView = Alloy.createController(view).getView();
	conView.removeAllChildren();
	conView.add(currentView);
	

}
// 

function searchMarca(e){
var openshift = Alloy.CFG.openshift,
 restMarcas = Alloy.CFG.marcas, 
 texto = escape(e.value),
 APIurl = openshift + restMarcas + texto.toLowerCase();
	
	var request = Titanium.Network.createHTTPClient();
		request.open('GET', APIurl);
		request.send();
		//this method will process the remote data
		request.onload = creaTabla;
		request.onerror = errorAlert;
}

function creaTabla(){
	
	var responseData = this.responseText;
	var resp = JSON.parse(responseData);
	var data = [];
	var marcas = resp.marcas;
	
	for(var i=0;i<marcas.length;i++){
		//Crea Fila
		var row = Ti.UI.createTableViewRow({
					hasChild: true,
					className: 'recipe-row',
					backgroundColor: 'white',
					selectedBackgroundColor :'yellow',
					backgroundFocusedColor : 'blue',
					_marca : marcas[i]
					
				});
		// Dato Fila
		var titleLabel = Ti.UI.createLabel({
					text: marcas[i],
					font: {
						fontSize: 14,
						fontWeight: 'bold'
						
					},
					left: 50,
					top: 10,
					height: 20,
					width: 210,
					color: 'black'
				});
		row.add(titleLabel);
		data.push(row);
	}
	
	$.tblMarca.setData(data);
	$.tblMarca.setVisible(true);
	
}

function tblClick(e){
	
	Alloy.Globals.marca = e.rowData._marca;
	enabledLeftRow("modelWindow");
	changeView("modelWindow");
	
}

function errorAlert(){
	var dialog = Alloy.Globals.mensajeError;
	var showError = Ti.UI.createAlertDialog(dialog);
	showError.show();
}

function enabledLeftRow(customView){
	var tableView = Alloy.Globals.leftTableView;
	for(var i =0;i<tableView.getSize();i++){
		if(customView=tableView.getIndex().customView){
			var row = tableView.getIndex();
			row.touchEnabled = true;
			break;
		}
	}
}

function modificaMenuIdioma(){
	var leftTableView=Alloy.Globals.leftTableView;
	var leftData=[];
	leftData[0] = createLeftSection();
	leftTableView.data = leftData;
	
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

