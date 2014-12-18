
var openshift = Alloy.Globals.openshift;
var faceLogin = Alloy.Globals.facelogin;
var checkLogin = Alloy.Globals.checklogin;
var facebook = Alloy.Globals.Facebook;
facebook.appid = Alloy.CFG.facebookAppId;
facebook.setForceDialogAuth(false);

facebook.permissions = ['publish_stream', 'read_stream'];
$.fbButton.style = facebook.BUTTON_STYLE_WIDE;

facebook.addEventListener('login',loginFacebook);

function loginFacebook(e){
	if(e.success){
		var apiURL = openshift + faceLogin + facebook.getUid();
		var request = Ti.Network.createHTTPClient();
		request.open('GET',apiURL);
		request.send();
		request.onload = loadFacebook;
		request.onerror = errorFacebook;
		facebook.authorize();
		changeView('searchWindow');
	}
}

function loadFacebook(){
	Ti.API.info(this.status);
}

function errorFacebook(){
	Ti.API.info(this.status);
}

function changeView(view){
	var conView = Alloy.Globals.contentView;
	var currentView = Alloy.createController(view).getView();
	conView.removeAllChildren();
	conView.add(currentView);
	

}
