var lang = Alloy.CFG.lang;
switch(lang){
	case 'po':
	$.anhoLabel.text = 'Selecione Ano';
		$.btnBack.title ='Voltar';
	break;
	case 'en':
	$.anhoLabel.text = 'Select Year';
	$.btnBack.title ='Back';
	break;
}


	

var openshift = Alloy.CFG.openshift,
 restAnho = Alloy.CFG.annio,
 marca = Alloy.Globals.marca,
 modelo = Alloy.Globals.modelo,
 APIurl = openshift + restAnho + marca +'/'+modelo;
	var request = Ti.Network.createHTTPClient();
	var request = Titanium.Network.createHTTPClient();
		request.open('GET', APIurl);
		request.send();
		//this method will process the remote data
		request.onload = creaTabla;

$.descLabel.setText(marca+'/'+modelo);

function creaTabla(){
	
	var responseData = this.responseText;
	var resp = JSON.parse(responseData);
	var data = [];
	var annio = resp.Annio;
	for(var i=0;i<annio.length;i++){
		//Crea Fila
		var row = Ti.UI.createTableViewRow({
					hasChild: true,
					className: 'recipe-row',
					backgroundColor: 'white',
					backgroundSelectedColor :'yellow',
					backgroundFocusedColor : 'blue',
					_annio : parseInt(annio[i])
					//_brewery: response.data[i].breweries[0].name
				});
		// Dato Fila
		var titleLabel = Ti.UI.createLabel({
					text: parseInt(annio[i]),
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
	
	$.tblAnho.setData(data);
	$.tblAnho.setVisible(true);
	
}

function tblClick(e){
	
	Alloy.Globals.anho = e.rowData._annio;
	changeView("tiposWindow");
	

}

function changeView(view){
	var conView = Alloy.Globals.contentView;
	var currentView = Alloy.createController(view).getView();
	conView.removeAllChildren();
	conView.add(currentView);
	

}
function backPage(){
	changeView("modelWindow");
}