/** On-demand deck font loading. Lora + Inter ship in index.html. */
export const fontOptions = {
  lora: '"Lora", ui-serif, Georgia, serif',
  inter: '"Inter", ui-sans-serif, system-ui, sans-serif',
  roboto: '"Roboto", ui-sans-serif, system-ui, sans-serif',
  playfair: '"Playfair Display", ui-serif, Georgia, serif',
  merriweather: '"Merriweather", ui-serif, Georgia, serif',
  montserrat: '"Montserrat", ui-sans-serif, system-ui, sans-serif',
  poppins: '"Poppins", ui-sans-serif, system-ui, sans-serif',
  "noto-sans": '"Noto Sans", ui-sans-serif, system-ui, sans-serif',
  "source-serif": '"Source Serif 4", ui-serif, Georgia, serif'
};

const fontStylesheetHrefs = {
  roboto: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
  playfair: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
  merriweather: "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap",
  montserrat: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
  poppins: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
  "noto-sans": "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap",
  "source-serif": "https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;500;600;700&display=swap"
};

const loadedFonts = new Set(["lora", "inter"]);

export function ensureFontLoaded(fontKey) {
  const key = fontOptions[fontKey] ? fontKey : "lora";
  if (loadedFonts.has(key) || !fontStylesheetHrefs[key]) {
    return Promise.resolve(key);
  }

  loadedFonts.add(key);
  return new Promise((resolve) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fontStylesheetHrefs[key];
    link.dataset.deckFont = key;
    link.onload = () => resolve(key);
    link.onerror = () => resolve(key);
    document.head.append(link);
  });
}
