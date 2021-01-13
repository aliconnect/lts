(function() {
  const temp = {};
  temp.verkeerslicht = { schema: 'Verkeerslicht' };
  temp.verkeerslichten = { schema: 'Verkeerslichten', children: [
    temp.verkeerslicht,
    temp.verkeerslicht,
  ] };
  temp.verkeersbuis = { schema: 'Verkeersbuis', children: [
    temp.verkeerslichten,
    temp.verkeerslichten,
    temp.verkeerslichten,
  ] };
  temp.tunnel = { schema: 'Tunnel', children: [
    temp.verkeersbuis,
    temp.verkeersbuis,
  ] };

  Aim.extend({
    data: {
      schema: 'Folder', children: [
        { schema: 'Sample', title: 'Samples' },
        JSON.parse(JSON.stringify(temp.tunnel)),
        { schema: 'Test', title: 'Groep', children: [
          { schema: 'Test', title: 'Een', state: 'run', categories: 'green', endDateTime:'2021-01-13' },
          { schema: 'Test', title: 'Twee', state: 'stop', categories: 'green,red', startDateTime:'2021-01-13' },
          { schema: 'Test', title: 'Drie' },
        ]  },
      ]
    },
  });
})();
