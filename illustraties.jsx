// illustraties.jsx — Simpele platte vector-poppetjes per categorie.
// Stijl: dikke zwarte omtreklijn, vlakke vulkleuren uit het palet,
// geometrische basisvormen. Bedoeld als hero-illustratie bij het idee.
// Exports naar window: Poppetje.
//
// Gebruik:
//   <Poppetje categorie="creatief" size={220} />

(function () {
  const PALETTE = {
    rood: "#F4521E",
    geel: "#F9D616",
    blauw: "#1FA6E0",
    groen: "#F98FC0",
    paars: "#F98FC0",
    inkt: "#141414",
    huid: "#FBEFD8",
    cream: "#F5F0E2",
  };

  const stroke = { stroke: PALETTE.inkt, strokeWidth: 6, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  const filled = (fill) => ({ fill, ...stroke });

  // ── Bouwstenen ─────────────────────────────────
  // Hoofd op (cx, cy)
  function Hoofd({ cx, cy, r = 26, color = PALETTE.huid, smile = true }) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} {...filled(color)} />
        <circle cx={cx - 8} cy={cy - 3} r={2.6} fill={PALETTE.inkt} />
        <circle cx={cx + 8} cy={cy - 3} r={2.6} fill={PALETTE.inkt} />
        {smile && (
          <path d={`M ${cx - 7} ${cy + 7} q 7 6 14 0`} {...stroke} />
        )}
      </g>
    );
  }

  // Romp als ovaal/rechthoek met afgeronde hoeken
  function Romp({ x, y, w, h, color }) {
    return <rect x={x} y={y} width={w} height={h} rx={w / 2.4} ry={w / 2.4} {...filled(color)} />;
  }

  // ── Per categorie ─────────────────────────────
  function Creatief() {
    // Poppetje met kwast + verfklodder
    return (
      <svg viewBox="0 0 240 240" width="100%" height="100%">
        {/* achtergrondvorm */}
        <circle cx={120} cy={130} r={92} fill={PALETTE.geel} />
        {/* verfklodder achter */}
        <path d="M 38 178 q 22 -12 44 -2 q 26 -28 60 -10 q 14 -22 42 -8 q 16 16 4 36 z" fill={PALETTE.rood} stroke={PALETTE.inkt} strokeWidth={5} strokeLinejoin="round" />
        {/* benen */}
        <path d="M 102 196 L 96 222" {...stroke} />
        <path d="M 132 196 L 138 222" {...stroke} />
        {/* schoenen */}
        <rect x={84} y={218} width={22} height={8} rx={4} {...filled(PALETTE.inkt)} />
        <rect x={130} y={218} width={22} height={8} rx={4} {...filled(PALETTE.inkt)} />
        {/* romp */}
        <Romp x={92} y={130} w={56} h={70} color={PALETTE.blauw} />
        {/* arm met kwast omhoog */}
        <path d="M 146 150 L 178 116" {...stroke} />
        {/* kwast steel */}
        <rect x={170} y={88} width={10} height={28} rx={2} transform="rotate(20 175 102)" {...filled(PALETTE.geel)} />
        {/* kwast haren */}
        <path d="M 168 78 q 10 -10 24 -2 l -8 16 z" {...filled(PALETTE.rood)} />
        {/* verf-druppel */}
        <circle cx={196} cy={62} r={6} {...filled(PALETTE.rood)} />
        {/* andere arm */}
        <path d="M 94 152 L 70 168" {...stroke} />
        {/* hoofd */}
        <Hoofd cx={120} cy={102} r={28} color={PALETTE.huid} />
        {/* baret */}
        <path d="M 96 86 q 24 -28 52 -6 q -8 8 -28 8 q -14 0 -24 -2 z" {...filled(PALETTE.rood)} />
        <circle cx={146} cy={74} r={5} {...filled(PALETTE.rood)} />
      </svg>
    );
  }

  function Beweeg() {
    // Poppetje rent achter een bal aan
    return (
      <svg viewBox="0 0 240 240" width="100%" height="100%">
        <circle cx={120} cy={130} r={92} fill={PALETTE.groen} />
        {/* gras streepjes */}
        <path d="M 30 210 l 6 -10 M 50 214 l 6 -12 M 200 212 l 6 -12 M 180 216 l 6 -10" {...stroke} />
        {/* bal */}
        <circle cx={186} cy={186} r={20} {...filled(PALETTE.geel)} />
        <path d="M 174 180 l 12 -6 l 12 6 l -6 12 l -12 0 z" {...filled(PALETTE.inkt)} />
        {/* benen rennend */}
        <path d="M 110 188 L 90 218" {...stroke} />
        <path d="M 134 188 L 152 210" {...stroke} />
        <rect x={78} y={214} width={22} height={9} rx={4} {...filled(PALETTE.inkt)} />
        <rect x={146} y={206} width={22} height={9} rx={4} transform="rotate(20 157 210)" {...filled(PALETTE.inkt)} />
        {/* romp leunt naar voren */}
        <Romp x={94} y={124} w={56} h={70} color={PALETTE.rood} />
        {/* armen */}
        <path d="M 96 142 L 68 122" {...stroke} />
        <path d="M 148 142 L 174 168" {...stroke} />
        {/* hoofd */}
        <Hoofd cx={128} cy={94} r={26} color={PALETTE.huid} />
        {/* haar */}
        <path d="M 104 84 q 24 -26 50 -8 q -8 4 -24 4 q -12 0 -26 4 z" {...filled(PALETTE.inkt)} />
        {/* zweetdruppels */}
        <circle cx={86} cy={70} r={4} {...filled(PALETTE.blauw)} />
        <circle cx={74} cy={86} r={3} {...filled(PALETTE.blauw)} />
      </svg>
    );
  }

  function Denk() {
    // Poppetje met boek + gloeilamp gedachte
    return (
      <svg viewBox="0 0 240 240" width="100%" height="100%">
        <circle cx={120} cy={130} r={92} fill={PALETTE.blauw} />
        {/* gloeilamp */}
        <circle cx={186} cy={64} r={18} {...filled(PALETTE.geel)} />
        <rect x={180} y={78} width={12} height={6} {...filled(PALETTE.inkt)} />
        <path d="M 178 50 l -6 -6 M 198 50 l 6 -6 M 186 38 l 0 -8" {...stroke} />
        {/* gedachte-bubbeltjes */}
        <circle cx={166} cy={86} r={5} {...filled(PALETTE.cream)} />
        <circle cx={156} cy={100} r={3} {...filled(PALETTE.cream)} />
        {/* benen gekruist */}
        <path d="M 102 196 Q 100 214 130 218" {...stroke} />
        <path d="M 138 196 Q 144 212 110 220" {...stroke} />
        {/* romp */}
        <Romp x={92} y={132} w={56} h={68} color={PALETTE.rood} />
        {/* boek in handen */}
        <path d="M 80 160 L 160 160 L 160 184 L 80 184 Z" {...filled(PALETTE.geel)} />
        <path d="M 120 160 L 120 184" {...stroke} />
        {/* hoofd kijkt omlaag */}
        <Hoofd cx={120} cy={102} r={26} color={PALETTE.huid} smile={false} />
        {/* mondje serieus */}
        <path d="M 113 113 q 7 3 14 0" {...stroke} />
        {/* haar */}
        <path d="M 96 88 q 24 -28 52 -4 q -10 -2 -28 0 q -12 0 -24 4 z" {...filled(PALETTE.inkt)} />
      </svg>
    );
  }

  function Ontdek() {
    // Poppetje met vergrootglas + vogel
    return (
      <svg viewBox="0 0 240 240" width="100%" height="100%">
        <circle cx={120} cy={130} r={92} fill={PALETTE.groen} />
        {/* vogel rechts boven */}
        <circle cx={196} cy={70} r={14} {...filled(PALETTE.rood)} />
        <path d="M 184 64 q -8 -4 -12 2 q 6 4 12 6" {...filled(PALETTE.rood)} />
        <circle cx={200} cy={66} r={2} fill={PALETTE.inkt} />
        <path d="M 208 70 l 8 -2" {...stroke} />
        {/* pootjes */}
        <path d="M 192 84 l 0 6 M 200 84 l 0 6" {...stroke} />
        {/* benen */}
        <path d="M 102 196 L 96 222" {...stroke} />
        <path d="M 132 196 L 138 222" {...stroke} />
        <rect x={84} y={218} width={22} height={8} rx={4} {...filled(PALETTE.inkt)} />
        <rect x={130} y={218} width={22} height={8} rx={4} {...filled(PALETTE.inkt)} />
        {/* romp */}
        <Romp x={92} y={130} w={56} h={70} color={PALETTE.geel} />
        {/* arm naar voren met vergrootglas */}
        <path d="M 144 150 L 176 154" {...stroke} />
        <circle cx={194} cy={152} r={20} {...filled(PALETTE.cream)} />
        <path d="M 209 167 L 222 182" {...stroke} strokeWidth={9} />
        {/* andere arm */}
        <path d="M 96 150 L 76 168" {...stroke} />
        {/* hoofd */}
        <Hoofd cx={120} cy={102} r={28} color={PALETTE.huid} />
        {/* hoedje ontdekker */}
        <path d="M 90 86 L 150 86 L 142 76 L 98 76 Z" {...filled(PALETTE.rood)} />
        <path d="M 88 86 L 152 86" {...stroke} />
      </svg>
    );
  }

  function Muziek() {
    // Poppetje met trommel
    return (
      <svg viewBox="0 0 240 240" width="100%" height="100%">
        <circle cx={120} cy={130} r={92} fill={PALETTE.rood} />
        {/* muzieknoten */}
        <path d="M 180 70 l 0 -26 l 16 -4 l 0 26" {...stroke} />
        <circle cx={180} cy={70} r={5} {...filled(PALETTE.inkt)} />
        <circle cx={196} cy={66} r={5} {...filled(PALETTE.inkt)} />
        <circle cx={60} cy={86} r={5} {...filled(PALETTE.inkt)} />
        <path d="M 60 86 l 0 -22" {...stroke} />
        {/* benen */}
        <path d="M 106 186 L 100 218" {...stroke} />
        <path d="M 134 186 L 140 218" {...stroke} />
        <rect x={88} y={214} width={22} height={9} rx={4} {...filled(PALETTE.inkt)} />
        <rect x={132} y={214} width={22} height={9} rx={4} {...filled(PALETTE.inkt)} />
        {/* trommel */}
        <ellipse cx={120} cy={180} rx={56} ry={10} {...filled(PALETTE.geel)} />
        <rect x={64} y={160} width={112} height={22} {...filled(PALETTE.geel)} />
        <ellipse cx={120} cy={160} rx={56} ry={10} {...filled(PALETTE.cream)} />
        <path d="M 70 160 l 12 22 M 92 160 l 12 22 M 122 160 l 12 22 M 152 160 l 12 22" {...stroke} strokeWidth={4} />
        {/* armen + stokjes */}
        <path d="M 92 140 L 76 152" {...stroke} />
        <path d="M 148 140 L 164 152" {...stroke} />
        <rect x={62} y={140} width={6} height={26} rx={2} transform="rotate(-25 65 153)" {...filled(PALETTE.inkt)} />
        <rect x={172} y={140} width={6} height={26} rx={2} transform="rotate(25 175 153)" {...filled(PALETTE.inkt)} />
        {/* romp */}
        <Romp x={92} y={122} w={56} h={50} color={PALETTE.blauw} />
        {/* hoofd */}
        <Hoofd cx={120} cy={92} r={26} color={PALETTE.huid} />
        {/* haar */}
        <path d="M 96 80 q 24 -24 50 -4 q -10 -2 -26 0 q -12 0 -24 4 z" {...filled(PALETTE.inkt)} />
      </svg>
    );
  }

  function Koken() {
    // Poppetje met pollepel + pan
    return (
      <svg viewBox="0 0 240 240" width="100%" height="100%">
        <circle cx={120} cy={130} r={92} fill={PALETTE.geel} />
        {/* stoom */}
        <path d="M 88 60 q 8 8 0 18 q -8 8 0 18" {...stroke} />
        <path d="M 116 50 q 8 8 0 18 q -8 8 0 18" {...stroke} />
        <path d="M 144 60 q 8 8 0 18 q -8 8 0 18" {...stroke} />
        {/* benen */}
        <path d="M 102 196 L 96 222" {...stroke} />
        <path d="M 132 196 L 138 222" {...stroke} />
        <rect x={84} y={218} width={22} height={8} rx={4} {...filled(PALETTE.inkt)} />
        <rect x={130} y={218} width={22} height={8} rx={4} {...filled(PALETTE.inkt)} />
        {/* pan */}
        <rect x={54} y={148} width={88} height={28} rx={4} {...filled(PALETTE.inkt)} />
        <rect x={140} y={156} width={28} height={6} {...filled(PALETTE.inkt)} />
        <ellipse cx={98} cy={150} rx={42} ry={6} {...filled(PALETTE.rood)} />
        {/* romp */}
        <Romp x={92} y={132} w={56} h={68} color={PALETTE.cream} />
        {/* schort knoop */}
        <circle cx={120} cy={148} r={4} {...filled(PALETTE.rood)} />
        {/* armen */}
        <path d="M 92 150 L 70 160" {...stroke} />
        <path d="M 148 150 L 170 124" {...stroke} />
        {/* pollepel */}
        <rect x={166} y={88} width={8} height={36} rx={2} transform="rotate(20 170 106)" {...filled(PALETTE.inkt)} />
        <ellipse cx={186} cy={84} rx={12} ry={10} {...filled(PALETTE.rood)} />
        {/* hoofd */}
        <Hoofd cx={120} cy={104} r={26} color={PALETTE.huid} />
        {/* koksmuts */}
        <path d="M 92 86 q 6 -26 28 -22 q 22 -4 28 22 q -6 4 -28 4 q -22 0 -28 -4 z" {...filled(PALETTE.cream)} />
        <path d="M 92 86 L 148 86" {...stroke} />
      </svg>
    );
  }

  function Samen() {
    // Twee poppetjes naast elkaar, hand-in-hand
    return (
      <svg viewBox="0 0 240 240" width="100%" height="100%">
        <circle cx={120} cy={130} r={92} fill={PALETTE.paars} />
        {/* hartje boven */}
        <path d="M 120 56 q -10 -14 -20 -4 q -10 14 20 28 q 30 -14 20 -28 q -10 -10 -20 4 z" {...filled(PALETTE.rood)} />
        {/* linker poppetje */}
        <path d="M 70 196 L 64 222" {...stroke} />
        <path d="M 92 196 L 96 222" {...stroke} />
        <rect x={56} y={218} width={20} height={8} rx={4} {...filled(PALETTE.inkt)} />
        <rect x={88} y={218} width={20} height={8} rx={4} {...filled(PALETTE.inkt)} />
        <Romp x={64} y={140} w={40} h={60} color={PALETTE.rood} />
        <path d="M 66 158 L 50 174" {...stroke} />
        <Hoofd cx={84} cy={118} r={22} color={PALETTE.huid} />
        <path d="M 64 106 q 20 -22 42 -2 q -10 -2 -22 0 q -10 0 -20 2 z" {...filled(PALETTE.inkt)} />
        {/* rechter poppetje */}
        <path d="M 148 196 L 144 222" {...stroke} />
        <path d="M 170 196 L 176 222" {...stroke} />
        <rect x={132} y={218} width={20} height={8} rx={4} {...filled(PALETTE.inkt)} />
        <rect x={166} y={218} width={20} height={8} rx={4} {...filled(PALETTE.inkt)} />
        <Romp x={136} y={140} w={40} h={60} color={PALETTE.blauw} />
        <path d="M 174 158 L 190 174" {...stroke} />
        <Hoofd cx={156} cy={118} r={22} color={PALETTE.huid} />
        <path d="M 136 106 q 20 -22 42 -2 q -10 -2 -22 0 q -10 0 -20 2 z" {...filled(PALETTE.geel)} />
        {/* handen vast */}
        <path d="M 104 162 Q 120 156 136 162" {...stroke} />
      </svg>
    );
  }

  // ── Schil rondom alle categorieën ──────────────
  function Poppetje({ categorie, size = 220, wobble = true }) {
    const map = {
      creatief: Creatief,
      beweeg: Beweeg,
      denk: Denk,
      ontdek: Ontdek,
      muziek: Muziek,
      koken: Koken,
      samen: Samen,
    };
    const C = map[categorie] || Creatief;
    const style = {
      width: size,
      height: size,
      display: "block",
      animation: wobble ? "verveelWobble 3s ease-in-out infinite" : "none",
    };
    return (
      <div style={style}>
        <C />
      </div>
    );
  }

  window.Poppetje = Poppetje;
  window.PALETTE = PALETTE;
})();
