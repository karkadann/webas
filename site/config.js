// Réglages de la page webas (screen-stream). Rien d'obligatoire.
//   addrs : adresses où chercher l'app, essayées dans l'ordre (la dernière qui a marché d'abord).
//           - 3.3.3.1 : l'adresse de service du hotspot AVEC la clé platform, ou le VPN SANS (défaut) ;
//           - webas.local : SANS la clé et mDNS activé (option CONF.), résolu par mDNS vers l'IP réelle
//             du hotspot. Chromium seulement (Firefox ne résout pas .local). ?a=webas.local pour forcer.
//   port  : port WebTransport de l'app (UDP, QUIC).
window.WEBSTREAM_CONFIG = {
  addrs: ['3.3.3.1', 'webas.local'],
  port: 3333,
};
