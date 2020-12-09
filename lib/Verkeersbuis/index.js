require('@aliconnect/api');

Verkeersbuis = function() {}
Verkeersbuis.prototype.setVerkeerslichtenHandStandRood = function () {
  console.log('setVerkeerslichtenHandStandRood');
  Verkeerslichten.forEach(Verkeerslichten=>Verkeerslichten.setHandStand('rood'));
};
Verkeersbuis.prototype.setVerkeerslichtenHandStandGroen = function () {
  console.log('setVerkeerslichtenHandStandGroen');
  Verkeerslichten.forEach(Verkeerslichten=>Verkeerslichten.setHandStand('gedoofd'));
};

(function(){
  AIM.extend({
    // operations: {
    //   Verkeersbuis(id) {
    //     const verkeersbuis = AIM.ref[id];
    //     console.log('Verkeersbuis', id);
    //     return {
    //       setVerkeerslichtenHandStandRood() {
    //         console.log('setVerkeerslichtenHandStandRood', id);
    //       }
    //     };
    //     // const verkeerslicht = verkeerslichten.verkeerslicht = verkeerslichten.verkeerslicht || verkeerslichten.Verkeerslicht;
    //     // const standRIO = {
    //     //   gedoofd: {rood: OFF, geel: OFF, groen: OFF},
    //     //   rood: {rood: ON, geel: OFF, groen: OFF},
    //     //   geel: {rood: OFF, geel: ON, groen: OFF},
    //     //   groen: {rood: OFF, geel: OFF, groen: ON},
    //     // }
    //     // verkeerslicht.forEach((verkeerslicht,i) => {
    //     //   verkeerslicht.setStand = (stand) => {
    //     //     const rio = rios[i];
    //     //     if (rio) {
    //     //       rio.setOutput(standRIO[stand]);
    //     //     }
    //     //     verkeerslicht.Stand = stand;
    //     //   }
    //     // });
    //     //
    //     // return {
    //     //   /** @function AIM.operations.Verkeerslichten.setHandStand
    //     //   * @stereotype bediening
    //     //   * @summary SetHandStand
    //     //   * @description 'Stel de gewenste stand van de verkeerslichten in die gebruikt
    //     //   * moet worden als #bedieningswijze = hand. De instellingen worden gezet
    //     //   * op de LFV door het autonome proces *HandhaafInstellingen.'
    //     //   * @bsttiName SetHandStand
    //     //   * @bsttiNr BSTTI#16876
    //     //   * @bsttiPath
    //     //   * - Functies van een Verkeersbuis
    //     //   * - Verkeersgeleiding-functies
    //     //   * - Verkeerslichten
    //     //   * - Bedieningen
    //     //   * @conditie #in_gebruik = ja
    //     //   * @acties
    //     //   * - #hand_stand := stand
    //     //   * @param *required* stand In te stellen handmatige stand
    //     //   */
    //     //   setHandStand(stand) {
    //     //     // console.log('setHandStand');
    //     //     clearTimeout(verkeerslichten.standTimeout);
    //     //     const setStandActions = {
    //     //       rood() {
    //     //         verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('geel'));
    //     //         verkeerslichten.standTimeout = setTimeout(event => {
    //     //           verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('rood'));
    //     //           verkeerslichten.Stand = 'rood';
    //     //         }, 6000);
    //     //       },
    //     //       groen() {
    //     //         verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('groen'));
    //     //         verkeerslichten.Stand = 'groen';
    //     //       },
    //     //       geel_knipperen() {
    //     //         verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('geel'));
    //     //         verkeerslichten.standTimeout = setTimeout(event => {
    //     //           verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('gedoofd'));
    //     //           verkeerslichten.standTimeout = setTimeout(arguments.callee, 1000);
    //     //         }, 1000);
    //     //         verkeerslichten.Stand = 'geel_knipperen';
    //     //       },
    //     //       gedoofd() {
    //     //         verkeerslicht.forEach(verkeerslicht => verkeerslicht.setStand('gedoofd'));
    //     //         verkeerslichten.Stand = 'gedoofd';
    //     //       }
    //     //     };
    //     //     setStandActions[stand]();
    //     //     // console.log('setHandStand2');
    //     //   },
    //     // }
    //   }
    // },
    on:{
      init(){
        // console.msg('Verkeersbuis initialized');
      },
    }
  })
})()
