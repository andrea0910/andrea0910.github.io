# andrea0910.github.io

Personal portfolio of Andrea Nam.

## How to deploy

1. Create a new GitHub repo named exactly: `andrea0910.github.io`
2. Upload `index.html` to the root of that repo
3. Go to repo Settings → Pages → Source: "Deploy from branch" → branch: main → folder: / (root)
4. Your site will be live at https://andrea0910.github.io within ~60 seconds

## To connect your custom domain (andreanam.com) later

1. Add a file named `CNAME` to the repo root containing just:
   andreanam.com
2. Go to your domain registrar (wherever andreanam.com is registered)
3. Add a CNAME DNS record: www → andrea0910.github.io
4. Add four A records pointing to GitHub Pages IPs:
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
5. Back in GitHub repo Settings → Pages → Custom domain: andreanam.com

## Adding photos

Drop images into the `images/` folder in your repo with these filenames:

| File                      | Where it appears              |
|---------------------------|-------------------------------|
| images/home2.jpg          | Home section, frame 1         |
| images/photo-2.jpg        | Home section, frame 2         |
| images/about-portrait.jpg | About section, left frame     |
| images/about-candid.jpg   | About section, right frame    |
| images/personal-1.jpg     | Personal gallery, tall frame  |
| images/personal-2.jpg     | Personal gallery, slot 2      |
| images/personal-3.jpg     | Personal gallery, slot 3      |
| images/personal-4.jpg     | Personal gallery, slot 4      |
| images/personal-5.jpg     | Personal gallery, slot 5      |

Placeholders show until images are added — nothing breaks.

## Adding essays

Find the `essay-list` div in index.html. Replace the placeholder with:

```html
<a href="YOUR_LINK" target="_blank" class="essay-item reveal">
  <span class="essay-num">01</span>
  <div class="essay-body">
    <div class="essay-title">Your Essay Title</div>
    <div class="essay-summary">One sentence that earns the click.</div>
  </div>
  <span class="essay-arrow">→</span>
</a>
```

Remove the "Essays coming soon" div once you have at least one essay.
