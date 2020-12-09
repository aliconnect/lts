
var url = '../LTS 1.2 SP2 Batch 2/R1.2 SP2 B2-1.6 Basisspecificatie TTI RWS Tunnelsysteem.pdf';

// If absolute URL from the remote server is provided, configure the CORS
// header on that server.

function convert() {
  function getPages(url, callback) {
    let pages=[];
    let loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      progress.max = pdf.numPages;
      (function getPage(pageNumber) {
        // console.log(pageNumber);
        pdf.getPage(pageNumber).then(function(page) {
          page.getTextContent({
            normalizeWhitespace: true,
            disableCombineTextItems: false,
          }).then(item => {
            pages.push(...item.items);
            if (pageNumber < pdf.numPages) {
              setTimeout(() => getPage(progress.value = pageNumber+1),0);
            } else {
              callback(pages);
            }
          });
        });
      })(1);
    });
  }
  getPages(url, items => {
    const lines = [];
    let args = {};
    let fonts = {};
    let str = '';
    let prevLeft = 0;
    // let line = '';
    console.log(items);

    function addstr(str) {
      if (str.match(/Basisspecificatie TTI RWS Tunnelsysteem \|/)) return;
      if (str.match(/Pagina.*van/)) return;

      // str = str.trim();
      lines.push(str);
    }

    items.forEach(item => {
      const [p1,p2,p3,p4,left,top] = item.transform;
      if (prevLeft >= left) {
        addstr(str);
        str = '';
      }
      str += item.str;
      prevLeft=left;
    });
    addstr(str);
    let chapter = [0];
    let inhoud = true;
    let index = 0;
    let level = 0;
    let doc = [];
    let doclevel = [];
    let docitem = doc[index] = doclevel[level] = [];
    let match;
    let linestr;
    function updateDocitem() {
      if (docitem.lines) {
        docitem.lines = docitem.lines
        .map(line => line === ' ' ? '\n' : line)
        .join('')
        .split(/\n/)
        .map(line => line.trim()).filter(Boolean)
        ;
      }
    }
    lines.forEach((line,i) => {
      if (line.match(/Inhoud/)) inhoud = false;
      function setdocitem (newlevel) {
        level = newlevel;
        index = chapter[level] = chapter[level]+1;
        updateDocitem();

        doclevel[level+1] = doclevel[level][index] = docitem = [];
        docitem.title = line;
        chapter[level+1]=0;
      }
      const isBody = !inhoud && !line.match(/\.\.\./);
      if (isBody && (match = line.match(/^([0-9]+)\s+[0-9A-Z]/))) {
        if (match[1] == chapter[0]+1 && !lines[i-1].trim()) {
          setdocitem(0);
          lines[i] = line.replace(/^[0-9\.]+\s/,'# ');
        }
      } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\s+[0-9A-Z]/))) {
        if (match[1] == chapter[0] && match[2] == chapter[1]+1) {
          setdocitem(1);
          lines[i] = line.replace(/^[0-9\.]+\s/,'## ');
        }
      } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\s+[A-Z]/))) {
        if (match[1] == chapter[0] && match[2] == chapter[1] && match[3] == chapter[2]+1) {
          setdocitem(2);
          lines[i] = line.replace(/^[0-9\.]+\s/,'### ');
        }
      } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\s+[A-Z]/))) {
        if (match[1] == chapter[0] && match[2] == chapter[1] && match[3] == chapter[2] && match[4] == chapter[3]+1) {
          setdocitem(3);
          lines[i] = line.replace(/^[0-9\.]+\s/,'#### ');
        }
      } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\s+[A-Z]/))) {
        if (match[1] == chapter[0] && match[2] == chapter[1] && match[3] == chapter[2] && match[4] == chapter[3] && match[5] == chapter[4]+1) {
          setdocitem(4);
          lines[i] = line.replace(/^[0-9\.]+\s/,'##### ');
        }
      } else if (isBody && (match = line.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)\s+[A-Z]/))) {
        if (match[1] == chapter[0] && match[2] == chapter[1] && match[3] == chapter[2] && match[4] == chapter[3] && match[5] == chapter[4] && match[6] == chapter[5]+1) {
          setdocitem(5);
          lines[i] = line.replace(/^[0-9\.]+\s/,'##### ');
        }
      } else {
        docitem.lines = docitem.lines || [];
        docitem.lines.push(line);
      }
    });
    updateDocitem();
    // text = lines.join('\n');
    // AIM.HttpRequest('').query({ext: 'md'}).post(text).then(event => console.log('done'));
    let docdata = {document:[]};
    (makesub = function (doc, docu) {
      doc.forEach(doc => {
        let sub = {};
        const title = doc.title.trim().replace(/^[0-9\.]+\s/,'');
        doc.lines = doc.lines || [];
        // doc.lines = doc.lines.map(line => {
        //   let match = line.match(/^(BSTTI#[0-9]+)\s(.*)/);
        //   if (match) {
        //     var [str,eisNr,eisTekst] = match;
        //     let obj = {};
        //     obj[eisNr] = {
        //       type: title.toLowerCase(),
        //       eisTekst: eisTekst,
        //     };
        //     return obj;
        //   }
        //   return line;
        // });
        let subarray = sub[title] = doc.lines;
        docu.push(sub);
        makesub(doc, subarray);
      })
    })(doc[0], docdata.document);
    AIM.HttpRequest('').query({ext: 'json'}).post(JSON.stringify(docdata,null,2)).then(event => console.log('done'));
    console.log(docdata);
  })
}
function ucfirst(str) {
  return str ? str[0].toUpperCase() + str.substr(1) : '';
}
function setline(property,str) {
  // console.log('setline', property.description, str);
  return property.description = property.description.replace(str, '').split(/\n/).filter(Boolean).join('\n').trim();
}

