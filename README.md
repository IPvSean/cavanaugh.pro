# cavanaugh.pro

Personal website for Sean Cavanaugh: AI, Automation, Cloud.

Built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/).

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

Then visit `http://localhost:4000`.

## Adding Blog Posts

Create a new markdown file in `_posts/` with the naming convention:

```
YYYY-MM-DD-title-slug.md
```

Front matter:

```yaml
---
title: "Your Post Title"
date: YYYY-MM-DD
tags: [tag1, tag2]
subtitle: "Optional subtitle"
---
```

## Structure

```
_config.yml          # Site configuration
_data/               # YAML data files (projects, talks, highlights, etc.)
_includes/           # Reusable HTML partials (header, footer)
_layouts/            # Page templates (default, post, page, project)
_posts/              # Blog posts (markdown)
assets/css/          # Stylesheets
assets/js/           # JavaScript
assets/images/       # Images
pages/               # Content pages (about, contact, projects, etc.)
```

## Customization

- Edit `_data/*.yml` files to update projects, talks, highlights, and navigation
- Edit `_config.yml` to update social links and site metadata
- Add images to `assets/images/` and reference them in data files
