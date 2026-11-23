// A Typst plugin that evaluates Dhall and returns JSON. Typst has no file
// system access inside a plugin, so imports are given with the source: a
// JSON object mapping each import path, exactly as written, to its text.
use wasm_minimal_protocol::*;

initiate_protocol!();

#[wasm_func]
pub fn decode(source: &[u8], imports: &[u8]) -> Result<Vec<u8>, String> {
    // Purpose: evaluate one Dhall expression, with its imports inlined, to JSON
    let mut text = String::from_utf8(source.to_vec()).map_err(|e| e.to_string())?;
    let map: serde_json::Map<String, serde_json::Value> =
        serde_json::from_slice(imports).map_err(|e| e.to_string())?;
    for (path, body) in map {
        let body = body.as_str().ok_or("import text must be a string")?;
        text = text.replace(&path, &format!("({})", body));
    }
    let value: serde_json::Value = serde_dhall::from_str(&text).parse().map_err(|e| e.to_string())?;
    serde_json::to_vec(&value).map_err(|e| e.to_string())
}
