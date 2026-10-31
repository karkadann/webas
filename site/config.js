// Page settings. Nothing mandatory.
//   addrs : addresses where to look for the app, tried in order (the last one that worked first).
//           - 3.3.3.1 : the app's service address (default);
//           - webas.local : mDNS enabled in the app, resolved to the real IP of the hotspot. Chromium
//             only (Firefox does not resolve .local).
//   port  : the app's WebTransport port (UDP, QUIC).
//   local : the page served by the app itself, opened by a triple tap (without WebTransport).
window.WEBSTREAM_CONFIG = {
  addrs: ['3.3.3.1', 'webas.local'],
  port: 3333,
  local: 'http://3.3.3.1/',
};
