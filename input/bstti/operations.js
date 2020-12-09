function Hoogtedetector(id) {
  const Hoogtedetector = AIM.ref[id];
  return {

    /**
      * @function Hoogtedetector.SetDisabled
      * Disable de functie hoogtedetector.
Het autonome gedrag van de LFV wordt nu
      *   uitgeschakeld.


      */
    SetDisabled() {
      if (
        .lfv_hd.bestuurbaar === ja &&
        .lfv_hd.hoogte_overschrijding !== detector_disabled
      ) {
        .lfv_hd.SetHoogteOverschrijding(detector_disabled);
        .enabled = nee;
      }
      else if (
        .lfv_hd.bestuurbaar === nee
      ) {
        .enabled = nee;
      }
    },

    /**
      * @function Hoogtedetector.SetEnabled
      * Enable de functie hoogtedetector.
Het autonome gedrag van de LFV wordt nu weer
      *   geactiveerd.


      */
    SetEnabled() {
      if (
        *
      ) {
        .enabled = ja;
      }
    },

    /**
      * @function Hoogtedetector.ResetHoogtedetector
      * Reset de status van de hoogtedetector.


      */
    ResetHoogtedetector() {
      if (
        .lfv_hd.bestuurbaar === ja
      ) {
        .lfv_hd.SetHoogteOverschrijding(nee);
      }
    },

    /**
      * @function Hoogtedetector.SetInGebruik
      * Besturing die voor toepassing in wisselbuizen gebruikt wordt om deze instantie
      *   van hoogtedetector in of uit te schakelen.
Wanneer aangeroepen met het argument
      *   'ja', dan moet de hoogtedetector functioneren als bij een verkeersbuis die geen
      *   wisselbuis is.
Wanneer aangeroepen met de argument 'nee', dan moet deze
      *   hoogtedetector geen hoogtedetecties meer doorgeven, maar moeten overige
      *   detecties en signaleringen normaal blijven functioneren.


      */
    SetInGebruik() {
      if (
        *
      ) {
        .in_gebruik = in_gebruik;
      }
    },

    /**
      * @function Hoogtedetector.*HandhaafInstellingen
      * Dit autonoom proces stelt de LFV in aan de hand van de variabelen #enabled en
      *   #in_gebruik.
Verder draagt dit autonoom proces er zorg voor dat na de overgang
      *   van niet bestuurbaarheid naar bestuurbaarheid het juiste gedrag vertoond
      *   wordt.


      */
    *HandhaafInstellingen() {
      if (
        .lfv_hd.bestuurbaar === ja &&
        (enabled === nee || in_gebruik === nee) &&
        .lfv_hd.hoogte_overschrijding !== detector_disabled
      ) {
        .lfv_hd.SetHoogteOverschrijding(detector_disabled);
      }
      else if (
        .lfv_hd.bestuurbaar === ja &&
        (enabled === ja &&
        .in_gebruik === ja ) &&
        .lfv_hd.hoogte_overschrijding === detector_disabled
      ) {
        .lfv_hd.SetHoogteOverschrijding(nee);
      }
    },
  }
}
function Hoogtedetectie(id) {
  const Hoogtedetectie = AIM.ref[id];
  return {
  }
}