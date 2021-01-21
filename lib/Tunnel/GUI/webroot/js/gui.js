// Verkeersbuis = function () {}

(function() {
	var elTabSystem;
	getvalue = function (item, name) {
		return name in item.values ? item.values[name].title || item.values[name] || '' : item[name] || '';
	}
	em = { definitions: {} }

	function createGui(event) {
		console.log("AAAAAAAAAAA createBody", Verkeerslicht[0].properties.Stand.setValue);
		// return console.error(event);
		elBartop.createElement('SPAN', '', aim().info.title + ' ' + aim().info.description);
		const item = aim().getItem(Number(aim().auth.access.sub));
		var st = new Date().valueOf(),i=0;
		itemTunnel = item;
		Gui.buildscreen();
		console.log('MNU', aim().Gui.mnu);
		for (var name1 in aim().Gui.mnu) {
			Gui.createPanelTreeItem(name1);
		}

		//return;
		//Gui.items = aim().ref;


		console.error("Verkeerslicht", Verkeerslicht[0].properties.Stand.setValue);
		aim().items.forEach(Gui.create);


		aim().items.forEach(function (item) {
			// console.log(item);
			if (item.masterID && aim().ref[item.masterID]) {
				item.master = aim().ref[item.masterID];
				if (Object.prototype.toString.call(item.master[item.schema]) === '[object Array]') item.master[item.schema].push(aim().ref[item.id]);
				else item.master[item.schema] = aim().ref[item.id];
			}
		});


		item.elDetail = elDetailContainerChild;
		item.elOverview = elOverview;
		elMenu = {};
		var tabsLeftClick = function () {
			[...elTabsLeftControl.children].forEach(e => e.removeAttribute('selected'));
			this.setAttribute('selected', '');
			for (var name1 in aim().Gui.mnu) {
				aim().Gui.mnu[name1].elLI.style.display = 'none';
			}
			for (var i = 0, name1; name1 = this.treeitems[i]; i++) {
				aim().Gui.mnu[name1].elLI.style.display = '';
			}
			Gui.sumSignals();
		}
		with (elTabsLeftControlDGB = elTabsLeftControl.createElement('A', 'row sumitems', { selected: this.selected ? 1 : null, treeitems: 'Tunnel,Detecties,Overig,DGB'.split(','), onclick: tabsLeftClick })) {
			with (createElement('DIV', 'row aco')) {
				//verkeerskundig, deelsysteem_alarm, deelsysteem_storing, statusmelding
				createElement('icon', 'icon sum hand');
				createElement('icon', 'icon sum verkeerskundig');
				createElement('icon', 'icon sum deelsysteem_alarm');
				createElement('SPAN', this.dir || '', 'DGB');
			}
		}
		//var treeitems = [];
		elTabsBottomControlDGB = elTabsBottomControl.createElement('A', '', 'DGB', { onclick: tabclick, elTab: elTabSystem });

		//Gui.createPanelTreeItem('Tunnel');
		//Gui.createPanelTreeItem('Overig');
		//Gui.createPanelTreeItem('Detecties');
		// console.log(new Date().valueOf()-st, `step${i++}`);


		(function build(item, level) {
			// console.log(new Date().valueOf()-st, `step${i++} ${level}`);


			// console.log(item.schema);
			if (item.schema === 'Weg') {
				//Gui.createPanelTreeItem('Vluchtroute');
				Gui.elTabsBottomControlWeg = elTabsBottomControl.createElement('A', '', item.name, { onclick: tabclick, elTab: elTabSystem });
			}

			if (item.schema === 'Verkeersbuis') {
				//Gui.createPanelTreeItem('Buis');
				//Gui.createPanelTreeItem('Verkeer');
				elBuisButtonPanel = GUI.addButtonPanel.call({ title: item.name });
				var treeitems = [];
				with (Gui.elTabsLeftControlBuis = elTabsLeftControl.createElement('A', 'row sumitems', { selected: this.selected ? 1 : null, treeitems: 'Buis,Vluchtroute,Tunnel,Verkeer,Detecties,Overig'.split(','), onclick: tabsLeftClick })) {
					with (createElement('DIV', 'row aco')) {
						//verkeerskundig, deelsysteem_alarm, deelsysteem_storing, statusmelding
						createElement('icon', 'icon sum hand');
						createElement('icon', 'icon sum verkeerskundig');
						createElement('icon', 'icon sum deelsysteem_alarm');
						createElement('SPAN', this.dir || '', item.title.substr(0, 3));
					}
				}
				//Gui.elementSignalCount.push(Gui.elTabsLeftControlBuis);
			}
			if (Gui.elTabsLeftControlBuis) {
				(Gui.elTabsLeftControlBuis.items = Gui.elTabsLeftControlBuis.items || []).push(item);
			}

			if (item.mnu) {
				var menuitem = aim().Gui.menuitems[item.mnu];
				if (menuitem && menuitem.elLI) {
					(menuitem.elLI.items = menuitem.elLI.items || []).push(item);
					//console.log('>>>>>>>>>>', menuitem.parent);
					if (menuitem.parent && menuitem.parent.elLI) (menuitem.parent.elLI.items = menuitem.parent.elLI.items || []).push(item);
					//Gui.sumSignals();
					//return;

				}
			}

			var systemRow = aim().Gui.systemRows[item.schema];
			if (systemRow) {
				if (item.schema === 'Dienstgebouw') systemRow.elTabsBottomControlWeg = elTabsBottomControlDGB;
				with (systemRow.elLI = elTabSystem.createElement('LI', 'row', { elTabsBottomControlWeg: systemRow.elTabsBottomControlWeg || Gui.elTabsBottomControlWeg })) {
					createElement('DIV', '', item.name);
					with (elRowSystem = createElement('DIV', 'row a aco')) {
						for (var i in systemRow.items) {
							with (elRowSystem = createElement('DIV', 'col')) {
								for (var name in systemRow.items[i]) {
									createElement('A', '', name );
								}
							}
						}
					}
				}
			}

			function createGuiElement(element, params, child) {
				const childElement = element.createElement(params);
				[...element.attributes].forEach(attribute => {
					const key = attribute.name[0].toUpperCase() + attribute.name.substr(1);
					if (key in child) {
						const value = String(child[key]);
						if (value) {
							childElement.setAttribute(attribute.name, value);
							// console.log(attribute.name, value);
						}
					}
				});
			}

			const children = item.children;
			// console.log('children', children);
			if (children) {
				item.elDetailUL = item.elDetail.createElement('ul');
				// console.log(item.Children);
				children.forEach(child => {
					if ('selected' in child && child.selected === 0) return;
					// console.log(level, child.idx, child.id, child.schema, child.title);
					child.elDetail = item.elDetailUL.createElement('LI', child.$id, {item: child, onmouseup: Gui.showpanel, });
					child.elOverview = item.elOverview.createElement('LI', child.$id, {item: child, onmouseup: Gui.showpanel });
					if (child.gui) {
						if (child.gui.detail) {
							createGuiElement(child.elDetail, child.gui.detail, child);
						}
						if (child.gui.global) {
							createGuiElement(child.elOverview, child.gui.global, child);
						}
						if (child.gui.mnu && aim().Gui.mnu[child.gui.mnu]) {
							with (aim().Gui.mnu[child.gui.mnu].elUL.createElement('LI')) {
								createElement('DIV', 'row', child.title);
							}
						}
					}
					build(child, level + 1);
				});
			}
		})(item, 0);

		//
		//
		// const data = [
		// 	{ schema: 'sdfgsdf', children: [
		// 		{ schema: 'sdfgsdf'},
		// 		{ schema: 'sdfgsdf', children: [
		// 			{ schema: 'sdfgsdf'},
		// 			{ schema: 'sdfgsdf'},
		// 			{ schema: 'sdfgsdf'},
		// 		]},
		// 		{ schema: 'sdfgsdf'},
		// 	]},
		// 	{ schema: 'sdfgsdf'},
		// 	{ schema: 'sdfgsdf'},
		// 	{ schema: 'sdfgsdf'},
		// ]
		//
		//
		//
		// function test(par1, par2, par3, par4){
		// 	const p = par1 + par2;
		// }
		//
		//
		// test(1 ,2, 5, 8);
		//
		// const a = [1,2,5,8];
		//
		// test(...a)
		//
		//
		// aim('li').text('van', 'nu', 'tot', 'dan')
		//
		//
		// function makeLi (data) {
		// 	return data.map
		// 	return aim('li').append(
		// 		aim('div').text(item.title),
		// 		aim('ul').append(makeLi())
		// 	)
		// }
		//
		//
		// aim('ul').append(...data.map(function (item) {
		// 	return aim('li').append(
		// 		aim('div').text(item.title),
		// 		aim('ul')
		// 	)
		// }))
		//
		// aim('ul').append(...[
		// 	aim('li').append(
		// 		aim('div').text(item.title),
		// 		aim('ul')
		// 	),
		// 	aim('li').append(
		// 		aim('div').text(item.title),
		// 		aim('ul')
		// 	),
		// 	aim('li').append(
		// 		aim('div').text(item.title),
		// 		aim('ul')
		// 	),
		// 	aim('li').append(
		// 		aim('div').text(item.title),
		// 		aim('ul')
		// 	),
		// 	aim('li').append(
		// 		aim('div').text(item.title),
		// 		aim('ul')
		// 	),
		// 	aim('li').append(
		// 		aim('div').text(item.title),
		// 		aim('ul')
		// 	),
		// ])
		//
		//
		//
		//
		// const div = aim('ul');
		// data.forEach(function (item) {
		// 	div.append('li').append(
		// 		aim('div').text(item.title),
		// 		aim('ul')
		// 	);
		// });




		elTabsLeftControlDGB.parentElement.appendChild(elTabsLeftControlDGB);
		elTabsBottomControlDGB.parentElement.appendChild(elTabsBottomControlDGB);
		console.log(aim().Gui.systemRows);
		// aim().Gui.systemRows.Tunnel.elLI.parentElement.appendChild(aim().Gui.systemRows.Tunnel.elLI);
		// aim().Gui.systemRows.Tunnel.elLI.style.marginTop = 'auto';

		console.log(new Date().valueOf()-st, `step${i++}`);

		elTabsLeftControl.firstChild.click();
		//setInterval(function () {
		//	document.body.setAttribute('blink1',Gui.blibk^=1);
		//}, 500);
		Gui.loaded = true;
		Gui.sumSignals();
		console.log(aim().Gui.menuitems);
		//console.log(item.Verkeersbuis[0].Verkeerslicht[0].sf_Verkeerslicht_Verkeersbuis.Alarm_VerkeersbuisVerkeerslichtStoringGroen);3375440;

		console.log(new Date().valueOf()-st, `step${i++}`);

		//GUI.addButtonPanel.call({ title: 'H Re' });
		//GUI.addButtonPanel.call({ title: 'H Li' });
		//GUI.addButtonPanel.call({ title: 'P Re' });
		//GUI.addButtonPanel.call({ title: 'P Li' });
	}

	aim().extend({
		config: {
	    aim: {
	      websocket: {
					servers: [{ url: document.location.origin.replace(/http/, 'ws') }],
	      },
	      servers: [{ url: document.location.origin + '/api' }]
	    }
	  },
		messenger: {
			update: true,
			onreceive1: function (event) {
				//console.log(this.data.to,aim().client);
				if (this.data.state === 'connected' && aim().app != 'em' && this.data.from.app === 'em') document.location.reload();
				if (this.data.value) this.data.value.forEach(function (row) {
					if (row.signalering) for (var name in row.signalering) Gui.createSignal(api.item[row.id], name, row.signalering[name]);
				});
			},
		},
		Gui: Gui = GUI = {
			sumSignals: function () {
				(sumsignals = function (item) {
					item.signals = {
						deelsysteem_alarm: 0,
						deelsysteem_alarm_active: 0,
						deelsysteem_storing: 0,
						deelsysteem_storing_active: 0,
						status_melding: 0,
						status_melding_active: 0,
					}
					for (var name in item.properties) {
						var prop = item.properties[name];
						if (prop.stereotype === "signalering") {
							if (item[name]) {
								item.signals[prop.type]++;
								if (item[name].value) item.signals[prop.type + '_active']++;
							}
						}
					}
					if (item.children) item.children.forEach(sumsignals);
					if (item.master && item.master.signals) for (var name in item.signals) item.master.signals[name] += item.signals[name];
					//console.log(item.title, item.signals);
				})(itemTunnel);

				for (var i = 0, el, c = document.getElementsByClassName('sumitems') ; el = c[i]; i++) {
					if (!el.items) continue;
					var signals = {
						deelsysteem_alarm: 0,
						deelsysteem_alarm_active: 0,
						deelsysteem_storing: 0,
						deelsysteem_storing_active: 0,
						status_melding: 0,
						status_melding_active: 0,
					};
					el.items.forEach(function (item) {
						for (var name in item.signals) signals[name] += item.signals[name];
					});
					for (var name in signals) el.setAttribute(name, signals[name]);
				}
			},
			createSignal: function (item, name, row) {
				var prop = item.properties[name];
				//item[name] = value;
				//console.log(name, item[name]);
				if (!item[name]) with (item[name] = elSignals.createElement('LI', '', { item: item, name: name, onclick: Gui.bevestig, el: {} })) {
					createElement('SPAN', 'type icon ' + prop.type );
					item[name].el.cam = createElement('SPAN', 'cam');
					item[name].el.time = createElement('SPAN', 'tijd');
					createElement('SPAN', 'locatie', prop.locatie);
					createElement('SPAN', 'title', prop.title);
					item[name].el.notitie = createElement('SPAN', 'notitie');
				};
				//console.log(name, row, item[name]);
				for (var attrname in row) if (item[name].el[attrname]) item[name].el[attrname].setAttribute('value', row[attrname]);
				item[name].setAttribute('value', item[name].value = row.value);
				Gui.sumSignals();
				//(function signalup(item) {
				//	console.log('SIGNALUP',item);
				//	if (item.master) signalup(item.master);
				//})(item);
			},
			createElementGUI: function () {
				with (this.elDetail = elDetail.createElement('LI', { style: "top:" + this.top + "px;left:" + this.left + 'px' }).createElement('DIV', this.className || this.schema, {item: this, onmouseup: Gui.showpanel, })) {
					if (this.gui.construct) this.gui.construct.call(this);
					createElement('ICN', 'hand');
					createElement('ICN', 'disable');
					createElement('ICN', 'storing');
				}
			},
			element: {
			},
			signaleringen: {
			},
			itemids: {},
			key: aim().key = aim().uid || aim().key,
			definitions: {},
			bevestig: function (event) {
				this.signal.bevestigd = true;
				this.signal.onchange();
			},
			msgSend: function (data) {
				console.log('SEND', data.id, data.values, data);
				aim().messenger.send({ msg: { item: { [data.id]: data } } });
			},
			showpanel: function (event) {
				console.log('showpanel', this.item);
				event.stopPropagation();
				var item = this.item;
				if (item.elPanel) return item.elPanel.onclick();
				with (item.elPanel = document.body.createElement('DIV', 'col itemFaceplate noselect', { draggable: false })) {
					item.elPanel.onclick = function (event) {
						console.log('CLICKED');
						//item.elPanel.parentElement.appendChild(item.elPanel);
						item.elPanel.style.display = '';
					};
					createElement('DIV', 'header', 'Langsventilatie HBL01 123.10', {
						onmousedown: function(event) {
							(window.elementMove = this.parentElement).move = { screenX: event.screenX, screenY: event.screenY, offsetLeft: window.elementMove.offsetLeft, offsetTop: window.elementMove.offsetTop };
							window.onmousemove = function (event) {
								window.elementMove.style.left = Math.min(document.body.clientWidth - window.elementMove.offsetWidth, Math.max(0, window.elementMove.move.offsetLeft + event.screenX - window.elementMove.move.screenX)) + 'px'
								window.elementMove.style.top = Math.min(document.body.clientHeight - window.elementMove.offsetHeight, Math.max(0, window.elementMove.move.offsetTop + event.screenY - window.elementMove.move.screenY)) + 'px'
							}
							window.onmouseup = function (event) {
								window.elementMove = null;
								window.onmousemove = null;
							}
						},
					}).createElement('BUTTON', 'close', 'x', {
						el: item.elPanel, onclick: function (event) {
							console.log('CLOSSED');
							this.el.style.display = 'none'; event.stopPropagation();
						}
					});
					var tabControl = createElement('DIV', 'row tabsControl');
					var tabSheet = createElement('DIV', 'col aco tabSheets');
					var tab = function () {
						this.onclick = function () {
							var c = this.parentElement.children;
							for (var i = 0, e; e = c[i]; i++) {
								e.sheet.style.display = 'none';
								e.removeAttribute('selected');
							}
							this.sheet.style.display = '';
							this.setAttribute('selected', '');

						}
						this.sheet = tabSheet.createElement('DIV', 'col aco itemPanel');
						return this;
					}
					item.tabs = {
						Overzicht: tab.call(tabControl.createElement('A', '', 'Overzicht')),
						Meldingen: tab.call(tabControl.createElement('A', '', 'Meldingen')),
						Configuratie: tab.call(tabControl.createElement('A', '', 'Configuratie')),
						ResetOnd: tab.call(tabControl.createElement('A', '', 'Reset onderdr.')),
					}
					item.tabs.Overzicht.onclick();
					with (item.tabs.Overzicht.sheet) {
						with (createElement('DIV', 'row')) {
							createElement('b', 'aco', item.title);
							createElement('A', 'auto', 'auto');
							createElement('A', 'hand', 'hand');
							createElement('A', '', 'x');
						}
						with (createElement('UL', 'col aco')) {
							if (item.control.variabelen) {
								with (createElement('LI')) {
									//console.log('VALUES', item.title, item.values);
									for (var name in item.values) setAttribute(name, getvalue(item, name));
									createElement('DIV', 'row opener', 'Variabelen', { open: 1, onclick: function () { this.setAttribute('open', this.getAttribute('open') ^ 1); } });
									with (createElement('DIV')) {
										for (var name in item.control.variabelen) {
											with (createElement('DIV', 'row')) {
												createElement('SPAN', 'aco', name);
												createElement('SPAN', item.id + '_' + name, item.control.variabelen[name].value || '' );
											}
										}
									}
								}
							}
							if (item.control.bedieningen) {
								with (createElement('LI')) {
									createElement('DIV', 'row opener', 'Bedieningen', { open: 1, onclick: function () { this.setAttribute('open', this.getAttribute('open') ^ 1); } });
									with (createElement('DIV')) {
										for (var name in item.control.bedieningen) with (createElement('DIV', 'row')) {
											var fn = item.control.bedieningen[name].js;
											var code = String(fn);
											var par = code.split('(')[1].split(')').shift().trim();
											var values = String(fn).split("\r\n").shift().split("//");
											values.shift();
											values = values.length ? values.shift().trim().split('|') : '';
											if (!par) {
												createElement('SPAN', 'aco', name, {item: item, fn: fn, onclick: function () { this.fn.call(this.item); } });
											} else {
												createElement('SPAN', 'aco', name);
												if (!values) createElement('input', { item: item, fn: fn, onchange: function () { this.fn.call(this.item, this.value); } });
												else with (createElement('SPAN')) {
													values.forEach(function (val) {
														createElement('SPAN', 'aco', val, {item: item, fn: fn, onclick: function () { this.fn.call(this.item, this.innerText); } });

													});
												}
											}
										}
									}
								}
							}
						}
					}
				}
			},
			create(item) {
				item.name = [item.schema, item.schema, item.id].join('_');
				item.className = [item.schema, item.schema, item.id].join(' ');
				if (em.definitions[item.schema]) {
					(api.components.schemas[item.schema] = api.components.schemas[item.schema] || {}).control = em.definitions[item.schema];
				}
				//if (Gui.definitions[item.schema]) (api.components.schemas[item.schema] = api.components.schemas[item.schema] || {}).gui = Gui.definitions[item.schema];
				if (aim().components.schemas[item.schema]) {
					// Object.assign(item, aim().components.schemas[item.schema]);
					if (item.gui) {
						// console.log(item);
						Gui.itemids[item.id] = item;
						//if (item.gui.construct) item.gui.construct.call(item);
					}
				}
				aim().ref[item.id] = item;
				return item;
			},
			addButtonPanel: function () {
				var pdRoodUit = function () { }
				with (elBuisButtonPanel = elButtonpanel.createElement('DIV', 'row ' + this.id, { state: this.state, opendicht: this.open } )) {
					createElement('SPAN', 'title', this.title);
					createElement('BUTTON', 'button c l r' );
					createElement('SPAN', 'status');
					createElement('SPAN', 'pd');
					createElement('SPAN', 'opendicht');

					createElement('BUTTON', 'button rood l');
					createElement('BUTTON', 'button down s r', { onclick: function () {
							with (this.elPU = this.createElement('DIV', 'popupselect')) {
								createElement('DIV', '', 'Rood', {onclick(event) {
										event.stopPropagation();
										this.elPU.parentElement.removeChild(this.elPU);
										aim().messenger.send({
											to: [aim().client.domain.id], value: [
												{ id: 3318023, operations: { Hand_VerkeerslichtenRood: [] } },

												//{ id: 3375427, operations: { SetStand: ['rood'] } }, // lfv_verkeerslichten_1
												//{ id: 3375446, operations: { SetStand: ['rood'] } }, // lfv_verkeerslichten_2
												//{ id: 3375454, operations: { SetStand: ['rood'] } }, // lfv_verkeerslichten_3
											]
										});
									}
								});
								createElement('DIV', '', 'Gedoofd', { onclick(event) {
										event.stopPropagation();
										this.elPU.parentElement.removeChild(this.elPU);
										aim().messenger.send({
											to: [aim().client.domain.id], value: [
												{ id: 3318023, operations: { Hand_VerkeerslichtenGedoofd: [] } },

												//{ id: 3375427, operations: { SetStand: ['groen'] } }, // lfv_verkeerslichten_1
												//{ id: 3375446, operations: { SetStand: ['groen'] } }, // lfv_verkeerslichten_2
												//{ id: 3375454, operations: { SetStand: ['groen'] } }, // lfv_verkeerslichten_3
											]
										});

										//setTimeout(function () {
										//	aim().messenger.send({
										//		to: [aim().client.domain.id], value: [

										//			{ id: 3375427, operations: { SetStand: ['gedoofd'] } }, // lfv_verkeerslichten_1
										//			{ id: 3375446, operations: { SetStand: ['gedoofd'] } }, // lfv_verkeerslichten_2
										//			{ id: 3375454, operations: { SetStand: ['gedoofd'] } }, // lfv_verkeerslichten_3
										//		]
										//	});

										//}, 6000);


									}
								});
							}
						}
					});
					createElement('BUTTON', 'button sluit l', { onclick(event) {
						// Verkeersbuis(0).setVerkeerslichtenHandStandRood();
						// return;
						this.elPU = this.createElement('DIV', 'popupselect', [
							['DIV', '', 'Sluit', { onclick: event => {
								event.stopPropagation();
								Verkeersbuis(0).setVerkeerslichtenHandStandRood();
								this.elPU.remove();
							}}],
							['DIV', '', 'Gedoofd', { onclick: event => {
								event.stopPropagation();
								Verkeersbuis(0).setVerkeerslichtenHandStandGroen();
								this.elPU.remove();
							}}],
						]);
					}});
					createElement('BUTTON', 'button open r', { onclick() {
						Verkeersbuis(0).setVerkeerslichtenHandStandGroen();
						// VerkeersbuisAfsluiter().Hand_VerkeerslichtenGedoofd();
					}});
					createElement('BUTTON', 'button kijk l');
					createElement('BUTTON', 'button down s r');
					let kanaalID = 0;
					function setCam(camID) {
						const cam = webcam.cams[camID];
						console.log(camID, webcam.cams, cam);
						webcam.send('SETWALL', {target: channels[kanaalID].id, cam: cam.cam } );
					}
					this.camNext = function () {
						setCam(channels[kanaalID].camID = Math.min(webcam.cams.length-1, 'camID' in channels[kanaalID] ? channels[kanaalID].camID + 1 : 0));
						// return;
						// // aim().messenger.send({ to: [aim().client.domain.id], kanaal: this.kanaalID, cam: CCTV.kanalen[this.kanaalID].cameraID = Math.min(CCTV.cameras.length - 1, CCTV.kanalen[this.kanaalID].cameraID + 1) });
						// aim().ws.request({
						// 	from:'gui',
						// 	method:'POST',
						// 	path: `/kanaal(${this.kanaalID})/camera(${aim().kanalen[this.kanaalID].cameraID = Math.min(aim().cameras.length - 1, aim().kanalen[this.kanaalID].cameraID + 1)})`
						// });
					};
					this.camPrior = function () {
						setCam(channels[kanaalID].camID = Math.max(0, 'camID' in channels[kanaalID] ? channels[kanaalID].camID - 1 : 0));
						// const camID = channels[kanaalID].camID = channels[kanaalID].camID ? channels[kanaalID].camID - 1 : 0;
						// webcam.send('SETWALL', {target: channels[kanaalID].id, cam: cams[camID].cam } );
						// return;
						// // aim().messenger.send({ to: [aim().client.domain.id], kanaal: this.kanaalID, cam: CCTV.kanalen[this.kanaalID].cameraID = Math.max(0, CCTV.kanalen[this.kanaalID].cameraID - 1) });
						// aim().ws.request({ from:'gui', method:'POST', path: `/kanaal(${this.kanaalID})/camera(${aim().kanalen[this.kanaalID].cameraID = Math.max(0, aim().kanalen[this.kanaalID].cameraID - 1)})` });
					}
					this.kanaalNext = function () {
						kanaalID = Math.min(channels.length, kanaalID + 1);
						console.debug(kanaalID);
						// aim().ws.request({ from:'gui', method:'POST', path: `/kanaal(${this.kanaalID})` });
					};
					this.kanaalPrior = function () {
						kanaalID = Math.max(0, kanaalID - 1);
						console.debug(kanaalID);
						// aim().ws.request({ from:'gui', method:'POST', path: `/kanaal(${this.kanaalID})` });
					}
					this.presetSet = function (presetID) {
						// aim().messenger.send({ to: [aim().client.domain.id], kanaal: this.kanaalID, cam: CCTV.kanalen[this.kanaalID].cameraID, preset: presetID });
						aim().ws.request({ from:'gui', method:'POST', path: `/kanaal(${this.kanaalID})/camera(${aim().kanalen[this.kanaalID].cameraID})/preset(${presetID})` });
					}

					var btnKeydown = function (event) {
						switch (event.key) {
							case 'ArrowUp': this.camNext(); break;
							case 'ArrowDown': this.camPrior(); break;
							case 'ArrowRight': this.kanaalNext(); break;
							case 'ArrowLeft': this.kanaalPrior(); break;
							case '1': this.presetSet(0); break;
							case '2': this.presetSet(1); break;
							case '3': this.presetSet(2); break;
							case '4': this.presetSet(3); break;
							case '5': this.presetSet(4); break;
							case '6': this.presetSet(5); break;
							default: return;
						}
						event.preventDefault();
					};
					this.btnLinks = createElement('BUTTON', 'button links l', { onclick: this.camPrior.bind(this), onkeydown: btnKeydown.bind(this) });
					this.btnRechts = createElement('BUTTON', 'button rechts r', { onclick: this.camNext.bind(this), onkeydown: btnKeydown.bind(this) });
				}
				return elBuisButtonPanel;
			},
			//addTabL: function () {
			//	if (!Gui.tabLselected) Gui.tabLselected = this;
			//	this.select = function (event) {
			//		if (this.tab) return this.tab.select();
			//		var c = this.el.parentElement.children;
			//		for (var i = 0, e; e = c[i]; i++) e.removeAttribute('selected');
			//		this.el.setAttribute('selected', 1);
			//		for (var name in Gui.data.tabsheetL) {
			//			//console.log(name, this.groups);
			//			Gui.data.tabsheetL[name].el.style.display = this.groups.indexOf(name) === -1 ? 'none' : '';
			//		}
			//	}
			//	with (elTabsLeftControl) {
			//		with (this.el = createElement('A', { className: 'row', attr: this.selected ? { selected: 1 } : {}, tab: this, onclick: this.select })) {
			//			with (createElement('DIV', { className: 'row aco', })) {
			//				//verkeerskundig, deelsysteem_alarm, deelsysteem_storing, statusmelding
			//				createElement('icon', { className: 'hand' });
			//				createElement('icon', { className: 'verkeerskundig' });
			//				createElement('icon', { className: 'deelsysteem_alarm' });
			//				createElement('SPAN', { innerText: this.title, className: this.dir || '' });
			//			}
			//		}
			//	}
			//},
			showtabpanelitem: function (el, level) {
				with (this.tabpanel = el.createElement('LI', this.id, { bedieningswijze: this.values && this.values.bedieningswijze ? this.values.bedieningswijze.title || this.values.bedieningswijze || '' : '' } )) {
					with (createElement('DIV', 'row', { open: level > 0 ? 0 : null, onclick: function () { this.setAttribute('open', this.getAttribute('open') ^ 1) } } )) {
						createElement('SPAN', '', this.title);
						with (createElement('DIV', 'btns')) {
							createElement('A', 'btn_auto', { item: this, onclick: function (event) {
									event.stopPropagation();
									Gui.msgSend({ id: this.item.id, method: { SetOpAutobediening: [] } });
								}});
							createElement('A', 'btn_hand', { item: this, onclick: function (event) {
									event.stopPropagation();
									Gui.msgSend({ id: this.item.id, method: { SetOpHandbediening: [] } });
								}});
						}
						if (!level) createElement('A', 'close');
					}
					with (this.elUl = createElement('ul')) {
						if (this.control) {
							var variabelen = this.control.variabelen;
							for (var name in variabelen) {
								var prop = variabelen[name];
								if (prop.gui) {
									with (createElement('DIV', 'row')) {
										if (name in this.values) {
											this.tabpanel.setAttribute(name, getvalue(this, name));
										}
										createElement('SPAN', 'aco', prop.title);
										createElement('SPAN', 'selectpo ' + this.id + '_' + name, String(getvalue(this, name)).replace(/_/g, ' ').capitalize(), {
											item: this,
											enum: variabelen[prop.Gui.selectvariabele].enum,
											bediening: prop.Gui.bediening,
											onclick: function () {
												var options = this.enum.split('|');
												var rect = this.getBoundingClientRect();
												var span = this;
												with (popupselect) {
													options.forEach(function (option) {
														//console.log(span, span.item, span.bediening);
														createElement('DIV', '', String(option.replace(/_/g, ' ')).capitalize(), {
															value: option, span: span, onclick: function () {
																Gui.msgSend({ id: this.span.item.id, method: { [this.span.bediening]: [this.value] } });
																popupselect.innerText = '';
															}
														});
													});
													style.left = (rect.right - popupselect.offsetWidth) + 'px';
													style.top = rect.top + 'px';
												}
											}
										});
									}
								}
							}
						}
						if (this.children) {
							for (var name in this.children) Gui.showtabpanelitem.call(this.children[name], this.elUl, level + 1);
						}
					}
				}
				return el;
			},
			showtabpanel: function () {
				if (this.item.opentab) return this.item.opentab();//style.display = '';
				Gui.showtabpanelitem.call(this.item, elPanel, 0);
				(this.item.opentab = function () {
					var c = this.tabpanel.parentElement.children;
					for (var i = 0, e; e = c[i]; i++) e.style.display = 'none';
					this.tabpanel.style.display = '';
				}).call(this.item);
			},
			//addTabsheetL: function (item) {
			//	//console.log(item);
			//	with (item.el = elPanelTree.createElement('LI', { className: 'col' })) {
			//		with (createElement('DIV', { className: 'row', attr: { open: 0 }, onclick: function () { this.setAttribute('open', this.getAttribute('open') ^ 1) } })) {
			//			createElement('SPAN', { innerText: item.title });
			//			createElement('icon', { className: 'deelsysteem_alarm' });
			//			createElement('icon', { className: 'verkeerskundig' });
			//			createElement('icon', { className: 'hand' });
			//		}
			//		with (createElement('ul', { className: 'col' })) {
			//			for (var name in item.children) {
			//				var subitem = item.children[name];
			//				with (createElement('LI').createElement('DIV', { className: 'row', item: subitem, onclick: Gui.showtabpanel })) {
			//					createElement('icon', { className: 'bb' });
			//					createElement('icon', { className: 'deelsysteem_alarm' });
			//					createElement('icon', { className: 'verkeerskundig' });
			//					createElement('icon', { className: 'hand' });
			//					createElement('SPAN', { innerText: subitem.title });
			//				}
			//			}
			//		}
			//	}
			//},
			buildscreen: function () {

				with (elBartop) {
					// createElement('SPAN', '', aim().config.info.title + aim().config.info.description);
					// createElement('SPAN', aim().access.name, { style: 'margin-left:auto;margin-right:5px;' } );
					elTime = createElement('SPAN');
					createElement('SPAN', 'close');
				}
				setInterval(function () {
					document.body.setAttribute('blink', Gui.blink ^= 1);
					elTime.innerText = new Date().toLocaleTimeString();
				}, 1000);
				with (elSignalButtons) {
					createElement('A', 'button gray check l');
					createElement('A', 'button gray checkCam');
					createElement('A', 'button gray checkAll r');
					createElement('A', 'button gray ond l r ');
					createElement('A', 'button gray toon l r ');
					createElement('A', 'button gray notitie l r ');
					createElement('A', 'button gray showOnd l r ');
				}
				with (elTabsBottomControl) {
					tabclick = function (event) {
						//console.log(this, this.elTab);
						if (Gui.tabBottom) {
							if (Gui.tabBottom.elTab) Gui.tabBottom.elTab.style.display = 'none';
							Gui.tabBottom.removeAttribute('selected')
						}
						(Gui.tabBottom = this).setAttribute('selected', '');
						if (Gui.tabBottom.elTab) Gui.tabBottom.elTab.style.display = '';
						elSignalsBevCont.style.display = 'none';

						if (elTabSystem) for (var i = 0, e, c = elTabSystem.children; e = c[i]; i++) if (e.elTabsBottomControlWeg) e.style.display = e.elTabsBottomControlWeg === this ? '' : 'none';
					};
					Gui.tabBottom = createElement('A', '', 'Meldingen', { selected: '', onclick: function () {
							tabclick.call(this);
							elSignalsBevCont.style.display = '';
						}, elTab: elTabsBottom.createElement('DIV', 'row', {style: 'display:none;' })
					});

					var el = createElement('A', 'verkeer', 'Verkeer', { onclick: tabclick, elTab: elTabsBottom.createElement('DIV', 'row tab verkeer', { style: 'display:none;' }) });

					el.click();

					with (el.elTab) {
						with (createElement('DIV', 'baaninfo col')) {
							with (createElement('DIV', 'row aco')) {
								with (createElement('DIV', 'col')) {
									createElement('DIV', '', 'Re');
								}
								with (createElement('DIV', 'col')) {
									elReFlow = createElement('DIV', 'flow', '25')
									elReLight = createElement('DIV', 'light', '7')
									elReSound = createElement('DIV', 'sound')
									elReRDS = createElement('DIV', 'rds')
								}
							}
							with (createElement('DIV', 'row aco ')) {
								with (createElement('DIV', 'col')) {
									createElement('DIV', '', 'MTK');
								}
								with (createElement('DIV', 'col')) {
									elMtkStuur = createElement('DIV', 'stuur')
									elMtkLight = createElement('DIV', 'light')
									elMtkSound = createElement('DIV', 'sound')
								}
							}
							with (createElement('DIV', 'row aco ')) {
								with (createElement('DIV', 'col')) {
									createElement('DIV', '', 'Wi');
								}
								with (createElement('DIV')) {
									elLiFlow = createElement('DIV', 'flow','25')
									elLiLight = createElement('DIV', 'light', '0')
									elLiSound = createElement('DIV', 'sound')
									elLiRDS = createElement('DIV', 'rds')
								}
							}
						}
						onviewscroll = function (event) {
							var scaleHeight = elDetailContainerChild.offsetHeight / elOverview.offsetHeight;
							var scaleWidth = elDetailContainerChild.clientWidth / elOverview.clientWidth;
							viewpanel.style.top = (elDetailContainer.scrollTop / (elDetailContainer.scrollHeight - elDetailContainer.offsetHeight) * (elOverview.offsetHeight - viewpanel.offsetHeight)) + 'px';
							viewpanel.style.left = (elDetailContainer.scrollLeft / (elDetailContainer.scrollWidth - elDetailContainer.offsetWidth) * (elOverview.offsetWidth - viewpanel.offsetWidth)) + 'px';

							if (elDetailContainer.scrollTop < 200) {
								weg = 'N2';
								kmsl = Math.round(((elDetailContainer.scrollLeft / 118) + 63) * 10) / 10;
								kmsr = kmsl - 0.6;
							}
							else {
								weg = 'A2';
								kmsl = Math.round(((elDetailContainer.scrollLeft / 118) + 110) * 10) / 10;
								kmsr = kmsl + 0.6;
							}

							function writekm(naam, weg, kms) {
								with (document.getElementById(naam)) {
									children[0].innerText = weg;
									children[1].innerText = kms;
								}
							}
							writekm('kmblb', weg + ' Li', (kmsl).toFixed(1));
							writekm('kmbrb', weg + ' Li', (kmsr).toFixed(1));
							writekm('kmblo', weg + ' Re', (kmsl).toFixed(1));
							writekm('kmbro', weg + ' Re', (kmsr).toFixed(1));

							elReFlow.innerText = Math.round(Math.random() * 3);
							elReLight.innerText = Math.round(Math.random() * 3);
							elReSound.innerText = Math.round(Math.random() * 3);
							elReRDS.innerText = Math.round(Math.random() * 3);
							elMtkStuur.innerText = Math.round(Math.random() * 3);
							elMtkLight.innerText = Math.round(Math.random() * 3);
							elMtkSound.innerText = Math.round(Math.random() * 3);
							elLiFlow.innerText = Math.round(Math.random() * 3);
							elLiLight.innerText = Math.round(Math.random() * 3);
							elLiSound.innerText = Math.round(Math.random() * 3);
							elLiRDS.innerText = Math.round(Math.random() * 3);
						};
						with (elDetailContainer = createElement('DIV', 'aco detail', { onscroll: onviewscroll })) {
							with (elDetailContainerChild = createElement('DIV', 'col', { style: 'height:800px;width:' + (840 * 8) + 'px;' })) {
								createElement('img', { src: "image/bg_detail.png"  });
								elOverview.createElement('img', { src: "image/bg_detail.png" });
								//elDetailTop = createElement('ul', { className: 'sbs' });
							}
						}
						scale = {
							x: (elDetailContainerChild.offsetWidth - elDetailContainer.offsetWidth) / (elOverview.offsetWidth - viewpanel.offsetWidth),
							y: (elDetailContainerChild.offsetHeight - elDetailContainer.offsetHeight) / (elOverview.offsetHeight - viewpanel.offsetHeight)
						};
						console.log(scale, elDetailContainerChild.offsetHeight, elDetailContainer.offsetHeight);
						(function () {
							this.addEventListener("mousedown", this.startmove = function (event) {
								console.log('start');
								//elDetailContainer.scrollLeft = 2000;

								//if (!this.panelpos) {
								startpos = { clientX: event.clientX, clientY: event.clientY, startleft: viewpanel.offsetLeft, starttop: viewpanel.offsetTop }
								targetpanel.style.left = startpos.startleft + 'px';
								targetpanel.style.top = startpos.starttop + 'px';
								targetpanel.setAttribute('show', '');
								targetpanel.setAttribute('move', '');
								document.addEventListener("mousemove", viewpanel.movepanel, true);
								document.addEventListener("mouseup", viewpanel.movepanelend, true);
							});
							this.movepanel = function (event) {
								target = { deltaX: event.clientX - startpos.clientX, deltaY: event.clientY - startpos.clientY };
								target.left = startpos.startleft + target.deltaX;
								target.top = startpos.starttop + target.deltaY;
								//target.endtop = target.top > 150 ? 150 : 30;


								target.steps = (elDetailContainerChild.offsetWidth - elDetailContainer.offsetWidth) / (elDetailContainer.offsetWidth / 2);
								target.delta = { width: Math.round(elOverview.offsetWidth / target.steps) };
								target.newleft = Math.min(Math.max(0, Math.round(target.left / target.delta.width) * target.delta.width), elOverview.offsetWidth - viewpanel.offsetWidth);
								target.newtop = target.top > 150 ? 165 : 30;

								//console.log(target);
								targetpanel.style.left = target.newleft + 'px';
								targetpanel.style.top = target.newtop + 'px';
							}
							this.movepanelend = function (event) {
								document.removeEventListener("mouseup", viewpanel.movepanelend, true);
								document.removeEventListener("mousemove", viewpanel.movepanel, true);


								// var top = ((elDetailContainer.scrollTop / (elDetailContainer.scrollHeight - elDetailContainer.offsetHeight)) * (elOverview.offsetHeight - viewpanel.offsetHeight)) + 'px';
								// var left = ((elDetailContainer.scrollLeft / (elDetailContainer.scrollWidth - elDetailContainer.offsetWidth)) * (elOverview.offsetWidth - viewpanel.offsetWidth)) + 'px';
								// var scrollTop = ((elDetailContainer.scrollTop / (elDetailContainer.scrollHeight - elDetailContainer.offsetHeight)) * (elOverview.offsetHeight - viewpanel.offsetHeight)) + 'px';
								var scrollLeft = target.newleft / (elOverview.offsetWidth - viewpanel.offsetWidth) * (elDetailContainer.scrollWidth - elDetailContainer.offsetWidth);
								var scrollTop = target.newtop / (elOverview.offsetHeight - viewpanel.offsetHeight) * (elDetailContainer.scrollHeight - elDetailContainer.offsetHeight);


								elDetailContainer.scrollTo({ top: scrollTop, left: scrollLeft, behavior: 'smooth' });


								targetpanel.removeAttribute('show');
								targetpanel.removeAttribute('move');
							}
						}).call(viewpanel);

						createElement('DIV', 'kmb col', { id: 'kmblb' }, [
							['SPAN', '', 'A2 m'],
							['SPAN', '', '30,2'],
						]);
						createElement('DIV', 'kmb col', { id: 'kmbrb' }, [
							['SPAN', '', 'A2 Re'],
							['SPAN', '', '30,2'],
						]);
						createElement('DIV', 'kmb col', { id: 'kmblo' }, [
							['SPAN', '', 'A2 m'],
							['SPAN', '', '30,2'],
						]);
						createElement('DIV', 'kmb col', { id: 'kmbro' }, [
							['SPAN', '', 'A2 Li'],
							['SPAN', '', '30,2'],
						]);

						createElement('DIV', 'btndetailnav', { id: 'btnup', onclick: function () { elDetailContainer.scrollTop = 0; } });
						createElement('DIV', 'btndetailnav', { id: 'btndown', onclick: function () { elDetailContainer.scrollTop = 10000; } });
						createElement('DIV', 'btndetailnav', { id: 'btnright', onclick: function () { elDetailContainer.scrollLeft += elDetailContainer.clientWidth/2; } });
						createElement('DIV', 'btndetailnav', { id: 'btnleft', onclick: function () { elDetailContainer.scrollLeft -= elDetailContainer.clientWidth/2; } });
					}
					elTabSystem = elTabsBottom.createElement('ul', 'col tab system', { style: 'display:none;' });
				}
				with (elSignalsBevCont.createElement('DIV', 'row check', { style: "line-height:30px;" })) {
					'verkeerskundig,deelsysteem_alarm,deelsysteem_storing,statusmelding,onderdrukte_melding'.split(',').forEach(function (name) {
						createElement('input', { type: 'checkbox', id: name });
						createElement('label', name, name.replace(/_/g, ' '), { for: name } );
					});
				}

			},
			menuitems: {},
			createPanelTreeItem: function (name1) {
				var topmenuitem = aim().Gui.menuitems[name1] = aim().Gui.mnu[name1];
				with (elPanelTree.createElement('LI')) {
					with (topmenuitem.elLI = createElement('DIV', 'row sumitems', { open: 0 })) {
						createElement('SPAN', '', topmenuitem.title || name1);
						createElement('icon', 'icon sum deelsysteem_alarm');
						createElement('icon', 'icon sum verkeerskundig');
						createElement('icon', 'icon sum hand');
					}
					with (createElement('ul', 'col')) {
						for (var name2 in topmenuitem.children) {
							//var menuitem = aim().Gui.mnu[name2] = aim().Gui.mnu[name1][name2];
							var menuitem = aim().Gui.menuitems[name2] = topmenuitem.children[name2];
							menuitem.parent = topmenuitem;
							with (createElement('LI')) {
								var onopen = function () {
									console.log(this.items);
									with (this.tabpanel = elPanel.createElement('LI', this.id, { bedieningswijze: this.values && this.values.bedieningswijze ? this.values.bedieningswijze.title || this.values.bedieningswijze || '' : '' } )) {
										with (createElement('DIV', 'row', { open: 1 })) {
											createElement('SPAN', '', this.menuitem.title || this.menuitem.name);
											with (createElement('DIV', 'btns')) {
												createElement('A', 'btn_auto', { item: this, onclick: function (event) {
													event.stopPropagation();
													Gui.msgSend({ id: this.item.id, method: { SetOpAutobediening: [] } });
												}});
												createElement('A', 'btn_hand', { item: this, onclick: function (event) {
													event.stopPropagation();
													Gui.msgSend({ id: this.item.id, method: { SetOpHandbediening: [] } });
												}});
											}
											//if (!level) createElement('A', { className: 'close' });
										}
										with (this.elUl = createElement('ul')) {
											//if (this.control) {
											//	var variabelen = this.control.variabelen;
											//	for (var name in variabelen) {
											//		var prop = variabelen[name];
											//		if (prop.gui) with (createElement('DIV', { className: 'row' })) {
											//			if (name in this.values) this.tabpanel.setAttribute(name, getvalue(this, name));
											//			createElement('SPAN', { className: 'aco', innerText: prop.title });
											//			createElement('SPAN', {
											//				className: 'selectpo ' + this.id + '_' + name, innerText: String(getvalue(this, name)).replace(/_/g, ' ').capitalize(), item: this, enum: variabelen[prop.Gui.selectvariabele].enum, bediening: prop.Gui.bediening,
											//				onclick: function () {
											//					var options = this.enum.split('|');
											//					var rect = this.getBoundingClientRect();
											//					var span = this;
											//					with (popupselect) {
											//						options.forEach(function (option) {
											//							//console.log(span, span.item, span.bediening);
											//							createElement('DIV', {
											//								value: option, innerText: String(option.replace(/_/g, ' ')).capitalize(), span: span, onclick: function () {
											//									Gui.msgSend({ id: this.span.item.id, method: { [this.span.bediening]: [this.value] } });
											//									popupselect.innerText = '';
											//								}
											//							});
											//						});
											//						style.left = (rect.right - popupselect.offsetWidth) + 'px';
											//						style.top = rect.top + 'px';
											//					}
											//				}
											//			});
											//		}
											//	}
											//}
											if (this.items) this.items.forEach(function (item) {
												with (item.elLI = createElement('LI')) {
													with (createElement('DIV', 'row sumitems', { items: [item], open: 0 })) {
														createElement('SPAN', '', item.title || item.name);
														createElement('icon', 'icon sum deelsysteem_alarm');
														createElement('icon', 'icon sum verkeerskundig');
														createElement('icon', 'icon sum hand');
													}
													(addchildren = function (item) {
														if (!item.children) return;
														with (item.elLI.createElement('ul')) {
															item.children.forEach(function (child) {
																with (child.elLI = createElement('LI')) {
																	with (createElement('DIV', 'row sumitems', { items: [child], open: 0 })) {
																		createElement('SPAN', '', child.title || child.name);
																		createElement('icon', 'icon sum deelsysteem_alarm');
																		createElement('icon', 'icon sum verkeerskundig');
																		createElement('icon', 'icon sum hand');
																	}
																	addchildren(child);
																}
															});
														}
													})(item);
												}
											});
										}
									}
									Gui.sumSignals();
								}
								menuitem.name = name2;
								with (menuitem.elLI = createElement('DIV', 'row sumitems', { menuitem: menuitem, open: 0, onopen: onopen })) {
									createElement('icon', 'icon sum bb');
									createElement('icon', 'icon sum deelsysteem_alarm');
									createElement('icon', 'icon sum verkeerskundig');
									createElement('icon', 'icon sum hand');
									createElement('SPAN', '', menuitem.title || name2);
								}
								menuitem.elUL = elPanel.createElement('ul', 'col');
							}
						}
					}
				}
			},
		},
	});
	aim().on('ready', function() {
		var vmsOptions = {wall:'1', control:1};
		// var vmsOptions = {wall:'1'};
		// var vmsOptions = get;
		// console.log('vmsOptions', vmsOptions);
		// webcam = new Webcam(vmsOptions);
		// webcam.startChat(vmsOptions);
		console.log(aim.item)
		aim(document.documentElement).class('gui');

		aim(document.body).text('').class('col gui').append(
			aim('div').class('row bartop').id('elBartop').append(
				aim('div').id('btnbar')
			),
			aim('div').class('row paneltop').append(
				aim('ul').class("col").id("elButtonpanel"),
			)
		)

		createGui();

		console.error("Verkeerslicht", Verkeerslicht[0].properties.Stand.setValue);
	})




})();
