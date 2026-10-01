# Vignesh Nissan, Puducherry

Website for Vignesh Nissan (ECR, Puducherry): Tekton, Magnite and Gravite with variants, prices, colours, photo galleries, EMI calculator, model comparison, enquiry popup and WhatsApp/Instagram links.

Plain HTML, CSS and JavaScript. No build step.

## Run locally
- Open `index.html` in a browser, or
- `node _serve.js` and visit http://localhost:8080 (supports video seeking, no caching).

## Edit content
- `assets/js/data.js`: dealer details (WhatsApp, phones, address, hours), models, variants, prices, offers, testimonials.
- `assets/js/tekton-data.js`, `gravite-data.js`, `magnite-data.js`: colours and photo galleries per model.
- `assets/videos/hero.mp4` and `hero.webm`: hero video. `assets/images/hero-poster.jpg`: poster frame.
- After changing CSS or JS, bump the `?v=` number in `index.html` so visitors' browsers fetch the new files.

## Notes
- Prices are ex-showroom and indicative. Confirm against the official price list.
- Model photos came from nissan.in and CarDekho. Confirm you have the right to publish them before sharing the site publicly.
- Enquiry form sends to WhatsApp. Add a Web3Forms key in `data.js` to also receive email.
