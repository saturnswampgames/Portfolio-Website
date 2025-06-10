# Portfolio Website

This repository contains the source for a static website. The site uses plain HTML, CSS and JavaScript, with styles authored in SASS.
This new version replaces the old WordPress site with a simpler static design. Any leftover files from the previous version have been removed.

## Building

The CSS files in `CSS/` are generated from the SASS sources. If you modify any SASS file, recompile the styles using `sass`:

```bash
sass SASS/main.sass CSS/main.css
```

## Deploying to GitHub Pages

1. Commit all changes and push the repository to GitHub.
2. In the repository settings on GitHub, enable **GitHub Pages** and select the `main` branch as the source.
3. Your site will be available at `https://<username>.github.io/<repository>/`.

For more details see the [GitHub Pages documentation](https://docs.github.com/en/pages).

