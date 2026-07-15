from PIL import Image
import numpy as np
from scipy import ndimage
import sys

def knockout(src, dst, thr=245, big=0.02):
    """Remove white page background: any near-white region touching the border,
    plus large *enclosed* white regions (e.g. a padlock's shackle opening).
    Small enclosed whites (fingerprint sensors, highlights) are preserved."""
    im = Image.open(src).convert("RGBA")
    a = np.asarray(im).astype(int)
    rgb, alpha = a[..., :3], a[..., 3]
    white = (rgb.min(axis=2) >= thr) & (alpha > 0)
    lab, n = ndimage.label(white)
    if n == 0:
        im.save(dst); return 0, 0
    h, w = white.shape
    border = set(lab[0, :]) | set(lab[-1, :]) | set(lab[:, 0]) | set(lab[:, -1])
    border.discard(0)
    sizes = ndimage.sum(white, lab, range(1, n + 1))
    kill = np.zeros(n + 1, bool)
    for i in range(1, n + 1):
        if i in border or sizes[i - 1] > big * h * w:
            kill[i] = True
    mask = kill[lab]
    out = a.copy()
    out[..., 3] = np.where(mask, 0, alpha)
    Image.fromarray(out.astype(np.uint8)).save(dst)
    return int(mask.sum()), n

if __name__ == "__main__":
    px, n = knockout(sys.argv[1], sys.argv[2])
    print(f"  cleared {px}px across {n} regions")
