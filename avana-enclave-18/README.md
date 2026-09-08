# Avana Enclave 18 — landing page build

This is a faithful static prototype of the supplied build brief, implemented as a lightweight Next.js 15 / React 19 structure.

## Important content gate
The supplied content marks MahaRERA registration as unverified. The public prototype therefore uses the pre-registration variant and intentionally omits price / ownership-plan tables until the registration number is confirmed.

## Missing supplied media
No `/media` assets were present in the upload. The prototype uses CSS/SVG editorial placeholders marked `Artist's impression` and keeps all media insertion points isolated so real renders can be dropped in later.

## Next steps for production
- Add the supplied / approved media under `public/media`.
- Replace the compliance placeholder with the verified MahaRERA number + QR.
- Restore pricing and plans after RERA verification and legal sign-off.
- Connect the enquiry form to the server action, Turnstile, Resend and the sales lead store.
- Add a real privacy notice, sitemap and OG image.
