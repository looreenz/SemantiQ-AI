export function getFileExtension(filename) {
  return filename.split(".").pop(); // Extrae la parte después del punto (.)
}

export function getFileExtensionFromMime(mime) {
  let ext = mime.split("/").pop();
  if(ext === "plain") ext = "txt";
  return ext; // Extrae la parte después del punto (.)
}