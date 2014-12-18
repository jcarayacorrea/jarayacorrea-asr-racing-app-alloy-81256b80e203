var openshift = Alloy.CFG.openshift,
 restDetalle = Alloy.CFG.detalle,
 restInserta = Alloy.CFG.inserta,
  marca = Alloy.Globals.marca,
  modelo = Alloy.Globals.modelo,
 annio = Alloy.Globals.anho,
 categoria = Alloy.Globals.categoria,
  idMovil = Ti.Platform.getMacaddress(),
  restConsulta = Alloy.CFG.consulta;
 idAuto = Alloy.Globals.idAuto;
 
 var lang = Alloy.CFG.lang;
 var seccion;
 var leftMenu = Alloy.Globals.leftTableView;
 leftMenu.setTouchEnabled(true);
 switch(lang){
 	case 'po':
 	$.btnBack.title = 'Voltar';
 	$.btnBasic.title ='Carro Anterior';
 	$.btnAdvance.title = 'Fotos';
 	break;
 	case 'en':
 	$.btnBack.title = 'Back';
 	$.btnBasic.title ='Previous Car';
 	$.btnAdvance.title = 'Pictures';
 	break;
 	default:
 	$.btnBack.title = 'Volver';
 	$.btnBasic.title ='Automóvil Anterior';
 	$.btnAdvance.title = 'Fotos';
 	break;
 }
 
 function loadInsert(e){
	Ti.API.info(this.status);
}
   function loadError(e){
	Ti.API.info(this.status);
	Ti.API.info(e.error);
}
	
	if(OS_IOS){
 	var idMovilIOS = idMovil.split('-').join('');
 	idMovil = idMovilIOS;
 	
	}
	
	var parametros = {
		'idMovil':idMovil,
		'marca':marca,
		'modelo':modelo,
		'annio':annio,
		'categoria':categoria,
		'idAuto':idAuto
	};
	var APIurlAuto = openshift + restInserta; 
	var requestAuto = Titanium.Network.createHTTPClient();
	
		requestAuto.open('POST', APIurlAuto);
	if(OS_ANDROID){
		requestAuto.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	requestAuto.send(parametros);
	//this method will process the remote data
	
	requestAuto.onload = loadInsert;
	requestAuto.onerror = loadError;


var APIurl = openshift + restDetalle + idAuto+'/'+lang;
var request = Titanium.Network.createHTTPClient();
request.open('GET', APIurl);
request.send();
//this method will process the remote data
request.onload = creaTabla;

$.descLabel.setText(marca +'/'+ modelo +'/'+ annio+'/'+categoria);

function creaTabla(){
	var data = [];
	var responseData = this.responseText;
	var resp = JSON.parse(responseData);
	var motor= resp.motor;
	var trans= resp.transmision;
	var colores = resp.colores;
	var valor = resp.valorizacion;
	seccionInfo(resp,data);
	seccionMotor(motor,data);
	seccionTransmision(trans,data);
	seccionColores(colores,data);
	seccionValorizacion(valor,data);
	
$.tblAdvance.sections = data;
$.tblAdvance.setVisible(true);

changeRightMenu();
}
function seccionMotor(motor,data){
	
	
	switch(lang){
	case 'po':
	var section = Ti.UI.createTableViewSection({headerTitle:'Motor'});
	var infoJSON = [ {
    title: "Tipo Compressor",
    info: motor.compresor,
    desc:'Compressor incorporado no veículo para certas utilidades'
}, {
    title: "Cilindros",
    info: motor.cilindrada,
    desc:'Número de motor de pistão, que classifica'
}, {
    title: "Válvulas",
    info: motor.valvulas,
    desc:'Dispositivos em forma de caneta com fina e ampla forma de conclusão, que permite a entrada e saída de benzeno e expulsão de gases através da exaustão'
}, {
    title: "Torção",
    info: motor.torsion,
    desc:'A quantidade de força gerada pelo motor por revolução'
}, {
    title: "Tamanho",
    info: motor.tamano,
    desc:'Comprimento em metros motor'
}, {
    title: "Compressão",
    info: motor.radioCompresion,
    desc:'Quantidade de pressão gerada pelos cilindros antes de gerar a explosão'
}, {
    title: "Combustível",
    info: motor.bencina,
    desc:'Combustível para usar o veículo fornecida pelo fabricante'
}, {
    title: "Deslocamento",
    info: motor.desplazamiento,
    desc: 'A distância percorrida por cada rotação da roda em metros'
}, {
    title: "Configuração",
    info: motor.config,
    desc:'Formulário Motor'+
    'V: Uniformemente distribuídos dentro do motor do motor'+
    'linear: Reta pistões do motor distribuída'
}, {
    title: "Horse Power",
    info: motor.caballoDeFuerza,
    desc:'Quantidade de energia gerada pelo motor e trabalhar em velocidade'
} ];
	break;
	case 'en':
var section = Ti.UI.createTableViewSection({headerTitle:'Engine'});
	var infoJSON = [ {
    title: "Compressor Type",
    info: motor.compresor,
    desc:'Compressor incorporated in the vehicle for certain utilities'
}, {
    title: "Cylinders",
    info: motor.cilindrada,
    desc:'Number of piston engine that ranks'
}, {
    title: "Valves",
    info: motor.valvulas,
    desc:'Pen-shaped devices with thin and wide form completion that allows entry and exit of benzene and expulsion of gases through the exhaust'
}, {
    title: "Torque",
    info: motor.torsion,
    desc:'The amount of force generated by the engine per revolution'
}, {
    title: "Size",
    info: motor.tamano,
    desc:'Length in meters Engine'
}, {
    title: "Compression",
    info: motor.radioCompresion,
    desc:'Amount of pressure generated by the cylinders before generating the explosion'
}, {
    title: "Fuel Type",
    info: motor.bencina,
    desc:'Fuel to use the vehicle provided by the manufacturer'
}, {
    title: "Displacement",
    info: motor.desplazamiento,
    desc:'The distance traveled by each wheel rotation in meters'
}, {
    title: "Configuration",
    info: motor.config,
    desc:'Engine type form'+
    'V: Evenly distributed within the motor engine'+
    'Linear: Engine pistons distributed straight'
}, {
    title: "Horse Power",
    info: motor.caballoDeFuerza,
    desc:'Amount of power generated by the engine and work on speed'
} ];
	break;
	default:
	var section = Ti.UI.createTableViewSection({headerTitle:'Motor'});
	var infoJSON = [ {
    title: "Tipo Compresor",
    info: motor.compresor,
    desc:'Compresor incorporado en el vehículo para ciertas utilidades'
}, {
    title: "Cilindros",
    info: motor.cilindrada,
    desc:': Cantidad de pistones que ocupa el motor'
}, {
    title: "Válvulas",
    info: motor.valvulas,
    desc:'Dispositivos en forma de lápiz con forma delgada  y terminación ancha que permite la entrada y salida de bencina y expulsión de gases a través del escape'
}, {
    title: "Torsión",
    info: motor.torsion,
    desc:'Cantidad de fuerza que genera el motor por cada giro'
}, {
    title: "Tamaño",
    info: motor.tamano,
    desc:'Largo en metros del motor'
}, {
    title: "Compresión",
    info: motor.radioCompresion,
    desc:'Cantidad  de presión generada por los cilindros antes de generar la explosión'
}, {
    title: "Tipo Combustible",
    info: motor.bencina,
    desc:'Combustible que debe utilizar el vehículo proporcionado por el fabricante'
}, {
    title: "Desplazamiento",
    info: motor.desplazamiento,
    desc: 'Es la distancia recorrida por cada giro de ruedas en metros'
}, {
    title: "Configuración",
    info: motor.config,
    desc:'Tipo de forma del motor'+
    'V: Motor distribuido en partes iguales dentro del motor'+
    'Lineal: Motor con pistones distribuidos en forma recta'
}, {
    title: "Caballos de Fuerza:",
    info: motor.caballoDeFuerza,
    desc:'Cantidad de potencia generada por el motor y el trabajo realizado  en velocidades'
} ];
	break;
}
	
	// Tipo Compresor
	for(var i=0;i<infoJSON.length;i++){
		var rowConfig = Ti.UI.createTableViewRow({hasChild: false,
					className: 'recipe-row',
					backgroundColor: 'white',
					backgroundSelectedColor :'yellow',
					backgroundFocusedColor : 'blue',
					width:"100%",
					height:20,
					desc:infoJSON[i].desc,
					nombre:infoJSON[i].title
					}
					);
	 var columnaConfig   = Ti.UI.createView({ left : 0 ,  height: 20 ,top :0  });
    var columnaDesc  = Ti.UI.createView({ left : "50%" , height: 20,top:0  });
	var labelConfig = Ti.UI.createLabel({
					text: infoJSON[i].title,
					font: {
						fontSize: 14,
						fontWeight: 'bold'
						
					},
					left: "10%",
					color: 'black'
				});
	var labeldescConfig = Ti.UI.createLabel({
					text: infoJSON[i].info,
					font: {
						fontSize: 14,
						fontWeight: 'bold'
						
					},
					left: 0,
					color: 'black'
				});
	columnaConfig.add(labelConfig);
	columnaDesc.add(labeldescConfig);	
	rowConfig.add(columnaConfig);
	rowConfig.add(columnaDesc);
	rowConfig.addEventListener('click',clickDesc);
	section.add(rowConfig);
	}
	
	data.push(section);
}

function seccionInfo(resp,data){
	
	switch(lang){
	case 'po':
	var section = Ti.UI.createTableViewSection({headerTitle:'Informações'});
	var infoJSON = [ {
    title: "Número de Portas",
    info: resp.numPuertas,
    desc:'Número de portas de passageiros (Sem conta Suitcase)'
}, {
    title: "Wheel Drive",
    info: resp.ruedasMotrices,
    desc:'Rodas Localização Torção'
}  ];
	break;
	case 'en':
	var section = Ti.UI.createTableViewSection({headerTitle:'Information'});
	var infoJSON = [ {
    title: "Number of Doors",
    info: resp.numPuertas,
    desc:'Number of passenger doors (No account Suitcase)'
}, {
    title: "Wheel Drive",
    info: resp.ruedasMotrices,
    desc:'Location twist wheels'
}  ];
	break;
	default:
	var section = Ti.UI.createTableViewSection({headerTitle:'Información'});
	var infoJSON = [ {
    title: "Nº Puertas:",
    info: resp.numPuertas,
    desc:'Cantidad de puertas de pasajeros (No cuenta Maleta)'
}, {
    title: "Ruedas Motrices:",
    info: resp.ruedasMotrices,
    desc:'Ubicación de la torsión de las ruedas'
}  ];
	break;
}
	
	// Tipo Compresor
	for(var i=0;i<infoJSON.length;i++){
		var rowConfig = Ti.UI.createTableViewRow({hasChild: false,
					
					backgroundColor: 'white',
					backgroundSelectedColor :'yellow',
					backgroundFocusedColor : 'blue',
					width:"100%",
					height:20,
					desc:infoJSON[i].desc,
					nombre:infoJSON[i].title
					}
					);
	 var columnaConfig   = Ti.UI.createView({ left : 0 ,  height: 20 ,top :0  });
    var columnaDesc  = Ti.UI.createView({ left : "50%" , height: 20,top:0  });
	var labelConfig = Ti.UI.createLabel({
					text: infoJSON[i].title,
					font: {
						fontSize: 14,
						fontWeight: 'bold'
						
					},
					left: "10%",
					color: 'black'
				});
	var labeldescConfig = Ti.UI.createLabel({
					text: infoJSON[i].info,
					font: {
						fontSize: 14,
						fontWeight: 'bold'
						
					},
					left: 0,
					color: 'black'
				});
	columnaConfig.add(labelConfig);
	columnaDesc.add(labeldescConfig);	
	rowConfig.add(columnaConfig);
	rowConfig.add(columnaDesc);
	rowConfig.addEventListener('click',clickDesc);
	section.add(rowConfig);
	}
	
	data.push(section);
	
	
}

function seccionTransmision(trans,data){
	
	switch(lang){
	case 'po':
	var section = Ti.UI.createTableViewSection({headerTitle:'Transmissão'});
	var infoJSON = [ {
    title: "Engrenagens",
    info: trans.velocidades,
    desc:'Número de alteração permitida na transmissão sem reverso'
	}, {
    title: "Tipo de transmissão",
    info: trans.tipoTransmision,
    desc:'Número de velocidades do veículo pode ser automática ou manual'
}  ];
	break;
	case 'en':
	var section = Ti.UI.createTableViewSection({headerTitle:'Transmission'});
	var infoJSON = [ {
    title: "Speed",
    info: trans.velocidades,
    desc:'Number of allowed changes in transmission without reverse'
	}, {
    title: "Transmission type",
    info: trans.tipoTransmision,
    desc:'Number of vehicle speeds can be automatic or manual'
}  ];
	break;
	default:
	var section = Ti.UI.createTableViewSection({headerTitle:'Transmisión'});
	var infoJSON = [ {
    title: "Velocidades:",
    info: trans.velocidades,
    desc:'Cantidad de cambios permitidos en la transmisión sin contar la reversa'
	}, {
    title: "Tipo de transmisión:",
    info: trans.tipoTransmision,
    desc:'Cantidad de velocidades del vehículo puede ser automático como manual'
}  ];
	break;
}

	// Tipo Compresor
	for(var i=0;i<infoJSON.length;i++){
		var rowConfig = Ti.UI.createTableViewRow({hasChild: false,
					
					backgroundColor: 'white',
					backgroundSelectedColor :'yellow',
					backgroundFocusedColor : 'blue',
					width:"100%",
					height:20,
					desc:infoJSON[i].desc,
					nombre:infoJSON[i].title
					}
					);
	 var columnaConfig   = Ti.UI.createView({ left : 0 ,  height: 20 ,top :0  });
    var columnaDesc  = Ti.UI.createView({ left : "50%" , height: 20,top:0  });
	var labelConfig = Ti.UI.createLabel({
					text: infoJSON[i].title,
					font: {
						fontSize: 14,
						fontWeight: 'bold'
						
					},
					left: "10%",
					color: 'black'
				});
	var labeldescConfig = Ti.UI.createLabel({
					text: infoJSON[i].info,
					font: {
						fontSize: 14,
						fontWeight: 'bold'
						
					},
					left: 0,
					color: 'black'
				});
	columnaConfig.add(labelConfig);
	columnaDesc.add(labeldescConfig);	
	rowConfig.add(columnaConfig);
	rowConfig.add(columnaDesc);
	rowConfig.addEventListener('click',clickDesc);
	section.add(rowConfig);
	}
	
	data.push(section);
	
	
}

function seccionColores(colores,data){
	
	switch(lang){
	case 'po':
	var section = Ti.UI.createTableViewSection({headerTitle:'Cores'});
	break;
	case 'en':
	var section = Ti.UI.createTableViewSection({headerTitle:'Colors'});
	break;
	default:
	var section = Ti.UI.createTableViewSection({headerTitle:'Colores'});
	break;
}
	
	var coloresExt;
	var tipo;
	for(var i=0;i<colores.length;i++){
		
			var rowConfig = Ti.UI.createTableViewRow({hasChild: false,
					
					backgroundColor: 'white',
					backgroundSelectedColor :'yellow',
					backgroundFocusedColor : 'blue',
					width:"100%",
					height:20,
					}
					);
	 var columnaConfig   = Ti.UI.createView({ left : 0 ,  height: 20 ,top :0  });
    var columnaDesc  = Ti.UI.createView({ left : "80%" , height: 20,top:0 , backgroundColor:'#'+colores[i].color });
	var labelConfig = Ti.UI.createLabel({
					text: colores[i].nombre,
					font: {
						fontSize: 14,
						fontWeight: 'bold'
						
					},
					left: "10%",
					color: 'black'
				});
	
	columnaConfig.add(labelConfig);
		
	rowConfig.add(columnaConfig);
	rowConfig.add(columnaDesc);
	section.add(rowConfig);
	}

	data.push(section);
	
	
}


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

var restConsulta = Alloy.CFG.consulta;
 
var leftData = [];
var rightData = [];
var slideMenu = Alloy.Globals.slideMenu;
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

function getDataConsulta(){
	var rightTableView=Alloy.Globals.rightTableView;
	var response = this.responseText;
	var resp = JSON.parse(response);
	var consulta = resp.consultas;
	var data =[];
	for(var i=0;i<consulta.length;i++){
		var datos = {title: consulta[i].marca+ ' '+consulta[i].modelo+' '+consulta[i].annio+' '+consulta[i].categoria, idAuto:consulta[i].idAuto,marca:consulta[i].marca,modelo:consulta[i].modelo,annio:consulta[i].annio,categoria:consulta[i].categoria};
		data.push(datos);
	}
	slideRight = data;
	rightData[0] = createRightSection();
	rightTableView.data = rightData;
}

function changeView(view){
	var conView = Alloy.Globals.contentView;
	var currentView = Alloy.createController(view).getView();
	conView.removeAllChildren();
	conView.add(currentView);
	

}
function btnImagenClick(){
	changeView('imagenWindow');
}

function btnAutoClick(){
	Alloy.Globals.idAuto = Alloy.Globals.idAutoAnt;
	Alloy.Globals.marca = Alloy.Globals.marcaAnt;
	Alloy.Globals.modelo = Alloy.Globals.modeloAnt;
	Alloy.Globals.anho = Alloy.Globals.anhoAnt;
	changeView('detailWindow');
}

function backPage(){
	changeView("tiposWindow");
}

function seccionValorizacion(valor,data){
	
	switch(lang){
	case 'po':
		var infoJSON = [ {
    title: "Total",
    info: valor.total
}, {
    title: "Rendimento",
    info: valor.performance
}, {
    title: "Conforto",
    info: valor.comfort
}, {
    title: "Interior:",
    info: valor.interior
}, {
    title: "Exterior",
    info: valor.exterior
}, {
    title: "Gestão Fácil",
    info: valor.facilManejo
}, {
    title: "Benzina",
    info: valor.bencina
}, {
    title: "Confiança",
    info: valor.confiabilidad
}, {
    title: "Desenho",
    info: valor.disenho
} ];
	var section = Ti.UI.createTableViewSection({headerTitle:'Valorização'});
	break;
	case 'en':
		var infoJSON = [ {
    title: "Total:",
    info: valor.total
}, {
    title: "Performance",
    info: valor.performance
}, {
    title: "Comfort",
    info: valor.comfort
}, {
    title: "Interior",
    info: valor.interior
}, {
    title: "Exterior",
    info: valor.exterior
}, {
    title: "Easy Drive",
    info: valor.facilManejo
}, {
    title: "Fuel",
    info: valor.bencina
}, {
    title: "Reliability",
    info: valor.confiabilidad
}, {
    title: "Design",
    info: valor.disenho
} ];
	var section = Ti.UI.createTableViewSection({headerTitle:'Valorization'});
	break;
	default:
		var infoJSON = [ {
    title: "Total:",
    info: valor.total
}, {
    title: "Rendimiento:",
    info: valor.performance
}, {
    title: "Comodidad:",
    info: valor.comfort
}, {
    title: "Interior:",
    info: valor.interior
}, {
    title: "Exterior",
    info: valor.exterior
}, {
    title: "Facil Manejo:",
    info: valor.facilManejo
}, {
    title: "Bencina:",
    info: valor.bencina
}, {
    title: "Confiabilidad:",
    info: valor.confiabilidad
}, {
    title: "Diseño:",
    info: valor.disenho
} ];
	var section = Ti.UI.createTableViewSection({headerTitle:'Valorización'});
	break;
}
	
	var coloresExt;
	var tipo;
	for(var i=0;i<infoJSON.length;i++){
		
			var rowConfig = Ti.UI.createTableViewRow({hasChild: false,
					
					backgroundColor: 'white',
					backgroundSelectedColor :'yellow',
					backgroundFocusedColor : 'blue',
					width:"100%",
					height:20,
					}
					);
	 var columnaConfig   = Ti.UI.createView({ left : 0 ,  height: 20 ,top :0  });
    var columnaDesc  = Ti.UI.createView({ left : "50%" , height: 20,top:0 });
	var labelConfig = Ti.UI.createLabel({
					text: infoJSON[i].title,
					font: {
						fontSize: 14,
						fontWeight: 'bold'
						
					},
					left: "10%",
					color: 'black'
				});
	
	columnaConfig.add(labelConfig);
	var starView = muestraEstrellas(infoJSON[i].info);
	columnaDesc.add(starView);	
	rowConfig.add(columnaConfig);
	rowConfig.add(columnaDesc);
	section.add(rowConfig);
	}

	data.push(section);
	
	
}



function muestraEstrellas(num){
	var args ={num:num};
	var starView = Alloy.createController('starView',args).getView();
	return starView;
}

function clickDesc(e){
	var desc = e.row.desc;
	var nombre = e.row.nombre;
	dialogDesc(desc,nombre);
}

function dialogDesc(desc,nombre){
	var dialog = Ti.UI.createAlertDialog({
		title: nombre,
		message:desc
	});
	dialog.show();
}
