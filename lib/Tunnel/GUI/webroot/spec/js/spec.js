(function() {

  function createBody(data) {
    const item = AIM.getItem(Number(AIM.auth.access.sub));

    console.log('createBody', item);

    document.body.createElement('H1', '', AIM.info.title);
    document.body.createElement('P', '', AIM.info.description);
    // document.body.createElement('P', '', [['A', '', 'tms.yaml', {target:'src', href: 'https://aliconnect.nl/v1/api/tms/config/tms.yaml'}]]);

    document.body.createElement('H1', '', 'Index');
    const indexElement = document.body.createElement('UL');

    let headerIndex = 0;
    function header(level, title) {
      document.body.createElement('A', {name: 'h' + headerIndex});
      document.body.createElement('H' + level, '', title);
      if (level<4) {
        indexElement.createElement('LI', 'h' + level, [
          ['A', '', title, {href: '#h' + headerIndex }],
        ]);
      }
      headerIndex++;
    }

    header(1, 'Source files');
    const tableElement = document.body.createElement('UL', 'properties');
    data.ref.forEach(ref => {
      tableElement.createElement('LI', '', [['A', '', ref, {target:'src', href: ref}]]);
    });

    header(1, 'Schemas');
    for (let [schemaName, schema] of Object.entries(data.components.schemas)) {
      header(2, schemaName);
      header(3, 'Items');
      const schemaItems = AIM.ref.filter(item => item.schema === schema.title);
      const tableElement = document.body.createElement('UL', 'properties');
      schemaItems.forEach(item => {
        var path = [];
        for (var p=item;p;p=p.master) {
          path.unshift(p);
        }
        tableElement.createElement('LI', [
          ['A', 'code', item.$id, { href: '#htest' } ],
          ['SPAN', '', ': ', path.map(item => item.$id).join(' / ') ],
        ]);
      });
      // console.log('schemaItems', schemaItems, schema.title);

      if (schema.gui) {
        header(3, 'GUI object');
        document.body.createElement('P', '', 'Dit object heeft een digital twin configuratie en wordt in het 3D model weergegeven. 3D Voorbeeld volgt.');
        if (schema.gui.global) {
          document.body.createElement('DIV', '', 'Global icon');
          const guiElement = document.body.createElement('DIV', 'gui global').createElement('DIV', 'object').createElement('DIV',schema.title + '()').createElement(schema.gui.global);
        }
        if (schema.gui.global) {
          document.body.createElement('DIV', '', 'Detail icon');
          const guiElement = document.body.createElement('DIV', 'gui detail').createElement('DIV', 'object').createElement('DIV',schema.title + '()').createElement(schema.gui.global);
        }
      }

      if (schema.geo) {
        header(3, 'DigitalTwin');
        document.body.createElement('P', '', 'Dit object heeft een digital twin configuratie en wordt in het 3D model weergegeven. 3D Voorbeeld volgt.');
        document.body.createElement('PRE', 'code', JSON.stringify(schema.geo,null,2));
      }

      const stereotypes = {
        configuratie_element: { title: 'Configuratie' },
        variabele: { title: 'Variabelen' },
        signalering: { title: 'Signaleringen' },
        bediening: { title: 'Bediening' },
        besturing: { title: 'Besturing' },
        autonoom_proces: { title: 'Autonoom proces' },
      };
      [schema.properties, schema.operations].forEach(par => {
        if (!par) return;
        for (let [propertyName, property] of Object.entries(par)) {
          property.propertyName = propertyName.split(/\[| |=/)[0];
          property.stereotype = property.stereotype || 'variabele';
          stereotypes[property.stereotype].items = stereotypes[property.stereotype].items || [];
          stereotypes[property.stereotype].items.push(property);
        }
      });
      for (let [stereotype, type] of Object.entries(stereotypes)) {
        if (type.items) {
          header(3, type.title);
          const tableElement = document.body.createElement('UL', 'properties ' + stereotype);
          type.items.forEach(property => {
            tableElement.createElement('LI', [
              ['A', 'code' , property.propertyName, {href: '#h' + headerIndex } ],
              ['SPAN', '', property.description ? ': ' + property.description.split('.')[0] : ''],
            ]);
            header(4, property.propertyName);
            const keysElement = document.body.createElement('UL', 'properties');
            for (let [key, value] of Object.entries(property)) {
              if (key === 'rules' && Array.isArray(value)) {
                keysElement.createElement('LI',[
                  ['CODE', '', key ],
                  ['UL', value.map(rule => ['LI', '', 'Conditie: <code>' + rule.Conditie + '</code>' +  (rule.Acties ? '<br>Acties: <code>' + rule.Acties.join('</code>; <code>') + '</code>' : '' )]) ]
                ]);
              } else if (key.match(/\(/)) {
                keysElement.createElement('LI', [
                  ['CODE', '', key ],
                  ['PRE', 'code', value ],
                ]);
              } else {
                keysElement.createElement('LI', [
                  ['CODE', '', key ],
                  // [ key.match(/\(/) ? 'code' : '', Array.isArray(value) ? [['UL', value.map(value => ['LI', '', '- ' + value])]] : value ],
                  ['SPAN', '', ': ', Array.isArray(value) ? [['OL', value.map(value => ['LI', '', value])]] : value ],
                ]);
              }

            }
          });
        }
      }
    }
  }

  AIM.extend({
    config: {
      aim: {
        // "headers":{
        //   "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJzaGEyNTYifQ.eyJpc3MiOiJyd3MuYWxpY29ubmVjdC5ubCIsInNjb3BlIjoid2Vic2l0ZS5yZWFkIG5hbWUgZW1haWwiLCJzdWIiOiIyODA0MzQyIiwiYXVkIjoiMzY2NjEzNCIsImV4cCI6MTYwNTM2Mjk3MCwiaWF0IjoxNjA1Mjc2NTcwfQ.UKHp3WPoh5DtXvZBG9D3TNpLeh6v17rD1kfJSRBWqxU"
        // },
        websocket: {
          servers: [{ url: document.location.origin.replace(/http/, 'ws') }]
        },
        servers: [{ url: document.location.origin + '/api' }]
      }
    },
    on: {
      load() {
        // AIM.extend(data);
      },
      init() {
        console.log('DATA', data);
        AIM.datainit(() => createBody(data));
        // createBody(data);
      }
    },
  });
})();
