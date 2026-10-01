// Local preview server: static files, HTTP Range support (needed for video), no caching.
const http = require("http"), fs = require("fs"), path = require("path");
const root = __dirname;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".webm": "video/webm", ".md": "text/plain" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
  const f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.stat(f, (e, st) => {
    if (e || !st.isFile()) { res.writeHead(404); return res.end("Not found"); }
    const h = { "Content-Type": types[path.extname(f).toLowerCase()] || "application/octet-stream", "Accept-Ranges": "bytes", "Cache-Control": "no-store" };
    const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range || "");
    if (m) {
      let s = m[1] === "" ? st.size - +m[2] : +m[1], en = m[1] !== "" && m[2] !== "" ? +m[2] : st.size - 1;
      en = Math.min(en, st.size - 1);
      if (s > en || s >= st.size) { res.writeHead(416, { "Content-Range": "bytes */" + st.size }); return res.end(); }
      res.writeHead(206, { ...h, "Content-Range": `bytes ${s}-${en}/${st.size}`, "Content-Length": en - s + 1 });
      fs.createReadStream(f, { start: s, end: en }).pipe(res);
    } else { res.writeHead(200, { ...h, "Content-Length": st.size }); fs.createReadStream(f).pipe(res); }
  });
}).listen(8080, "127.0.0.1", () => console.log("http://localhost:8080"));