constant_values = [];

function als_str(als,schemaName) {

  // console.log(als);
  if (als) {
    if (['*','overige situaties'].includes(als[0])) return 'if (1)';
    als = als.map(line => {
      line = line
      .replace(/≥/g,'>=')
      .replace(/≤/g,'<=')
      .replace(/([\w\.]+)\s=\s\((.*?)\)/,function(p0,p1,p2){
        return `[ ${p2.replace(/\|/g,',')} ].includes( ${p1} )`;
      })
      .replace(/(^|\s)(\w+)/gs, function(p0,p1,p2) {
        if (Number(p2)) return p1+p2;
        if (constant_values.includes(p2)) return p1+p2.toUpperCase();
        return p1+`${schemaName}.${p2}`;
      })
      .replace(/\s=\s/gs,' === ')
      .replace(/\s*<>\s*/gs,' != ')
      ;
      return line;
    })
    als = als.join(' &&\n  ');
    return `if (\n  ${als}\n)`;
  }
  return;
  if (['*','overige situaties'].includes(als)) als = 'OVERIG';//return dan.trim();
  als = als ? als.trim() : '';
  als = als.
  replace(/\n/gs,' ').
  replace(/\s\s/gs,' ').
  replace(/\s\s/gs,' ').
  replace(/\s\s/gs,' ').
  replace(/\|\|\s*/g,'||\n').
  // replace(/#/g,'').

  // als = als.replace(/([#\w]+\.[#\w]+)/gs,`${schemaName}.$1`);
  als = als.replace(/(\s)([#\w]+)/gs, function(p0,p1,p2) {
    if (Number(p2)) return p1+p2;
    if (constant_values.includes(p2)) return p1+p2.toUpperCase();
    return p1+`${schemaName}.${p2}`;
  });

  als = als.replace(/&&\s*/g,'&&\n');
  // als = { en: als.split(/&&/g).map(s => s.trim()) };
  // als = als.split(/&&/g).map(s => s.trim());
  return als;
}



function make_operation_code (property,schemaName) {

  function code_line(line) {
    return (' '+line)
    // .trim()
  	.replace(/#(\w+)/gms, "$1")
  	.replace(/(\s)([\w\.\[\]]+)/gs, (str,pre,word) => {
  		if (Number(word)) {
      } else if (constant_values[word]) {
        word = constant_values[word];
      } else if (property.params && property.params.map(par => par.name).includes(word)) {
      } else if (word.match(/^[A-Z0-9_]+$/)) {
      } else {
        // word = schemaName + '.' + word;
        word = 'this.' + word;
      }
  		return ' ' + word;
  	}, ' '.$line)
  	.replace(/\._/gms, ".")
  	.trim()
    ;
  }
  function state_line(line) {
    return code_line(line
      .replace(/(\w+)\[\]\.([\w\s!=<>#]+)/, '$1.every($1=>$1.$2 ) ')
      .replace(/(\w+)\[[i|j]\]\.([\w\s!=<>#]+)/, '$1.some($1=>$1.$2 ) ')
      .replace(/(\w+)\[[i|j]\][\s|=]+([\w\s=]+)/, '$1.some($1=>$1 = $2 ) ')
      .replace(/overige situaties|\*/msg, "1")
      .replace(/\|\|\s*/msg, "||\n  ")
    )

    // .replace(/(\w+)\[[i|j]\][\s|=]+([\w\s=]+)/, '$1.some1($2) ')

    // .replace(/(\w+)\[j\]\.([\w\s!=<>#]+)/', '$1.some($1 => $1$2) ')
    .replace(/([\w\.]+)\s=\s\((.*?)\)/msg, (str,m1,m2) => {
      m2 = m2.replace("|",",");
      return `[ ${m2} ].includes( ${m1} )`;
    })
    .replace(/\s=\s/msg, " === ")
    .replace(/\s!=\s/msg, " !== ")
    .replace(/\s<>\s/msg, " !== ")
    ;
  }
  function action_line(line) {
    return code_line(line
      .replace(/([\w\.]+\(.*?\))/msg, "\n$1\n")
      .replace(/:=/s, "=")
    )+';';
  }
  if (property.init) {
    var code = state_line(property.init);
    try {
      new Function(code);
      property.oninit = code;
    } catch (err) {
      // console.error(err);
    }
    // property.oninit = state_line(property.init);
  }

  if (property.control) {
    var code = property.control.map(rule => {
      let state = rule.state.map(state_line).join(' &&\n  ');
      let operation = '';
      if (rule.operation) operation = rule.operation.map(action_line).join('\n  ');
      if (rule.value) operation = 'return ' + state_line(rule.value)
      .replace(/ && /,' &&\n  ')
      .replace(/\(/,'(\n    ')
      .replace(/\s*\)/,'\n  )\n')
      ;
      return `if (\n  ${state}\n) {\n  ${operation}\n}`;
    }).join('\n');
    try {
      new Function(code);
      property.code = code;
    } catch (err) {
      // console.error(err);
    }
  }
}

function show_js_code(code) {
  AIM('js').bgColor = AIM('js').style.backgroundColor = '';
  if (code) {
    try {
      new Function(code);
      AIM('js').innerText = code;
    } catch (err) {
      const s = String(err).split(/\n/);
      AIM('js').error = AIM('js').innerText = s[0] + "\n" + s[1] + "\n" + code;
      AIM('js').bgColor = AIM('js').style.backgroundColor = 'rgba(255,0,0,0.1)';
    }
  }
}
function sendconfig(params) {
  if (params) {
    this.sendbuf = this.sendbuf || [];
    this.sendbuf.push(params);
    progress.max++;
    return sendconfig();
  }
  if (this.xhr) return;
  if (params = this.sendbuf.shift()) {
    this.xhr = new AIM.HttpRequest('index.php').query({yaml:params.name}).input(params.content).post().then(event => {
      progress.value++;
      if (params.callback) params.callback(event);
      this.xhr = null;
      sendconfig();
    });
  } else {
    progress.value = progress.max = 0;
  }
}
function camelCase(str) {
  return str.split(/!|#| |_|-/g).map(ucfirst).join('');
}
function line_to_params(line) {
  return line.split(',').map(line => {
    const [name,values] = line.split(':');
    if (values) return {
      name: name,
      enum: values.split(' | '),
    }
    return {
      name: name,
    };
  });
}
function get_config(row,save,callback){
  let config, schema;
  function line_to_control (line) {
    line = line
    .replace(/≤/gs,'<=')
    .replace(/≥/gs,'>=')
    .replace(new RegExp(String.fromCharCode(61472), 'gs'),'[ident]')
    .replace(new RegExp(String.fromCharCode(61662), 'gs'),'[tab]')
    .replace(new RegExp(String.fromCharCode(61476), 'gs'),'[some]')
    .replace(new RegExp(String.fromCharCode(61474), 'gs'),'[every]')
    .replace(new RegExp(String.fromCharCode(8704), 'gs'),'[every]')
    .replace(new RegExp(String.fromCharCode(61623), 'gs'),'-')
    ;
    // for (let i=0;i<line.length;i++) {
    //   var ord = line.charCodeAt(i);
    //   if (ord>1000) {
    //     console.log(i,line[i],ord,line);
    //   }
    // }

    function code_line(line) {
      return line
      // .replace(new RegExp(String.fromCharCode(61474), 'gs'),'<>')
      .split(/\n/gs).map(line => line.trim()).join(' ')
      .replace(/\s\s/gs,' ')
      .replace(/#/gs,'')
      .replace(/<>/gs,'!=')
      .replace(/:=/gs,'=')
      .trim()
      ;
    }

    function state_array(line) {
      return code_line(line)
      .split(/&&|\n/)
      .map(line => line.trim())
      ;
    }
    function operation_array(line) {
      return code_line(line)
      .replace(/\s(!=|=|<|>)\s/gs,'$1')
      .replace(/;/gs,'')
      .split(/\n|\s/gs)
      .map(line => line
        .replace(/(=|<|>|!=)/gs,' $1 ')
      )
      ;
    }
    var [state,operation] = line.split(/Waarde: /gs);
    if (operation) {
      return {state: state_array(state), value: operation_array(operation).join(' ') };
    }
    var [state,operation] = line.split(/Acties: /gs);
    if (operation) {
      return {state: state_array(state), operation: operation_array(operation) };
    }
    if (line && line.trim()) {
      return {state: state_array(line) };
    }
  }
  function description_to_property(property, schemaName) {
    if (property.description) {
      var match = property.description.split(/Preset:/gs);
      if (match.length>1) {
        property.description = match[0].trim();
        property.preset = match[1].trim();
      }
      var match = property.description.split(/Camera:/gs);
      if (match.length>1) {
        property.description = match[0].trim();
        property.camera = match[1].trim();
      }
      var match = property.description.split(/Conditie:/gs);
      if (match.length>1) {
        property.description = match.shift();
        property.control = match.map(line_to_control);
      }
      property.description = property.description.replace(/\n/gs,' ').replace(/  /g,' ').trim();
      var match = property.description.match(/(.*?)Init:\s*(.*)/);
      if (match) {
        property.description = match[1].trim();
        property.init = match[2];
      }
      var match = property.description.match(/(.*?)Status:\s*(.*)/);
      if (match) {
        property.description = match[1].trim();
        property.status = match[2];
      }
      var match = property.description.match(/(.*?)Type:\s*(.*)/);
      if (match) {
        property.description = match[1].trim();
        property.type = match[2];
      }

      make_operation_code(property, schemaName);

      if (property.code) {
        // console.log('START CODE');
        try {
          delete (property.err);
          // new Function(property.code);
        } catch (err) {
          property.err = err[0];
        }
      }
    }
  }

  function getProperty(schemaName,type,name,description) {
    row.config = config = config || {components:{schemas:{}}};
    var schemaName = camelCase(schemaName);
    schema = config.components.schemas[schemaName] = config.components.schemas[schemaName] || {};
    var type = schema[type] = schema[type] || {};
    var propertyName = camelCase(name);
    var property = type[propertyName] = type[propertyName] || {
      bstti: row.nr,
      bstti: row.path.join(),
    };
    property.titel = name;
    property.description = description.trim().replace(/^:/,'').trim();
    return [schemaName,propertyName,property,description];
  }
  var line = row.line;
  var js, api, match;
  // ['config','aim','js'].forEach(id => AIM(id).innerText = '');
  if (row.path.includes('Configuratie-elementen')) {
    var match = line.match(/^(_\w+)\s(.*)/);
    if (match) {
      var index = row.path.indexOf('Configuratie-elementen');
      // var name = match[1];
      // var schemaName = getSchemaName(row.path[index-1]);
      // var properties = schema.properties = schema.properties || {};
      // var property = properties[name] = properties[name] || {};
      var [str,name,description] = match;
      var [schemaName, name, property, line] = getProperty(row.path[index-1], 'properties', name, description);
      // property.description = match[2];
    }
  } else if (row.path.includes('Variabelen')) {
    var match = line.match(/^#([\w]+)([\[|\]|]*?):\s*(.*)/ms);
    if (match) {
      var index = row.path.indexOf('Variabelen');
      var [str,name,type,line] = match;
      var [schemaName, name, property, line] = getProperty(row.path[index-1], 'properties', name, line);
      if (type) property.type = type;
      // line = property.description = property.description.replace(/:/,':\n').trim();
      var match = line.match(/^\w+[\s\|\s\w]+$/gm);
      if (match) {
        property.enum = match[0].split('|');
        property.enum = property.enum.map(val => val.trim());
        line = setline(property, match[0]);
        property.enum.forEach(key => {
          constant_values[key] = key.toUpperCase();
          // if (!constant_values.includes(key)) constant_values.push(key);
          var regex = new RegExp(`^(${key})\\s(?=\\w)(.*)`,'m');
          var match = line.match(regex);
          if (match) {
            property.options = property.options || {};
            property.options[key] = {description: ucfirst(match[2])};
            line = setline(property, match[0]);
          }
        });
      }
      description_to_property(property, schemaName);
    }
  } else if (row.path.includes('Bedieningen')) {
    var match = line.match(/^(\w+)\(([\w\s:\|]*)\)\s*(.*)/ms);
    // var match = line.match(/^(\w+)\(([\w\s]*)\)\s*(.*)/ms);
    if (match) {
      var index = row.path.indexOf('Bedieningen');
      var [str,name,par,line] = match;
      var [schemaName, name, property, line] = getProperty(row.path[index-1], 'operations', name, line);
      if (par) property.params = line_to_params(par);
      description_to_property(property, schemaName);
    }
  } else if (row.path.includes('Besturingen')) {
    var match = line.match(/^(\w+)\(([\w\s:\|]*)\)\s*(.*)/ms);
    // console.log('Besturingen', match);
    if (match) {
      var index = row.path.indexOf('Besturingen');
      var [str,name,par,line] = match;
      var [schemaName, name, property, line] = getProperty(row.path[index-1], 'operations', name, line);
      if (par) property.params = line_to_params(par);
      // console.log('Besturingen', match);
      description_to_property(property, schemaName);
    }
  } else if (row.path.includes('Autonome processen')) {
    var match = line.match(/^(\*\w+)\s*(.*)/ms);
    if (match) {
      var index = row.path.indexOf('Autonome processen');
      var [str,name,line] = match;
      var [schemaName, name, property, line] = getProperty(row.path[index-1], 'operations', name, line);
      if (par) property.params = par;
      description_to_property(property, schemaName);
    }
  } else if (row.path.includes('Signaleringen')) {
    var match = line.match(/^!(\w+)\s*(.*)/ms);
    if (match) {
      var index = row.path.indexOf('Signaleringen');
      var [str,name,line] = match;
      var [schemaName, name, property, line] = getProperty(row.path[index-1], 'properties', name, line);
      description_to_property(property, schemaName);
    }
  } else if (row.line) {
    if (match = row.line.match(/(.*?):\s(.*)/s)) {
      var [line,pre,line] = match;
      if (pre.includes('toestandsvariabelen') && line) {
        line.split(/(?=#\w+:)/).forEach(line => {
          if (match = line.match(/(.+):\s*(.*)/)) {
            var [line,name,line] = match;
            var [schemaName, name, property, line] = getProperty(row.path[1], 'properties', name, line);
            if (match = line.match(/(^\w+.*\s\|\s\w+)($|\s(.*))/)) {
              [dummy,property.enum,dummy,property.description] = match;
              property.enum = property.enum.replace(/\s/g,'');
              property.enum = property.enum.split(/\|/);
              if (property.description) {
                if (match = property.description.match(new RegExp(`^(${property.enum.join(':\\s.*|')}:\\s.*)`,'gm'))) {
                  // console.log(match, property.description);
                  property.options = [...match];
                  // [dummy,property.par,dummy,property.description] = match;
                }
              }
            }
            // console.log(name,property);
          }
        });
      }
      if (pre.includes('commando') && line) {
        line = line.trim().split(/\n/).map(line => line.trim()).join('\n');
        var match = line.split(/(?=^\w+\()/ms);
        match.forEach(line => {
          var match = line.match(/(.*?)\((.*?)\)(.*)/s);
          if (!match) return console.error(row.line);
          var [input, name, par, line] = match;
          var [schemaName, name, property, line] = getProperty(row.path[1], 'operations', name, line);
          if (par) {
            property.params = par.split(',').map(par => {
              var [name, values] = par.split(':');
              if (values) {
                return {
                  name: name,
                  type: 'string',
                  enum: values.split(' | '),
                }
              }
              return {
                enum: name.split(' | '),
              }
            })
          }
        });
      }
      if (pre.includes('storingen') && line) {
        line = line.trim().split(/\n/).map(line => line.trim()).join('\n');
        var split = line.match(/(^[A-Z_]+\s.*)/gm);
        if (split && split.length) {
          var [schemaName, name, property, line] = getProperty(row.path[1], 'properties', 'storingen', line);
          schema.properties.storingen = split.map(storing => {
            var [str,name,description] = storing.match(/^([A-Z_]+)\s(.*)/s);
            return {
              name: name,
              description: description,
            }
          });
        }
      }
    }
  }
  // if (save && config) {
  //   // let data = {config: config, bstti: {}};
  //   // data.bstti[row.nr] = row;
  //   // sendconfig({name:'config',content:data, callback: callback});
  // } else

  if (callback) {
    callback();
  }
  if (config) {
    // console.log(config);
    AIM.extend(JSON.parse(JSON.stringify(config)));
  }

  // return config;
}
function pretty_print_eis(line) {
  // line = line.replace(/(\.|:)\s+/,'$1\n');
  return line
  .replace(/\n/gs,'\n  ')
  .replace(/\s\s/gs,' ')
  .replace(/\.\s/gs,'.\n')
  .replace(/\s([A-Z][a-z])/,'\n$1')
  .replace(/(IF|THEN|ELSIF)\s/gs,'\n$1 ')
  .replace(/(\w+\(.*?\))\s(?![A-Z])/gs,'$1\n  ')
  // line = line.replace(/(\.|\):)\s+/g,'$1\n');
  // line = line.replace(/(Conditie:|Waarde:|Acties:|Init:|Type:|Status:)/gs,'\n$1');
  .replace(/(Conditie:|Waarde:|Acties:|Init:|Type:|Status:|Camera:|Preset:)/gs,'\n$1')
  .trim().split(/\n/).map(line => line.trim()).join('\n')
  // line = line.replace(/\n\s/gs,'\n');
  .replace(/&&\s*/gs,'&&\n  ')
  // line = line.replace(/(\s\|\s\w+)\s(?=\w)/g,'$1\n');
  // line = line.replace(/(\w+\(.*\))\s/gs,'$1\n');
  ;
}

function yaml(obj) {
  return obj ? JSON.stringify(obj,null,2)
  .replace(/"/g,'')
  .replace(/,\n/gs,'\n')
  .replace(/ \[\n/gs,'\n')
  .split(/\n/).map(line => {
    if (['{','}','[',']'].includes(line.trim())) return '';
    line = line.substr(2);
    if (line.includes(':')) return line;
    return line.replace(/(\w)/,'- $1');
  }).filter(Boolean).join('\n')
  // .replace(/^.*\]\n/gms,'')
  : '' ;
}

// function start_operations () {
//   console.log('START =====');
//   Hoogtedetector[1] = new Hoogtedetector();
//   Hoogtedetector[1].lfv_hd = {
//     bestuurbaar: NEE,
//   };
//   Hoogtedetector[1].SetDisabled();
//   console.log('Hoogtedetector',Hoogtedetector[1]);
// }


function get_eisen(save) {
  new AIM.HttpRequest('lfv_eisen_src.json').get().then(event => {
    // console.log(event.body);
    for (let [id, row] of Object.entries(event.body)) {
      row.line = pretty_print_eis(row.line);
      let el = spec.createElement('div', [
        ['div', '', row.path.join('/') + '/' + row.nr],
      ]).createElement('pre', 'aco', row.line, {
        row: row,
        config: get_config(row),
        contenteditable: true,
        style: 'display:inline-block;width:100%',
        refresh() {
          AIM('js').innerText='';
          AIM('config').innerText='';
          this.style.backgroundColor = 'rgba(0,0,0,0.1)';
          if (this.row.config) {
            AIM('config').innerText = JSON.stringify(this.row.config,null,2);
            if (this.yaml) AIM('config').innerText = this.yaml;
            this.style.backgroundColor = 'rgba(0,255,255,0.1)';
            AIM('js').bgColor = AIM('js').style.backgroundColor = '';
            for (let [schemaName, schema] of Object.entries(this.row.config.components.schemas)) {
              ['properties','operations'].forEach(name => {
                if (schema[name]) {
                  for (let [operationName, operation] of Object.entries(schema[name])) {
                    if (operation.code) {
                      // let code = make_operation_code(operation, schemaName, operationName);
                      try {
                        this.style.backgroundColor = 'rgba(255,0,0,0.1)';
                        new Function(operation.code);
                        this.style.backgroundColor = 'rgba(0,255,0,0.1)';
                        AIM('js').innerText = operation.code;
                        if (AIM.components.schemas[schemaName][name][operationName].code !== operation.code) {
                          // this.load();
                        }
                      } catch (err) {
                        const s = String(err).split(/\n/);
                        AIM('js').bgColor = AIM('js').style.backgroundColor = 'rgba(255,0,0,0.1)';
                        AIM('js').error = AIM('js').innerText = s[0] + "\n" + s[1] + "\n" + operation.code;
                      }
                      if (AIM('js').bgColor) this.style.backgroundColor = AIM('js').bgColor;
                    }
                  }
                }
              });
            }
          }
        },
        load() {
          return sendconfig({name:'config',content:this.row, callback: event => {
            console.log('RESPONSE',event.body);
            this.yaml = AIM('config').innerText = event.body.config;
          }});
        },
        onfocus(event) {
          this.refresh();
          if (!this.yaml) {
            return this.load();
          }
        },
        onkeyup(event) {
          if (this.row.line != this.innerText) {
            this.modified = true;
            this.row.line = this.innerText;
            get_config(this.row);
            this.refresh();
          }
        },
        onblur(event) {
          if (this.modified) {
            this.row.line = this.innerText;
            this.load();
            this.modified = false;
          }
        },
      }).refresh();
    }
    // constant_values = constant_values.sort();
    // for (let [name, value] of Object.entries(constant_values)) {
    //   window[value] = name;
    // }

    console.log('constant_values',constant_values);
    console.log('config',AIM.components);
    // start_operations();
    // AIM('js').innerText = make_js();
  });
}
// function make_js() {
//   code = '';
//   constant_values = constant_values.map(key => key.replace(/_| |-/g,'_').replace(/\n/g,'').toUpperCase());
//   code += constant_values.map(key => `const ${key} = '${key.toLowerCase()}'`).join('\n');
//
//
//   return code;
// }

// config = {
//   components: {
//     schemas: schemas = {
//
//     }
//   }
// };

function make_eisen() {
  new AIM.HttpRequest('./?make=eisen').get().then(event => {
    get_eisen();
  });
}
AIM.extend({
  on:{
    init() {
      urlLink.href = url;
      new AIM.HttpRequest('config.json').get().then(event => {
        AIM.extend(event.body);
        // console.log(AIM.components);
        get_eisen();
      });
      // return test();
      // return make_eisen();
      // return get_eisen(true);
    }
  }
});

// AIM.setSchema = function(schemaName) {
//   console.log(this.constructor.name);
//   const schema = AIM.components.schemas[this.constructor.name];
//   for (let [propertyName, property] of Object.entries(schema.properties)) {
//
//   }
//   // for (let [schemaName, schema] of Object.entries(AIM.components.schemas)) {
//   //   // console.log(schemaName);
//   //   // window[schemaName] = new Function(`
//   //   //   this.schemaName = ${schemaName};
//   //   //   this.name = 'JA';
//   //   // `);
//   //   window[schemaName] = function () {
//   //     this.name = 'JA';
//   //   }
//   //   if (schema.operations) {
//   //     for (let [operationName, operation] of Object.entries(schema.operations)) {
//   //       console.log(schemaName,operationName);
//   //       if (operation.code) {
//   //         try {
//   //           window[schemaName].prototype[operationName] = new Function(operation.code);
//   //         } catch (err) {
//   //           // console.error(err);
//   //         }
//   //       }
//   //     }
//   //     // let obj = window[schemaName][0] = new window[schemaName]();
//   //     // obj.Test();
//   //   }
//   // }
//
//
// }


//
// Verkeersbuis = function(id) {
//   this.name = 'JA';
// }
// Verkeersbuis.prototype.Test = function () {
//   console.log('TEST',this);
// }
//
//
//
// Verkeersbuis[0] = new Verkeersbuis();
// Verkeersbuis[0].Test();
// Verkeersbuis[1] = new Verkeersbuis();
// Verkeersbuis[1].Test();
//
// schemaName = 'Verkeersbuis';
// eval(`function ${schemaName}() {
//   this.name = 'JA';
// };
// ${schemaName}.prototype.Test = function () {
//   console.log(this.name);
// }
// ${schemaName} = [
//   new ${schemaName}(),
// ];
// ${schemaName}[0].Test();
// `);
