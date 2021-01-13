console.log('Config TMS Videowall functionaliteit');
Aim.extend({
	color: {
		hemelsblauw : '#87ceeb',
		grond2: 'brown',
		grondgroen: '#2a5324',
		grasgroen: '#35682d',
		asfalt: 0x030303,
		rand: 0x666666,
		wand: '#666',
		paal: '#666',
		paal: '#666',
		rood: 'rgb(255,0,0)',
		gedoofd: 0x333333,
	},
	carmodels: [

		//{ name: "car1", w:2, l:4  },
		//{ name: "car1b", w:2, l:4  },
		{ name: "car1", w:1.75, scale:2 },
		{ name: "chevrolet_camaro", w:1.75 },
		{ name: "gaz-66-2_non-pbr", w:1.75 },
		{ name: "graffiti_van_template", w:1.75, ry:Math.PI/2 },
		{ name: "italeri_truck", w:2.0, ry: 1 },
		{ name: "lamborghini_veneno", w:1.75},
		{ name: "nova_e", w:1.75},
		{ name: "nova_nsx", w:1.75},
		//
		// // { name: "truck1", w:2}, // is zwart???
		// //
		// { name: "tesla_model_s", w:2, l:4  },
		// { name: "2015_ford_mustang", w:2, l:4  },
		// { name: "audi_r8", w:2, l:4  },
		// { name: "beetle",  w:1.8, l:5 },
		// { name: "bmw_i8", w:2, l:4  },
		// { name: "bmw_m6", w:1.8, l:5, },
		// { name: "bugatti_chiron", w:2, l:4  },
		// { name: "bus1", w: 2.5, l:20, ry:-Math.PI/2 },
		// { name: "car11", w:3, l:5},
		// { name: "car15", w:1.8, l:5 },
		// { name: "ferarri_f12", w:2, l:4  },
		// { name: "ferarri_italia", w:2, l:4  },
		// { name: "ferarri_laferarri", w:1.8, l:5, ry: Math.PI/2, y:.5},
		// { name: "jaguar_cx-75", w:2, l:4  },
		// { name: "jaguar_f-type", w:2, l:4  },
		// { name: "kenworth_t-800", w:2.2, l:10, ry: Math.PI/2 - 0.1 },
		// { name: "koeninsegg_agera_one1", w:2, l:4  },
		// { name: "marussia_b2", w:2, l:4  },
		// { name: "mazda_cx-5", w:1.8, l:5, y: -0.5 },
		// { name: "mini_cooper_s", w:1.7, l:4, ry:Math.PI },
		// { name: "mitsubishi_lancer_evolution_x", w:2, l:4  },
		// { name: "nissan_gtr_nismo", w:2, l:4  },
		// { name: "porsche_918", w:2, l:4  },


		// { name: "lamborghini_urus", w:2, l:4  },
		//{ name: "car17", w:1.8, l:5 , ry:-Math.PI/2 },
		//{ name: "lenco_bear", w:2.2, l:10 },
		//{ name: "car12", w:1.8, l:5, ry:Math.PI/2},
		//{ name: "car13", w:1.8, l:5, ry: Math.PI},



		//{ name: "car16", w:1.8, l:5 },
		//{ name: "car14", w:1.8, l:5, ry: Math.PI},
		// { name: "old_rusty_car_2", scale: 0.02 },
		// { name: "millitary_truck_v.3_camo", scale: 0.9 },
		// { name: "car1", scale: 0.02 },



		//{ name: "autolib_3dst51", scale: 0.03},
		//{ name: "zx-r", scale: 0.1},
		//{ name: "nouvelle_peugeot_208_-_lowpoly", scale: 0.1},
		//{ name: "m725_military_ambulance", scale: 1},
		//{ name: "low_poly_car", scale: 1},



		//{ name: "subaru_impreza_wrx_sti_2004_sedan", scale: 0.5},
		//{ name: "volkswagen_type_2_kombi_t1_1967", scale: 1},
		//{ name: "chevrolet_ss_nascar_racing_car", scale: 0.03},
		// { name: "mazda_mx-5", scale: 0.1},
		// { name: "mazda_rx8", scale: 0.1},
		//{ name: "military_vehicle", scale: 0.1},
		//{ name: "mnu_armored_toyota_hilux", scale: 0.1},
		//{ name: "muscle_car", scale: 0.1},
		//{ name: "truck", scale: 0.1},
		//{ name: "truck_-_one_material", scale: 0.1},
		//{ name: "xm800_armored_scout_vehicle_3d_scan", scale: 0.1},
		//{ name: "drunk_monster_truck", scale: 0.03},

	],

});
Aim.extend({
	Videowall: CCTV = {
		plan: {
			length: 5000,
			width: 5000,
		},
		displayScale: 0.666,
		//displayScale: 0.5,
		// tunnel: {
		// 	length: 1200,
		// },
		//l: 3000,
		carsdistance: 60,
		speed: { 1: 100, 2: 80 },
		portaalR: -800,
		stop_position: -800,
		rijstroken: {
			1: { breedte: 2.5 },
			2: { breedte: 3 },
			vluchtstrook: { breedte: 2 },
		},
		//vluchtdeuren: {
		//	afstand: 100,
		//},
		//get rijstrook_breedte() { },
		rijstrook_breedte: 10,// is gelijk opgeteld banen
		aantal_rijstroken: 2,
		kanaalID: 'E1',
		cartypes: {
			1: [
				type_car_short1 = { w: 1.6, l: 4.2, shape: "car_short", colors: ['#00FF00', '#C71585', '#20B2AA', '#32CD32', '#7B68EE'] },
				type_car_short1,
				type_car_medium1 = { w: 1.8, l: 4.6, shape: "car_medium", colors: ['#20B2AA', '#32CD32', '#7B68EE', '#00FF00', '#C71585', '#20B2AA', '#32CD32', '#7B68EE'] },
				type_car_medium1,
				type_car_medium1,
				type_car_marge1 = { w: 1.8, l: 5.0, shape: "car_medium", colors: ['#20B2AA', '#32CD32', '#7B68EE'] },
				type_car_marge1,
			],
			2: [
				type_truck_long = { w: 2, h: 4.3, l: 12.25, shape: "truck_long", colors: ['#B8860B', '#556B2F', '#ADFF2F', '#4B0082'] },
				type_truck_long,
				type_truck_long,
				type_truck_short = { w: 2, h: 4.3, l: 8, shape: "truck_short", colors: ['#F08080', '#E0FFFF', '#B8860B', '#556B2F', '#ADFF2F', '#4B0082'] },
				type_truck_short,
				type_truck_cab = { w: 2, h: 4, l: 8, shape: "truck_cab", colors: ['#F08080', '#E0FFFF', '#B8860B', '#556B2F', '#ADFF2F', '#4B0082'] },
				type_truck_2 = { w: 2, h: 4.3, l: 20, shape: "truck_2", colors: ['red', ] },
				type_car_short1,
				type_car_short1,
				type_car_short1,
				type_car_medium1,
			],
		},
		//"preset_default": {5:{"name": "hulppost2", "rx": -20, "ry": -20, "rz": 0, "zoom": 1 }
		portaal1: -2490,
		portaal_step: -120,
	},
	components: {
		schemas: {
			System: {
				geo: {
				},
			},
			Verkeersbuis: {
				geo: {
					// type: 'box',
					// depth: 1000, height: 5, width: 10, left: 7, bottom: 5, distance: 0,
					// color: 'blue',
					// richting: Aim.richting = Aim.richting || 0,
					left: 0,
					// step: { left: 2 },
					children: {
						wandR: { depth: TUNNEL_LENGTE, height: BUIS_HOOGTE, width: BUIS_WAND_DIKTE, left: ( RIJSTROOK_BREEDTE * RIJSTROKEN + ASFALT_STROOK_BREEDTE * 2 + BUIS_WAND_DIKTE * 2) / 2, color: Aim.color.wand },
						wandL: { depth: TUNNEL_LENGTE, height: BUIS_HOOGTE, width: BUIS_WAND_DIKTE, left: - ( RIJSTROOK_BREEDTE * RIJSTROKEN + ASFALT_STROOK_BREEDTE * 2 + BUIS_WAND_DIKTE * 2) / 2, color: Aim.color.wand },
						grond_rechts: { depth: TUNNEL_LENGTE, height: BUIS_HOOGTE + BUIS_WAND_DIKTE + 2, width: 200, left: ( RIJSTROOK_BREEDTE * RIJSTROKEN + ASFALT_STROOK_BREEDTE * 2 + BUIS_WAND_DIKTE * 2 + BUIS_WAND_DIKTE + 200) / 2, color: Aim.color.grondgroen },
						// grondL: { depth: TUNNEL_LENGTE, height: BUIS_HOOGTE + BUIS_WAND_DIKTE, width: 200, left: - ( RIJSTROOK_BREEDTE * RIJSTROKEN + ASFALT_STROOK_BREEDTE * 2 + BUIS_WAND_DIKTE * 2 + BUIS_WAND_DIKTE + 200) / 2, color: Aim.color.grondgroen },
						dak: { depth: TUNNEL_LENGTE, height: BUIS_WAND_DIKTE, bottom: BUIS_HOOGTE, width: ( RIJSTROOK_BREEDTE * RIJSTROKEN + ASFALT_STROOK_BREEDTE * 2 + BUIS_WAND_DIKTE * 2), color: '#333' },
						grond_dak: { depth: TUNNEL_LENGTE, height: 2, width: 500, bottom: BUIS_HOOGTE + BUIS_WAND_DIKTE, color: Aim.color.grondgroen },
						weg: {
							depth: TUNNEL_LENGTE + 1000, height: 0.1, width: RIJSTROOK_BREEDTE * RIJSTROKEN + ASFALT_STROOK_BREEDTE, color: Aim.color.asfalt,
							children: {
								lijn1: {depth: TUNNEL_LENGTE + 1000, height: 0.1, width: 0.1, color: 'white' },
								lijn2: {depth: TUNNEL_LENGTE + 1000, height: 0.1, width: 0.1, left: -RIJSTROOK_BREEDTE, color: 'white' },
								lijn3: {depth: TUNNEL_LENGTE + 1000, height: 0.1, width: 0.1, left: RIJSTROOK_BREEDTE, color: 'white' },
							}
						},
						// wandRechts: { depth: .2, height: 5.5, width: .2, left: -5, bottom: 0, distance: 0, color: Aim.color.paal, },
						// wandBoven: { depth: .2, height: 5.5, width: .2, left: 5, bottom: 0, distance: 0, color: Aim.color.paal, },
						// weg: { depth: .2, height: 5.5, width: .2, left: 5, bottom: 0, distance: 0, color: Aim.color.paal, },
					}
				},
			},
			Tunnel: {
				//menuname: 'Tunnel',
				//systemGroup: {},
				//systemItem: {},
			},
			// Verkeersbuis: {
			// 	//menuname: 'Buis,Verkeer',
			// 	//systemGroup: {},
			// 	//systemItem: {},
			// },
			Verkeerslichten: {
				// mnu: "VRI_Afsluitboom",
				geo: {
					// depth: 10, height: 10, width: 10, left: 0, bottom: 0, distance: 0,
					// color: 'red',
					distance: - ( TUNNEL_LENGTE + AFSTAND_TUNNEL_VERKEERSLICHTEN ) / 2,
					// left: 6, step: { distance: 1 },
					children: {
						ligger: { depth: .2, height: .2, width: 10, left: 0, bottom: 5.5, color: Aim.color.paal, },
						kolomL: { depth: .2, height: 5.5, width: .2, left: -5, bottom: 0, distance: 0, color: Aim.color.paal, },
						kolomR: { depth: .2, height: 5.5, width: .2, left: 5, bottom: 0, distance: 0, color: Aim.color.paal, },
					}
				},
			},
			Verkeerslicht: {
				geo: {
					depth: .1, height: 2.4, width: .8, bottom: 5, distance: -.8, color: 'black', left: -8, step: { left: 2.5 },
					children: {
						r: { depth: .2, radius: .3, left: 0, bottom: .7, distance: 0, color: '#111', },
						y: { depth: .2, radius: .3, left: 0, bottom: 0, distance: 0, color: '#111', },
						g: { depth: .2, radius: .3, left: 0, bottom: -.7, distance: 0, color: '#111', },
					},
				},
				onchange() {
					// console.log('onchange Verkeerslicht');
					const mesh = this.mesh;
					const stand = String(this.Stand);
					if (!mesh || !stand) return;
					// var stand = this.stand.Value || this.stand;
					// console.log('onchange Verkeerslicht STAND', stand, mesh);
					mesh.children[0].material.color.set(stand === 'rood' ? 'rgb(255,30,30)' : '#111');
					mesh.children[1].material.color.set(stand === 'geel' ? 'rgb(252,178,0)' : '#111');
					mesh.children[2].material.color.set(stand === 'groen' ? 'rgb(0,206,0)' : '#111');
					// return;
					// //console.log('STAND=', stand, this.stand, 'id', this.id, this.mesh.r.material.color);
					// if (this.timeout) clearTimeout(this.timeout);
					// if (stand === 'geel_knipperen') {
					// 	(this.set_geel_knipperen = function (vkl) {
					// 		// console.log('geel_knipperen!!', vkl);
					// 		vkl.mesh.y.material.color.set('rgb(252,178,0)');
					// 		Aim.render();
					// 		vkl.timeout = setTimeout(function (vkl) {
					// 			// console.log('geel_knipperen!!22', vkl);
					// 			vkl.mesh.y.material.color.set('#111');
					// 			Aim.render();
					// 			vkl.timeout = setTimeout(vkl.set_geel_knipperen, 500, vkl);
					// 		}, 500, vkl);
					// 	})(this);
					// }
					// else {
					// }
					Aim.render();
					// STAND = stand;
					// // return;
					// if (['groen','gedoofd'].indexOf(stand) != -1) {
					// 	Aim.Videowall.stopcar(-1);
					// }
					// else if (['geel','rood'].indexOf(stand) != -1) {
					// 	Aim.Videowall.stopcar(-TUNNEL_LENGTE / 2 - 120);
					// }
				}
			},
			Vluchtdeur: {
				geo: { depth: 1, height: 4, width: .2, left: 0, bottom: -3, color: 'green', },
			},
			Vluchtdeuren: {
				geo: { step: 100, distance: -TUNNEL_LENGTE / 2 + 65, children: [], },
			},
			Hulppostkast: {
				geo: { depth: 1.6, height: 1.6, width: .2, left: 0, bottom: -2, color: 'red', },
			},
			Hulppostkasten: {
				geo: {
					step: 50, distance: -TUNNEL_LENGTE / 2 + 10,
					children: [],
				},
			},
		},
	}
});
Aim.extend({
	components: {
		schemas: {
			Tunnel: {
				geo: {
					depth: TUNNEL_LENGTE,//					height: 50, width: 500, color: 'yellow',
					children: {
						grond_links: { depth: TUNNEL_LENGTE, height: 15, width: 500, left: -262, bottom: 0, distance: 0, color: Aim.color.grond2, },
						grond_rechts: { depth: TUNNEL_LENGTE, height: 15, width: 500, left: 262, bottom: 0, distance: 0, color: Aim.color.grond2, },
						grond_boven: { depth: TUNNEL_LENGTE, height: 15, width: 500, bottom: 6.2, distance: 0, color: Aim.color.grond2, },
						wand_midden: {
							depth: TUNNEL_LENGTE, height: 6, width: 2, left: 0, bottom: 0, distance: 0, color: '#ccc',
							children: {
								VluchtdeurenL: Object.assign({ left: -1 }, Aim.components.schemas.Vluchtdeuren.geo),
								VluchtdeurenR: Object.assign({ left: 1 }, Aim.components.schemas.Vluchtdeuren.geo),
								HulppostkastenL: Object.assign({ left: -1 }, Aim.components.schemas.Hulppostkasten.geo),
								HulppostkastenR: Object.assign({ left: 1 }, Aim.components.schemas.Hulppostkasten.geo),
							},
						},
						wand_rechts: {
							depth: TUNNEL_LENGTE, height: 6, width: 2, left: 11, bottom: 0, distance: 0, color: '#ccc',
							children: {
								Hulppostkasten: Object.assign({ left: -1 }, Aim.components.schemas.Hulppostkasten.geo),
							},
						},
						wand_links: {
							depth: TUNNEL_LENGTE, height: 6, width: 2, left: -11, bottom: 0, distance: 0, color: '#ccc',
							children: {
								Hulppostkasten: Object.assign({ left: 1 }, Aim.components.schemas.Hulppostkasten.geo),
							},
						},
						wand_boven: { depth: TUNNEL_LENGTE, height: .2, width: 30, left: 0, bottom: 6, distance: 0, color: '#999', },
						RijbaanL: {
							depth: 5000, height: 0.01, width: 10, left: 6, bottom: 0, distance: 0, color: Aim.color.asfalt,
							children: {
								lijn1: Object.assign({ depth: 5000, height: .01, width: 0.2, left: -4.5, bottom: .1, distance: 0, color: 0xffffff, }),
								lijn2: Object.assign({ depth: 5000, height: .01, width: 0.2, left: -1, bottom: .1, distance: 0, color: 0xffffff, }),
								lijn3: Object.assign({ depth: 5000, height: .01, width: 0.2, left: 2.5, bottom: .1, distance: 0, color: 0xffffff, }),
								//portaal1: Object.assign({ distance: portaal1, id: 1 }, typical.portaal),
								//portaal2: Object.assign({ distance: portaal1 += portaal_step, }, typical.portaal),
								//portaal3: Object.assign({ distance: portaal1 += portaal_step, }, typical.portaal),
								//portaal4: Object.assign({ distance: portaal1 += portaal_step, }, typical.portaal),
								//portaal5: Object.assign({ distance: portaal1 += portaal_step, }, typical.portaal),
							}
						},
						RijbaanR: {
							depth: 5000, height: 0.1, width: 10, left: -6, bottom: 0, distance: 0, color: Aim.color.asfalt,
							children: {
								lijn1: Object.assign({ depth: 5000, height: .01, width: 0.2, left: -2.5, bottom: .1, distance: 0, color: 0xffffff, }),
								lijn2: Object.assign({ depth: 5000, height: .01, width: 0.2, left: 1, bottom: .1, distance: 0, color: 0xffffff, }),
								lijn3: Object.assign({ depth: 5000, height: .01, width: 0.2, left: 4.5, bottom: .1, distance: 0, color: 0xffffff, }),
								//portaal1: Object.assign({ id: 1, distance: api.portaal[1].distance, }, Aim.components.schemas.Portaal.geo),
								//portaal2: Object.assign({ id: 2, distance: portaalR += portaal_step, }, Aim.components.schemas.Portaal.geo),
								//portaal3: Object.assign({ id: 3, distance: portaalR += portaal_step, }, Aim.components.schemas.Portaal.geo),
								//portaal4: Object.assign({ id: 4, distance: portaalR += portaal_step, }, Aim.components.schemas.Portaal.geo),
								//portaal5: Object.assign({ id: 5, distance: portaalR += portaal_step, }, Aim.components.schemas.Portaal.geo),
							}
						},

					}
				}
			},
		}
	}
});
