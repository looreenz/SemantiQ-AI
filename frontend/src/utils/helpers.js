// Extracts the file extension from a filename string
export function getFileExtension(filename) {
  return filename.split(".").pop(); // Returns text after the last "."
}

// Extracts a more user-friendly file extension from a MIME type
export function getFileExtensionFromMime(mime) {
  let ext = mime.split("/").pop(); // Extracts subtype from "type/subtype"
  if (ext === "plain") ext = "txt"; // Normalize "text/plain" to "txt"
  return ext;
}
