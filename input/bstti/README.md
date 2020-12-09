hgjhg


Functies van een Verkeersbuis/SOS Verkeersbuis-functies/SOS/Variabelen/bstti#16252
```
Conditie: *
Waarde: IF ( _rijstrook = _lfv_sos.#detectoren_met_storing[i].rijstrook &&   _start ≤ _lfv_sos.#detectoren_met_storing[i].lengtepositie ≤ _eind ) &&      ( _rijstrook = _lfv_sos.#detectoren_met_storing[j].rijstrook &&      _start ≤ _lfv_sos.#detectoren_met_storing[j].lengtepositie ≤ _eind )    && (j <> i) THEN #beschikbaarheid := niet_beschikbaar ELSIF ( _rijstrook = _lfv_sos.#detectoren_met_storing[i].rijstrook &&      _start ≤ _lfv_sos.#detectoren_met_storing[i].lengtepositie ≤ _eind ) THEN #beschikbaarheid := beperkt_beschikbaar ELSE #beschikbaarheid := beschikbaar END_IF
```

```
Conditie: _rijstrook = _lfv_sos.#detectoren_met_storing[i].rijstrook &&
  _start <= _lfv_sos.#detectoren_met_storing[i].lengtepositie <= _eind &&
  _rijstrook = _lfv_sos.#detectoren_met_storing[j].rijstrook &&
  _start <= _lfv_sos.#detectoren_met_storing[j].lengtepositie <= _eind &&
  j <> i
Waarde: niet_beschikbaar
Conditie: _rijstrook = _lfv_sos.#detectoren_met_storing[i].rijstrook &&
  _start <= _lfv_sos.#detectoren_met_storing[i].lengtepositie <= _eind
Waarde: beperkt_beschikbaar
Conditie: *
Waarde: beschikbaar
```
