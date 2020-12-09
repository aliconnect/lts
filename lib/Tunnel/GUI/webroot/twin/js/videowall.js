var camera, scene, renderer, mesh;
mesh_items = {};
function go() {
	const vmsOptions = {wall:'1',cam:100};
	window.streams = [];
	[...document.getElementsByTagName('CANVAS')].forEach(canvas => {
		window.streams.push(canvas.captureStream(125));
	});
	webcam = new Webcam(vmsOptions);
	webcam.startChat(vmsOptions);
}
AIM.extend({
	config: {
		aim: {
			servers: [{ url: document.location.origin + '/api' }]
		}
	},
	on: {
		config() {
			AIM.extend({
				config: {
					aim: {
						websocket: {
							servers: [{ url: 'wss://aliconnect.nl:444' }],
						},
					}
				}
			});
		},
		init() {
			AIM.datainit(() => {
				AIM.Videowall.init(AIM.ref[AIM.auth.access.sub]);
				go();
			});
		},
		message(event) {
			// return;
			// if (data.state == 'connected' && data.from.app == 'em') document.location.reload();
			// if (('kanaal' in data) && ('cam' in data)) {
			// 	var kanaal = AIM.kanalen[data.kanaal];
			// 	kanaal.cameraID = data.cam;
			// 	if ('preset' in data) AIM.cameras[kanaal.cameraID].presetID = Math.min(data.preset, AIM.cameras[kanaal.cameraID].preset.length - 1);
			// }
		},
	},
	Videowall: {
		init: function(item){
			renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.gammaOutput = true;
			// renderer.setSize( window.innerWidth, window.innerHeight );
			// renderer.setSize( 480,360 );
			// document.body.appendChild( renderer.domElement );

			scene = new THREE.Scene();
			scene.background = bg = new THREE.Color(AIM.color.hemelsblauw);

			angle = function (deg) { return deg / 180 * Math.PI }
			// AIM.Videowall.plan = {width:4000,length:4000};
			var floor = new THREE.Mesh(new THREE.PlaneGeometry(AIM.Videowall.plan.width, AIM.Videowall.plan.length, 0, 0), new THREE.MeshBasicMaterial({ color: AIM.color.grasgroen }));
			floor.rotation.x = -Math.PI / 2;
			scene.add(floor);
			// camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
			camera = new THREE.PerspectiveCamera(80, 480/360, 1, 1000);
			// camera = new THREE.PerspectiveCamera(50, 480/360, 0.5, 200);
			camera.position.set( 0, 4, (TUNNEL_LENGTE/2) + 20 );
			scene.add( camera );
			scene.add( new THREE.DirectionalLight( 0xffffff, 1 ));
			scene.add( new THREE.AmbientLight( 0xffffff, 1 ) );
			// camera.add( new THREE.PointLight( 0xffffff, 1.5 ) );
			AIM.render = function() {
				renderer.render( scene, camera );
			}
			// var controls = new THREE.OrbitControls( camera, renderer.domElement );
			// controls.addEventListener( 'change', AIM.render );
			// controls.minDistance = 10;
			// controls.maxDistance = 1000;
			// controls.enablePan = false;
			AIM.allcars = [
				// carsR1 = Object.assign([], { z: -RIJSTROOK_BREEDTE / 2, dir: 1, speed: AIM.Videowall.speed[2], cartypes: AIM.Videowall.cartypes[2] }),
				// carsR2 = Object.assign([], { z: RIJSTROOK_BREEDTE / 2, dir: 1, speed: AIM.Videowall.speed[1], cartypes: AIM.Videowall.cartypes[1] }),
				// carsL1 = Object.assign([], { z: 6.75, dir: -1, speed: AIM.Videowall.speed[2], cartypes: AIM.Videowall.cartypes[2] }),
				// carsL2 = Object.assign([], { z: 3.4, dir: -1, speed: AIM.Videowall.speed[1], cartypes: AIM.Videowall.cartypes[1] }),
			]
			AIM.Videowall.createItem.call(scene, item);
			AIM.Videowall.dt = new Date();
			// AIM.carmodelslist = [];
			AIM.modelsLoaded = 0;
			var max = 1;
			var max = 4;
			var max = 19;
			size = {width: 240, height: 180 };
			renderer.setSize(size.width, size.height);
			camera.aspect = size.width / size.height;

			for (let i=0;i<=max;i++) {
				// AIM.kanalen.push({ left: 0, top: 100, width: 480, height: 360, cameraID: i });
				AIM.kanalen.push({
					// left: 0,
					// top: 100,
					// width: 240,
					// height: 180,
					cameraID: i,
					camID: i,
					id: i,
					cam: camera,
					el: document.body.createElement('canvas', {
						// kanaal: k,
						width: size.width,
						height: size.height,
						onclick: function () {
							AIM.Videowall.kanaalID = this.kanaal.name;
						}
					}),
				});
			}
			AIM.newcars = [];
			AIM.carmodels.forEach(function(car) {
				// console.log(car);
				new THREE.GLTFLoader().load( 'models/cars/'+car.name+'/scene.gltf', gltf => {
					car.scene = gltf.scene;
					car.scene.l = car.l;
					if (car.ry) {
						car.scene.rotation.y = car.ry;
					}
					boundingBox = new THREE.Box3().setFromObject(car.scene);
					var size = {
						w: boundingBox.max.x - boundingBox.min.x,
						h: boundingBox.max.y - boundingBox.min.y,
						l: boundingBox.max.z - boundingBox.min.z,
					}
					// console.log(boundingBox.max, boundingBox.min);
					// var size = new THREE.Vector3();
					// boundingBox.getSize(size); // Returns Vector3
					car.scale = (car.scale || 1) * car.w/size.w;
					// console.log("SCALE",boundingBox.max.x, boundingBox.min.x, size.w, car.scale);


					car.scene.scale.set(car.scale,car.scale,car.scale);
					boundingBox = new THREE.Box3().setFromObject(car.scene)
					// car.scene.size = new THREE.Vector3();
					//
					// boundingBox.getSize(car.scene.size) // Returns Vector3
					// //console.log("BOX",boundingBox.min.x,boundingBox.max.x);



					car.scene.position.y -= boundingBox.min.y;
					car.scene.position.x += (boundingBox.min.x + boundingBox.max.x) / 2;
					AIM.modelsLoaded++;
					//console.log('Loaded',modelsLoaded);
					if (AIM.modelsLoaded >= AIM.carmodels.length) {
						//console.log('Load animate');
						AIM.allcars.forEach(AIM.Videowall.fillstreet);
						AIM.Videowall.animate();
						// AIM.ws.connect();
						//AIM.ws.initProperties();

					}
				});
			});
		},
		movecars(cars) {
			var carstopped = null, car0 = { speed: cars.speed, p: -AIM.Videowall.plan.length / 2 - 100, l: 0 };

			for (var i = 0, car; car = cars[i]; i++) {
				var targetspeed = cars.speed;
				if (!carstopped && ['geel','rood'].includes(STAND)) {
					if (car.position.z > POS_STOP ) {
						car.stop = true;
						// car.speed = 0;
					}
					if (car.position.z <= POS_STOP ) {
						car.stop = false;
						// car.speed = 0;
					}
					if (car.stop) {
						carstopped = car0 = { speed: 0, p: POS_STOP, l: 0 };
					}
				}
				else {
					car.stop = false;
				}
				// if (car.stop) {
				// 	carstopped = car0 = { speed: 0, p: -AIM.Videowall.posstop + 5, l: 0 };
				// }
				car.afstand_gewenst = ((car.speed || 0) * 1000 / 60 / 60 * 2) + 2 + car0.l / 2 + car.l / 2; // 2 seconden afstand van voorganger = 2 * snelheid (m/s)
				car.afstand_actueel = Math.abs(car0.p - car.position.z);
				car.afstand_verschil = car.afstand_actueel - car.afstand_gewenst;
				car.speed = Math.max(0, car.speed - 5, Math.min(targetspeed, car.speed + .5, car.afstand_verschil / 1000 * 60 * 60));
				//car.speed = 80;
				car.d = car.speed * 1000 / 60 / 60 / 1000 * AIM.Videowall.ms;
				var p = car.p = (car.position.z -= car.d * cars.dir);
				if ((car.position.z < -AIM.Videowall.plan.length / 2) || (car.position.z > AIM.Videowall.plan.length / 2)) { scene.remove(car); cars.shift(); }
				car0 = car;
			}
			var afstand = targetspeed * (0.8 + 0.6 * Math.random() );
			if (cars.dir === 1 ? p < AIM.Videowall.plan.length / 2 - afstand : p > -AIM.Videowall.plan.length / 2 + afstand) {
				AIM.Videowall.pushcar(cars, AIM.Videowall.plan.length / 2 * cars.dir);
			}
		},
		moveall() {
			AIM.Videowall.ms = -(AIM.Videowall.dt - (AIM.Videowall.dt = new Date()));
			AIM.allcars.forEach(AIM.Videowall.movecars);
		},
		animate() {
			AIM.Videowall.moveall();
			const datetime = new Date().toISOString().substr(0,19).replace(/T/,' ');
			for (let [name, channel] of Object.entries(AIM.kanalen)) {
				const cam = AIM.cameras[channel.cameraID];
				if (!cam) return;
				const presetActive = cam.preset[cam.presetID] || 0;
				// renderer.setSize(size.width, size.height);
				camera.position.set(cam.x, cam.y, cam.z);
				['rx','ry','rz'].forEach((par)=>{
					cam[par] = Math.min (Math.max ( angle(presetActive[par]), (cam[par] || 0 ) - 0.1 ), (cam[par] || 0) + 0.1) ;
				});
				camera.rotation.set(cam.rx, cam.ry, cam.rz);
				// camera.aspect = size.width / size.height;
				camera.zoom = presetActive.zoom;
				renderer.render(scene, camera);

				const text = [
					cam.id,
					presetActive.name,
					datetime,
				].join(' ');
				const canvas = channel.el.getContext('2d');
				canvas.drawImage(renderer.domElement, 0, 0);

				canvas.textAlign = "center";
				canvas.font = "10px sans-serif";
				canvas.fillStyle = "white";  //<======= here
				// ctx.shadowColor = "white";
				// ctx.shadowBlur = 7;
				// canvas.lineWidth = 1;

				// canvas.fillText(text, size.width / 2, 0);
				canvas.fillText(text, size.width / 2, 10);

				// ctx.shadowBlur = 0;
				// ctx.fillStyle = AIM.kanaal_id === this.id ? 'red' : 'white';
				// ctx.lineWidth = 0;
				// ctx.fillText(text, size.width / 2, 20);

				// cam.draw(renderer.domElement);
			}
			//setTimeout(AIM.Videowall.animate, 500);
			requestAnimationFrame(AIM.Videowall.animate);
		},
		fillstreet(cars) {
			for (var i = -AIM.Videowall.plan.length / 2; i < AIM.Videowall.plan.length / 2; i += cars.speed) {
				AIM.Videowall.pushcar(cars, i * cars.dir);
			}
		},
		createGeo(geo, name) {
			if (geo.radius) {
				var mesh = this[name] = 'color' in geo ? new THREE.Mesh(new THREE.CylinderGeometry(geo.radius, geo.radius, geo.depth || 1, 8), new THREE.MeshBasicMaterial({ color: geo.color })) : new THREE.Group();
				mesh.position.set(geo.left || 0, (geo.bottom || 0) + (geo.height || 0) / 2, -geo.distance || 0);
				mesh.rotation.x = angle(90);
			}
			// else if (geo.type === 'box') {
			// 	console.log('TYPE', this);
			// 	if (!geo.depth) {
			// 		var box = new THREE.Box3().setFromObject(this);
			// 		// console.log('SIZE',box.min, box.max,box.getSize());
			// 		geo.depth = box.max.y;
			// 	}
			// 	var mesh = new THREE.Mesh(new THREE.BoxGeometry(geo.width, geo.height, geo.depth || 1), new THREE.MeshBasicMaterial({ color: geo.color }));
			// 	mesh.position.set(geo.left || 0, (geo.bottom || 0) + (geo.height || 0) / 2, -geo.distance || 0);
			// }
			else {
				var mesh = this[name] = 'color' in geo ? new THREE.Mesh(new THREE.BoxGeometry(geo.width || 1, geo.height || 1, geo.depth || 1), new THREE.MeshBasicMaterial({ color: geo.color })) : new THREE.Group();
				mesh.position.set(geo.left || 0, (geo.bottom || 0) + (geo.height || 0) / 2, -geo.distance || 0);
			}
			// console.log('MESH', mesh);
			this.add(mesh);
			if (geo.children) {
				// console.log(geo.children);
				for (let [childName, child] of Object.entries(geo.children)) {
					AIM.Videowall.createGeo.call(mesh, child);
				}
				// Object.forEach(geo.children, AIM.Videowall.createGeo.bind(mesh));
			}
			return mesh;
		},
		createItem(item) {
			if (!item) return;
			// if (item.ID == 3443779) return;
			// console.log(item.$id, item.geo);
			// if (item.schema === "Verkeerslichten") {
			// 	// console.log('createItem', item.schema);
			// 	if (AIM.stopmake) return;
			// 	AIM.stopmake = true;
			// 	// console.log(item.schema, item.$id, item.geo);
			// }
			// if (item.schema === "Verkeerslicht") {
			// 	// console.log(item.schema, item.$id);
			// }

			if ('selected' in item && item.selected == 0) return;
			if (item.geo) {
				item.mesh = AIM.Videowall.createGeo.call(this, item.geo || {});
				if (item.geo && item.geo.step) {
					if (item.geo.step.left) item.mesh.position.x += item.geo.step.left * item.typicalIdx;
					if (item.geo.step.distance) item.mesh.position.z += item.geo.step.distance * item.typicalIdx;
				}
				// item.mesh = new THREE.Mesh(new THREE.BoxGeometry(200, 100, 300), new THREE.MeshBasicMaterial({ color: 'red' }));
				this.add(item.mesh);
				if (Array.isArray(item.children)) {
					item.children.forEach(AIM.Videowall.createItem.bind(item.mesh));
				}
				if (item.schema === 'Verkeersbuis') {

					console.log('Verkeersbuis', item);

					item.mesh.position.x = 5;

					// if (AIM.richting) {
					if (item.ID != 3443779) {
						item.mesh.rotation.y = Math.PI;
						item.mesh.position.x *= -1;
					}
					AIM.allcars.push(carsR1 = Object.assign([], { mesh: item.mesh, z: -RIJSTROOK_BREEDTE / 2, dir: 1, speed: AIM.Videowall.speed[2], cartypes: AIM.Videowall.cartypes[2] }));
					AIM.allcars.push(carsR2 = Object.assign([], { mesh: item.mesh, z: RIJSTROOK_BREEDTE / 2, dir: 1, speed: AIM.Videowall.speed[1], cartypes: AIM.Videowall.cartypes[1] }));
					AIM.richting=1;
					// console.log(item.schema, item.$id, item.geo);
					var mat = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, map: new THREE.TextureLoader().load( 'img/hulppostkast.png' )  } );
					var geometry = new THREE.PlaneGeometry( 2, 3 );
					for (var z = TUNNEL_LENGTE/2 - 5; z >- TUNNEL_LENGTE / 2 ; z -= 50) {
						var mesh = new THREE.Mesh( geometry, mat );
						mesh.position.set (-BUIS_WAND_DIKTE / 2 - 0.1, 0,z);
						mesh.rotation.y = - Math.PI / 2;
						if (item.mesh.wandR) {
							item.mesh.wandR.add(mesh);
						}
					}
					var mat = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, map: new THREE.TextureLoader().load( 'img/vluchtdeur.png' )  } );
					var geometry = new THREE.PlaneGeometry( 2, 3 );
					for (var z = TUNNEL_LENGTE/2 - 58; z >- TUNNEL_LENGTE / 2 ; z -= 100) {
						var mesh = new THREE.Mesh( geometry, mat );
						mesh.position.set (-BUIS_WAND_DIKTE / 2 - 0.1, 0,z);
						mesh.rotation.y = - Math.PI / 2;
						if (item.mesh.wandR) {
							item.mesh.wandR.add(mesh);
						}
					}
				}
			}
		},
		pushcar(cars, pos) {
			// console.log(cars, pos);
			if (!AIM.newcars.length) {
				AIM.newcars = AIM.carmodels.slice(0);
				for(let i = AIM.newcars.length - 1; i > 0; i--){
					const j = Math.floor(Math.random() * i)
					const temp = AIM.newcars[i]
					AIM.newcars[i] = AIM.newcars[j]
					AIM.newcars[j] = temp
				}
			}
			// var imodel = Math.floor(Math.random() * (AIM.newcars.length + 1)), car = AIM.newcars.splice(imodel,1).shift();
			var car = AIM.newcars.shift();
			// console.log(AIM.newcars, car);
			if (car && car.scene) {
				var carscene = car.scene.clone();
			}
			if (!carscene) return;
			carscene.position.x -= cars.z;
			carscene.position.z = pos;
			carscene.l = 3;
			carscene.speed = cars.speed;
			carscene.rotation.y += ( cars.dir + 1 ) * Math.PI / 2;

			cars.push(carscene);
			// console.log(cars.mesh);
			if (cars.mesh) {
				cars.mesh.add(carscene);
			}
		},
		// stopcar: function (posstop) {
		// 	//oStop.mesh.position.z = (stop = posstop);
		// 	// console.log('', AIM.Videowall.posstop, posstop);
		// 	if (AIM.Videowall.posstop === posstop) return;
		// 	AIM.Videowall.posstop = posstop;
		// 	console.log('STOP ON ', posstop);
		//
		// 	// for (var i = 0, car; car = carsR1[i]; i++) car.stop = false;
		// 	// for (var i = 0, car; car = carsR2[i]; i++) car.stop = false;
		// 	// if (posstop === -1) return;
		// 	// for (var i = 0, car; car = carsR1[i]; i++) if (car.position.z > - POS_STOP) { car.stop = true; break; }
		// 	// for (var i = 0, car; car = carsR2[i]; i++) if (car.position.z > - POS_STOP) { car.stop = true; break; }
		// },
	},
});
