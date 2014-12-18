var lang = Alloy.CFG.lang;
switch(lang){
	case 'po':
	$.tiposLabel.text = 'Selecione uma Categoria';
	$.btnBack.title ='Voltar';
	break;
	case 'en':
	$.tiposLabel.text = 'Select a Category';
	$.btnBack.title ='Back';
	break;
}

var openshift = Alloy.CFG.openshift,
 restInfo = Alloy.CFG.info,
  marca = Alloy.Globals.marca,
  modelo = Alloy.Globals.modelo,
 annio = Alloy.Globals.anho,
 APIurl = openshift + restInfo + marca +'/'+modelo+'/'+annio;
	
	var request = Titanium.Network.createHTTPClient();
		request.open('GET', APIurl);
		request.send();
		//this method will process the remote data
		request.onload = creaTabla;
		
$.descLabel.setText(marca+'/'+modelo+'/'+annio);
		
function creaTabla(){
	
	var responseData = this.responseText;
	var resp = JSON.parse(responseData);
	var tipos = resp.tipos;
	var data = [];
	
	for(var i=0;i<tipos.length;i++){
		//Crea Fila
		
		var row = Ti.UI.createTableViewRow({
					hasChild: true,
					className: 'recipe-row',
					backgroundColor: 'white',
					backgroundSelectedColor :'yellow',
					backgroundFocusedColor : 'blue',
					_tipoAuto : tipos[i].categoria,
					_autoId: tipos[i].id
					//_brewery: response.data[i].breweries[0].name
				});
		// Dato Fila
		var titleLabel = Ti.UI.createLabel({
					text:tipos[i].categoria,
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
	
	$.tblTipos.setData(data);
	$.tblTipos.setVisible(true);
	
}


function tblClick(e){
	
	Alloy.Globals.idAuto = e.rowData._autoId;
	Alloy.Globals.categoria = e.rowData._tipoAuto;
	changeView("detailWindow");
	

}

function changeView(view){
	var conView = Alloy.Globals.contentView;
	var currentView = Alloy.createController(view).getView();
	conView.removeAllChildren();
	conView.add(currentView);
	

}



function backPage(){
	changeView("anhoWindow");
}