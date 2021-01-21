(function() {
  const samples = [];

  let f = () => {
    aim().info({
      title: 'Samples',
      description: '.',
      termsOfService: 'https://schiphol.aliconnect.nl/terms/',
      contact: {
        email: 'max.van.kampen@alicon.nl',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
      version: '1.0.0',
    });
  }
  $$()
  .info({
    title: 'Samples',
    description: '.',
    termsOfService: 'https://schiphol.aliconnect.nl/terms/',
    contact: {
      email: 'max.van.kampen@alicon.nl',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
    version: '1.0.0',
  })
  .schemas({
    Sample: {
      hoortBij: 'Samples',
      properties: {
        Address: {
          format: 'address',
        },
        Checkbox: {
          format: 'checkbox',
        },
        createDateTime: {
          description: ``,
          format: 'date',
          readOnly: true,
          defaultValue: new Date().toISOString(),
        },
        lastModifiedDateTime: {
          description: ``,
          format: 'datetime',
          defaultValue: new Date().toISOString(),
        },
        startDateTime: {
          description: ``,
          format: 'datetime',
          defaultValue: new Date().toISOString(),
        },
        endDateTime: {
          description: ``,
          format: 'datetime',
          defaultValue: new Date().toISOString(),
        },
        finishDateTime: {
          description: ``,
          format: 'datetime',
          defaultValue: new Date().toISOString(),
        },
        state: {
          description: ``,
          defaultValue: 'run',
          format: 'radio',
          options: {
            run: {
              color: 'green',
            },
            stop: {
              color: 'red',
            },
          },
        },
        categories: {
          format: 'checkbox',
          defaultValue: 'red,green',
          options: {
            red: {
              title: `Red`,
              color: 'red',
            },
            green: {
              title: `Green`,
              color: 'green',
            },
            blue: {
              title: `Blue`,
              color: 'blue',
            },
          },
        },

        Text: {
          format: 'text',
        },
        Email: {
          format: 'email',
        },
        Password: {
          format: 'password',
        },
        Tel: {
          format: 'tel',
          required: 'true',
        },
        Number: {
          format: 'number',
          min: 5,
          max: 10,
          step: 0.1,
          defaultValue: 3,
        },
        Textarea: {
          format: 'textarea',
          defaultValue: `Dit is een textarea\nmet meerder regels`,
        },
        Html: {
          format: 'html',
        },
        Yaml: {
          format: 'yaml',
        },
        Radio: {
          format: 'radio',
        },
        Signature: {
          title: 'Freehand draw field',
          description: `
          Voor het maken van schetsen of het plaatsen van een handtekening
          `,
          format: 'draw',
        },
        CamPicture: {
          format: 'cam',
        },
        Location: {
          format: 'location',
        },
        Meter: {
          format: 'meter',
          value: 2,
          min: 0,
          max: 10,
        },
        Hidden: {
          format: 'hidden',
        },
        LinkedIn: {
          format: 'linkedin',
        },
        Skype: {
          format: 'skype',
        },
      }
    },
    Folder: {
      properties: {
        state: {
          options: {
            run: {
              color: 'green',
            },
            stop: {
              color: 'red',
            },
          }
        },
      }
    },
    Test: {
      properties: {
        state: {
          options: {
            run: {
              color: 'green',
            },
            stop: {
              color: 'red',
            },
          }
        },
        categories: {
          options: {
            green: {
              color: 'green',
            },
            red: {
              color: 'red',
            },
          }
        },
      }
    }
  })
  .dms('aim', {
    client_id: 'C52ABA40-11FE-4400-90B9-CEE5BDA2C5AA',
    scope: ['name', 'email', 'mobile'],
    servers:[
      {
        authorizationUrl: 'https://login.aliconnect.nl/api/oauth2',
        tokenUrl: 'https://login.aliconnect.nl/api/oauth2/token',
        ws: 'wss://aliconnect.nl:444',
      }
    ],
  })
  .css({
    '.row.top.bar': 'background-color:#1B60DB; color:white;',
  })
  // .css('.row.top.bar', 'background-color:#1B60DB; color:red;')
  .on({
    async ready() {
      const groups = { };
      for (let [schemaName, schema] of $$().schemas.entries()) {
        console.log(schemaName, schema);
        const hoortBij = schema.hoortBij || 'Basic';
        const group = groups[hoortBij] = groups[hoortBij] || { children: [], items: [] };
        group.children.push({ schema: schemaName, title: schemaName });
        group.items.push({ title: schemaName, href: `${schemaName}` });
      }
      console.log(groups);
      $$()
      .navtop()
      .navleft({
        Home: {
          items: {
            TestA: {

            },
            TestB: {

            },
          }
        }
      })
      .tree()
      .list()
      .view()
      .prompt()
      .chat()
      .status(['main','http','select','clipboard','source','target','ws','progress'])
      ;
      Object.entries(groups).forEach(entry => $$().navleft(...entry));
      return;
      let i=0;
      console.log(Aim.components.schemas);
      // Object.entries(Aim.components.schemas).forEach((entry) => { return { schema: entry[0], title: entry[0] }; } )
      Aim.data.children.unshift({
        schema: 'Folder',
        title: 'Schemas',
        children: Object.entries(groups).map((entry) => Object.assign({ schema: 'Folder', title: entry[0], }, entry[1]) ), }
      );
      //
      //               }
      // )
      //       const data =
      //       { schema: 'Folder', children: [
      //         { schema: 'Sample', title: 'Samples' },
      //         { schema: 'Test', },
      //         { schema: 'Test', title: 'Groep', children: [
      //           { schema: 'Test', title: 'Een', state: 'run', categories: 'green', endDateTime:'2021-01-13' },
      //           { schema: 'Test', title: 'Twee', state: 'stop', categories: 'green,red', startDateTime:'2021-01-13' },
      //           { schema: 'Test', title: 'Drie' },
      //         ]  },
      //         { schema: 'Test' },
      //         { schema: 'Test' },
      //         { schema: 'Test' },
      //       ] };
      const item = Aim.Item(Aim.data);
      // item.open();
      console.log(item);
      Aim.tree('treeview', item);
      console.log(item);

      Aim.extend({
        app: {
          nav: {
            items: {
              more: {
                className: 'folder', onclick() {
                  const value = Aim(document.body).attr('tv') ^ 1;
                  Aim(document.body).attr('tv', value);
                  // if (value) {
                  //   // Aim.oncancel(selector.close);
                  //   selector.click();
                  // }
                }
              }
            }
          }
        }
      });

      Aim('navleft').navleft(Aim.app.nav.items);
      Aim.page('colpage');
    },
  })
  ;

  // console.log($$().info.keys());
  // console.log($$().info.values());
  // console.log($$().info.entries());
  // console.log($$().info.has('contact'));
  // console.log($$().info.get('contact'));
  // console.log($$().info.contact);
  // console.log($$().info.forEach(console.log));


})();
