import fs from "fs";
// @ts-expect-error pdf-parse untyped internal path
import pdf from "pdf-parse/lib/pdf-parse.js";

export async function readPdf(path: string) {
  const buffer = fs.readFileSync(path);
  const resumeData = await pdf(buffer);
  return resumeData.text;
}