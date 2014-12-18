// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.isMenuOpen = false;
Alloy.Globals.marca = '';
Alloy.Globals.modelo = '';
Alloy.Globals.anho = '';
Alloy.Globals.idAuto= '';
Alloy.Globals.idMovil= '';
Alloy.Globals.slideMenuES=[{title : 'Buscar',customView : 'searchWindow'},
				{title : 'Modelo', customView : 'modelWindow'},
				{title : 'Año', customView : 'anhoWindow'},
    			{title : 'Categoria', customView : 'tiposWindow'},
    			{title : 'Características', customView : 'detailWindow'},
    			{title : 'Fotos', customView : 'imagenWindow'},
    			{title : 'Idioma', customView : 'idiomaWindow'},
    			{title : 'Acerca de', customView : 'aboutDialog'}
    			];
    			
Alloy.Globals.slideMenuEN=[{title : 'Search',customView : 'searchWindow'},
				{title : 'Model', customView : 'modelWindow'},
				{title : 'Year', customView : 'anhoWindow'},
    			{title : 'Category', customView : 'tiposWindow'},
    			{title : 'Features', customView : 'detailWindow'},
    			{title : 'Pictures', customView : 'imagenWindow'},
    			{title : 'Language', customView : 'idiomaWindow'},
    			{title : 'About', customView : 'aboutDialog'}];
    			
Alloy.Globals.slideMenuPO=[{title : 'Procurar',customView : 'searchWindow'},
				{title : 'Modelo', customView : 'modelWindow'},
				{title : 'Ano', customView : 'anhoWindow'},
    			{title : 'Categoria', customView : 'tiposWindow'},
    			{title : 'Características', customView : 'detailWindow'},
    			{title : 'Fotos', customView : 'imagenWindow'},
    			{title : 'Língua', customView : 'idiomaWindow'},
    			{title : 'Cerca de', customView : 'aboutDialog'}];
Alloy.Globals.mensajeError ={title:'Error',
buttonNames:'OK',
message:'No se pudo conectar con el servidor'};
Alloy.Globals.slideRight=[];
Alloy.Globals.marcaAnt = '';
Alloy.Globals.modeloAnt = '';
Alloy.Globals.anhoAnt = '';
Alloy.Globals.idAutoAnt= '';
Alloy.Globals.Facebook = require('facebook');
