angular.module('chatusb', [])
	.controller('chatAngularController', function($scope, $interval) {
		
		//var objFirebase = new Firebase('https://chatusb.firebaseio.com/');
		//var objFirebase = new Firebase('https://ce4r7beysrf.firebaseio-demo.com/');
		var objFirebase = new Firebase('https://chatusbtest.firebaseio.com/');
		$scope.mensajes = [];
		$scope.nombre = 'Diego';

		objFirebase.on('child_added', function(snapshot) {
		 		var message = snapshot.val();
				getPlantilla(message.autor, message.mensaje);
			});

		function getPlantilla(autor, mensaje) {

			$scope.mensajes.push({
					nombre: autor,
					texto: mensaje
				});
		}

		$scope.enviar = function() {
			var miAutor = $scope.nombre
			var miMensaje = $scope.mensaje
			objFirebase.push({autor: miAutor, mensaje: miMensaje});
			$scope.mensaje = '';
		}

		$scope.auth_twitter = function() {
			$scope.nombre = 'autenticado por Twitter' + $scope.nombre; 	
		}

		$interval( function(){
        	$scope.$apply();
    	}, 5000 );

	});