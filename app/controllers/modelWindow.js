/*exports.baseController = "mainWindow";
$.mainWindow.add($.modelView);
$.mainWindow.addEventListener('open',winOpen);*/
//exports.baseController = "mainWindow";
var lang = Alloy.CFG.lang;
switch(lang){
	case 'po':
	$.modelLabel.text = 'Selecione o Modelo';
	$.btnBack.title ='Voltar';
	break;
	case 'en':
	$.modelLabel.text = 'Select Model';
	$.btnBack.title ='Back';
	break;
}
	

var openshift = Alloy.CFG.openshift,
 restModelo = Alloy.CFG.modelo,
 marca = Alloy.Globals.marca,
 APIurl = openshift + restModelo + marca;
	
	var request = Titanium.Network.createHTTPClient();
		request.open('GET', APIurl);
		request.send();
		//this method will process the remote data
		request.onload = creaTabla;
		
$.descLabel.setText(marca);

function changeView(view){
	var conView = Alloy.Globals.contentView;
	var currentView = Alloy.createController(view).getView();
	conView.removeAllChildren();
	conView.add(currentView);
	

}


function creaTabla(){
	
	var responseData = this.responseText;
	var resp = JSON.parse(responseData);
	var data = [];
	var modelo = resp.modelos;
	
	for(var i=0;i<modelo.length;i++){
		//Crea Fila
		var row = Ti.UI.createTableViewRow({
					hasChild: true,
					className: 'recipe-row',
					backgroundColor: 'white',
					backgroundSelectedColor :'yellow',
					backgroundFocusedColor : 'blue',
					_modelo : modelo[i]
					//_brewery: response.data[i].breweries[0].name
				});
		// Dato Fila
		var titleLabel = Ti.UI.createLabel({
					text: modelo[i],
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
	
	$.tblModelo.setData(data);
	$.tblModelo.setVisible(true);
	
}


function tblClick(e){
	
	Alloy.Globals.modelo = e.rowData._modelo;
	changeView("anhoWindow");
	

}

function backPage(){
	changeView("searchWindow");
}
