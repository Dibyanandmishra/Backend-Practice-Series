// quick-check.js (temporary)
import fs from "fs/promises";
const p = "C:\\full\\path\\to\\the\\file.jpg"; // paste the exact resolved avatar path from logs
(async () => {
  try {
    await fs.access(p);
    console.log("FILE OK:", p);
  } catch (e) {
    console.error("FILE MISSING/NO PERM:", e && (e.message || e));
  }
})();
