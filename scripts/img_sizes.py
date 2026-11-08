# writes src/data/img-sizes.json: {"/path": [w, h]} for every gallery/highlight/poster image, so pages reserve space for lazy images
import json
from pathlib import Path
from PIL import Image
pub = Path("public"); out = {}
for pat in ("work/gallery/**/*.webp", "work/gallery/**/*.jpg", "work/videos/*.jpg", "work/reports/**/*.png", "work/reports/**/*.webp", "work/whitepapers/*.png", "videos/*.jpg", "blog-heroes/*.png", "images/case-*.webp"):
    for f in pub.glob(pat):
        with Image.open(f) as im: out["/" + f.relative_to(pub).as_posix()] = list(im.size)
Path("src/data/img-sizes.json").write_text(json.dumps(out, indent=0), encoding="utf-8"); print(len(out))
