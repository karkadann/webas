# webas

Hosted launcher page (GitHub Pages) for an Android app that serves its own web page on the local network.
The page finds the app, connects to it over WebTransport (certificate pinned by hash, see `certs.js`), then
loads the app's page through that link. Addresses and port: `config.js` (`3.3.3.1` or `webas.local`, UDP 3333).

Published on push to `main`: https://karkadann.github.io/webas/

**Triple tap** (or triple click) anywhere while the page is searching ("No stream"): opens the page served by
the app itself (`local` in `config.js`), without WebTransport. The fallback when the link does not come up
(device clock wrong after a reboot: certificate expired for the browser).

## License

Copyright (C) 2026 karkadann. Free software under the GNU General Public License, version 3 or later, WITHOUT
ANY WARRANTY. See [`LICENSE`](LICENSE).
