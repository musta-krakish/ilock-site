import fitz, os, subprocess
from knockout import knockout
PDF = os.environ.get("CATALOG_PDF", "iLock Каталог Замков.pdf")
doc=fitz.open(PDF)
OUT = os.environ.get("OUT_DIR", "final")
os.makedirs("panels",exist_ok=True); os.makedirs(OUT,exist_ok=True)
MAP = {
 "il-8":(3,[52]), "s90":(4,[62]),
 "ddl-603e":(5,[68,69]), "ddl-610":(5,[74,71]),
 "ddl-7300":(6,[86,88]), "ddl-608":(6,[83,84]),
 "303-vp":(7,[91,93]), "alpha":(8,[100,99]), "alpha-vp":(8,[103,102]),
 "702-fvp":(9,[107,109]), "709-fvp":(10,[115,117]), "902-mvp":(11,[125]),
 "s819":(12,[132,133]), "g18":(12,[135,134]), "s819-2max":(13,[143,144]),
 "q28s":(14,[155,153]), "s940-max":(15,[161]), "s959-max":(16,[167]),
 "v6j":(17,[170]), "s31b":(18,[179]), "s604l":(18,[187]),
 "hotel":(19,[196]), "g10s":(19,[198]),
 "cabinet":(20,[201,204]), "d501":(20,[208]),
 "101t":(21,[218]), "101p":(21,[217]),
}
smask_of={}
for p in range(len(doc)):
    for im in doc[p].get_images(full=True): smask_of[im[0]]=im[1]

def dump(xref, path):
    pix=fitz.Pixmap(doc,xref)
    if pix.n-pix.alpha>=4: pix=fitz.Pixmap(fitz.csRGB,pix)
    sm=smask_of.get(xref,0)
    if sm:
        if pix.alpha: pix=fitz.Pixmap(pix,0)
        pix=fitz.Pixmap(pix, fitz.Pixmap(doc,sm))
    pix.save(path)

rep=[]
for slug,(page,xrefs) in MAP.items():
    parts=[]
    for i,x in enumerate(xrefs):
        raw=f"panels/{slug}_{i}_raw.png"; ko=f"panels/{slug}_{i}_ko.png"; cl=f"panels/{slug}_{i}.png"
        dump(x,raw)
        knockout(raw,ko)
        subprocess.run(["magick",ko,"-trim","+repage",cl],check=True)
        parts.append(cl)
    out=f"{OUT}/{slug}.png"
    if len(parts)>1:
        subprocess.run(["magick"]+parts+["-background","none","-gravity","South","+append","-trim","+repage",out],check=True)
    else:
        subprocess.run(["magick",parts[0],"-background","none","-trim","+repage",out],check=True)
    sw,sh=[int(v) for v in subprocess.run(["magick","identify","-format","%wx%h",out],
            capture_output=True,text=True).stdout.split("x")]
    f=780/max(sw,sh)
    cmd=["magick",out,"-background","none","-filter","Lanczos","-resize","780x780"]
    if f>1.15: cmd+=["-unsharp","0x0.7+0.6+0.02"]
    cmd+=["-gravity","center","-extent","900x900",out]
    subprocess.run(cmd,check=True)
    rep.append(f"{slug:12s} p{page:<3d} x{f:.2f}")
print("\n".join(rep)); print("built",len(rep))
