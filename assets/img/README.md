# Images

**All site images live in `assets/img/`. There is nowhere else to put them.**

```
assets/img/
├── <name>.jpg          web-ready images referenced by the HTML
├── logo-*.png          logo variants + favicons
└── originals/          full-resolution camera/source files (never referenced by HTML)
```

## Adding a new photo

1. Drop the original in `assets/img/originals/`.
2. Make a web copy in `assets/img/`, sized for its slot:

```bash
# card / showcase thumb (16:10)
magick originals/NEW.jpeg -auto-orient -resize '1400x>' \
  -gravity center -crop 1400x875+0+0 +repage -strip -quality 84 my-photo.jpg

# gallery tile (portrait 3:4, cropping handled by CSS)
magick originals/NEW.jpeg -auto-orient -resize '1400x1400>' -strip -quality 84 my-photo.jpg
```

3. Reference it as `assets/img/my-photo.jpg`.

Keep web copies under ~300 KB. Always run `-auto-orient` — phone photos carry
rotation in EXIF, and stripping metadata without it turns them sideways.
