if(OS_IOS){
	$.winIdioma.backgroundColor = 'white';
}

function esClick(){
	Alloy.CFG.lang = 'es';
	changeWindow('mainWindow');
}
function enClick(){
	Alloy.CFG.lang = 'en';
	changeWindow('mainWindow');
}
function poClick(){
	Alloy.CFG.lang = 'po';
	changeWindow('mainWindow');
}

function changeWindow(view){
	
	var window = Alloy.createController(view).getView();
	window.open();
	
}