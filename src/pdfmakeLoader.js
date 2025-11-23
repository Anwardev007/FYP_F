// ✅ Universal pdfmake loader that always works
import pdfMake from "pdfmake/build/pdfmake";

// Load vfs_fonts dynamically (works even if bundler strips static imports)
try {
    const pdfFonts = await import("pdfmake/build/vfs_fonts");
    pdfMake.vfs = pdfFonts?.pdfMake?.vfs || pdfFonts?.vfs || {};
} catch (err) {
    console.warn("⚠️ Local fonts failed — loading Roboto from CDN");
    // Load from CDN fallback if local fonts missing
    const res = await fetch("https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js");
    const text = await res.text();
    const match = text.match(/pdfMake\.vfs\s*=\s*(\{[\s\S]*?\});/);
    if (match) {
        // eslint-disable-next-line no-eval
        pdfMake.vfs = eval("(" + match[1] + ")");
    }
}

// ✅ Register Roboto mapping (required for bold/italic)
pdfMake.fonts = {
    Roboto: {
        normal: "Roboto-Regular.ttf",
        bold: "Roboto-Medium.ttf",
        italics: "Roboto-Italic.ttf",
        bolditalics: "Roboto-Italic.ttf",
    },
};

export default pdfMake;
