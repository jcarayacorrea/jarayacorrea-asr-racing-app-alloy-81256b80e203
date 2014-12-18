var openshift = Alloy.CFG.openshift,
 restImagen = Alloy.CFG.imagen,
 fotoMedia = Alloy.CFG.fotos,
  idAuto = Alloy.Globals.idAuto;
 var imagenAct =0;
 var imagenes;
 
 var lang = Alloy.CFG.lang;
 
 if(OS_ANDROID){
 	$.btnShare.backgroundImage = Ti.Filesystem.resourcesDirectory + 'logo_facebook.png';
 	$.btnShare.backgroundSelectedImage = Ti.Filesystem.resourcesDirectory + 'logo_facebook.png';
 }
 
 switch(lang){
 	case 'po':
 	$.btnBack.title = 'Volta';
 	$.btnTurnBack.title ='Voltar';
 	$.btnFwd.title ='Seguinte';
 	$.shareLabel.text = 'Ação';
 	break;
 	case 'en':
 	$.btnBack.title = 'Back';
 	$.btnTurnBack.title ='Back';
 	$.btnFwd.title ='Next';
 	$.shareLabel.text = 'Share';
 	break;
 	default:
 	$.btnBack.title = 'Atras';
 	$.btnTurnBack.title ='Volver';
 	$.btnFwd.title ='Siguiente';
 	$.shareLabel.text = 'Compartir';
 	break;
 }
 
var marca = Alloy.Globals.marca,
  modelo = Alloy.Globals.modelo,
 annio = Alloy.Globals.anho,
 categoria = Alloy.Globals.categoria;

var facebook = Alloy.Globals.Facebook;


var APIurl = openshift + restImagen + idAuto;
var request = Titanium.Network.createHTTPClient();
request.open('GET', APIurl);
request.send();
//this method will process the remote data
request.onload = iniciaImagen;

$.descLabel.setText(marca +'/'+ modelo +'/'+ annio+'/'+categoria);

function iniciaImagen(){
	var responseData = this.responseText;
	var resp = JSON.parse(responseData);
	 imagenes = resp.imagenes;
	
	$.imagen.image = fotoMedia + imagenes[imagenAct];
	
}

function backClick(){
	imagenAct--;
	if(imagenAct<0){
		imagenAct =imagenes.length-1;
	}
	$.imagen.image = fotoMedia + imagenes[imagenAct];
}

function leftClick(){
	imagenAct++;
	if(imagenAct>imagenes.length-1){
		imagenAct =0;
	}
	$.imagen.image = fotoMedia + imagenes[imagenAct];
}

function changeView(view){
	var conView = Alloy.Globals.contentView;
	var currentView = Alloy.createController(view).getView();
	conView.removeAllChildren();
	conView.add(currentView);
	

}

function backPage(){
	changeView("detailWindow");
}

function shareClick(){
	
	switch(lang){
		case 'po':
		var data = {
        name : "Asr Racing",
    	caption : "Asr Racing App Facebook",
    	picture : $.imagen.getImage(),
    	description : "A aplicação caracteriza a encontrar o seu próximo carro" 
		};
		break;
		case 'en':
		var data = {
        name : "Asr Racing",
    	caption : "Asr Racing App Facebook",
    	picture : $.imagen.getImage(),
    	description : "The application features to find your next car" 
		};
		break;
		default:
		var data = {
        name : "Asr Racing",
    	caption : "Asr Racing App Facebook",
    	picture : $.imagen.getImage(),
    	description : "La aplicación para saber las características de tu próximo auto" 
		};
		break;
	}
	
	facebook.appid = Alloy.CFG.facebookAppId;
	facebook.setForceDialogAuth(false);

	facebook.permissions = ['email','publish_stream', 'read_stream'];
	

	facebook.addEventListener('login',loginFacebook);
	facebook.dialog('feed',data,sendToFacebook);
}

function sendToFacebook(e){
	if (e.success && e.result) {
		switch(lang){
			case 'po':
			var dialog = Ti.UI.createAlertDialog({
			title:'Facebook',
			message:'Compartilhado com sucesso'
		});
		break;
			case 'en':
			var dialog = Ti.UI.createAlertDialog({
			title:'Facebook',
			message:'Shared successfully'
		});
		break;
			default:
			var dialog = Ti.UI.createAlertDialog({
			title:'Facebook',
			message:'Compartido exitosamente'
		});
		break;
		}
		dialog.show();
         
}
}
function loginFacebook(e){
	if(e.success){
		
	}
}

function comClick(){
	changeView("ComentWindow");
}
