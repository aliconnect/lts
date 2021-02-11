function startVerkeersbuis() {
  const win = window.open('about:blank', 'vb1', 'width=600, height=800');
  const doc = win.document;
  doc.open();
  doc.write(`
    <!DOCTYPE HTML>
    <html>
    <head>
    <link  href="../../../../api/src/css/web.css" rel="stylesheet"/>
    <script src="../../../../api/src/js/aim.js"></script>
    <script src="../../../../api/src/js/web.js"></script>
    </head>
    <body>
    <pre id="console"></pre>
    <script src="../../../../v1/lts/lib/verkeersbuis.js"></script>
    </body>
    </html>
  `);
  doc.close();
  win.onload = function (event) {
    console.log('LOADED');
    const body = this.aim(this.document.body);
  }

  // console.log(win.document, win.document.body, aim(win.document.body))
  // aim(win.document.body).append(
  //   aim('div').text('test'),
  // )
  // aim(doc.body).text('JA');
}
