// Logo "levi" de Levi (de su archivo levi-logo-claro.svg): las letras l, e, v y la i como una píldora azul con un punto verde.
// Las letras toman el color del texto (currentColor), así se ven blancas sobre fondo oscuro y cambian de color al pasar el ratón;
// la píldora y el punto mantienen sus colores.
const letters =
  'M36 0V-700H198V0Z M491 14Q416 14 365.5 -7.5Q315 -29 284.0 -66.5Q253 -104 239.5 -152.0Q226 -200 226 -253Q226 -310 240.5 -362.0Q255 -414 285.5 -454.5Q316 -495 364.5 -518.5Q413 -542 481 -542Q549 -542 597.5 -518.5Q646 -495 675.0 -453.0Q704 -411 712.5 -356.0Q721 -301 710 -237L327 -231V-319L586 -324L565 -273Q571 -319 563.5 -350.5Q556 -382 536.0 -398.5Q516 -415 481 -415Q444 -415 422.0 -396.0Q400 -377 391.0 -342.5Q382 -308 382 -261Q382 -180 409.0 -143.0Q436 -106 492 -106Q516 -106 532.0 -112.0Q548 -118 558.0 -129.5Q568 -141 572.0 -157.5Q576 -174 575 -195L723 -187Q726 -154 716.5 -119.0Q707 -84 681.0 -54.0Q655 -24 608.5 -5.0Q562 14 491 14Z M850 0 691 -528H863L954 -134H958L1053 -528H1215L1056 0Z'

export default function Logo({ className = '' }) {
  return (
    <svg className={className} viewBox="-4 -780 1582 834" aria-hidden="true" focusable="false">
      <path fill="currentColor" d={letters} />
      <rect x="1238" y="-740" width="300" height="740" rx="150" fill="#2302FF" />
      <circle cx="1388" cy="-590" r="100" fill="#AFFE00" />
    </svg>
  )
}
