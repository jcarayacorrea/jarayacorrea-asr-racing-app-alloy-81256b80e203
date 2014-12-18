if(OS_ANDROID){
	$.imLogo.image = Ti.Filesystem.resourcesDirectory+ "logo_asr_racing2.png";
}

function esClick(){
	Alloy.CFG.lang = 'es';
	changeView('searchWindow');
}
function enClick(){
	Alloy.CFG.lang = 'en';
	changeView('searchWindow');
}
function poClick(){
	Alloy.CFG.lang = 'po';
	changeView('searchWindow');
}

function changeView(view){
	var conView = Alloy.Globals.contentView;
	var currentView = Alloy.createController(view).getView();
	conView.removeAllChildren();
	conView.add(currentView);
}