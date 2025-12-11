// quick-check2.js
import fs from "fs/promises";
import path from "path";

const p = path.resolve("public/temp/example.jpg"); // the file you just copied
(async () => {
  try {
    await fs.access(p);
    console.log("FILE OK:", p);
  } catch (e) {
    console.error("FILE MISSING/NO PERM:", e && (e.message || e));
  }
})();
