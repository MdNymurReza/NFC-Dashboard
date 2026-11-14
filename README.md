# NFC Profile Dashboard

An animated single-page profile for an NFC visiting card. It's plain HTML, CSS and JS, with no build step.

```
index.html   page structure (no need to edit)
styles.css   look & animations (no need to edit)
app.js       rendering & effects (no need to edit)
data.js      ← ALL the content: name, bio, links, papers, CV…
assets/      photo.jpg, cv.pdf, etc.
```

## Editing content
Open **`data.js`** in any text editor and change the text between the quotes.

- **Add a link:** copy a line inside `links: [ ... ]`, then change `platform`, `label`, `handle` and `url`.
  Icons are built in for facebook, instagram, github, codeforces, linkedin, scholar, researchgate, orcid,
  youtube, x, website, email, whatsapp, telegram, leetcode, kaggle and medium. Any other platform gets a chain icon.
- **Hide a section:** empty its list (`papers: []`) or set a field to `""`.
- **Photo:** put a square image at `assets/photo.jpg`. If it's missing, the page shows the person's initials.
- **CV:** put the PDF at `assets/cv.pdf`, or point `url` at a Google Drive link.
- **Accent colour:** change `theme.gold`.

To preview, double-click `index.html`.

## Deploying (free)
- **GitHub Pages:** push the folder to a repo, then go to Settings → Pages → Deploy from branch `main` / root.
  The site will be at `https://<user>.github.io/<repo>/`.
- **Netlify:** drag the folder onto app.netlify.com/drop.
- **Vercel:** run `npx vercel` in this folder, or import the GitHub repo.

After a deploy, edit `data.js` and push or redeploy. **The URL stays the same, so you never have to rewrite the NFC chip.**

## Writing the NFC chip
1. Install **NFC Tools** (Android/iOS).
2. Go to Write → Add a record → **URL** and paste the deployed link.
3. Hold the card to the phone and write it.
4. Tap the card with a few different phones to test it.
5. Optional: lock the tag (Other → Lock tag) **only once you're sure**, because locking is permanent.
