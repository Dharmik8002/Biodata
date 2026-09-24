const fs = require('fs');
const path = require('path');

const filesToPatch = [
  path.join(__dirname, '..', 'node_modules', 'html2canvas', 'dist', 'html2canvas.esm.js'),
  path.join(__dirname, '..', 'node_modules', 'html2canvas', 'dist', 'html2canvas.js'),
];

const targetPattern1 = /var colorFunction = SUPPORTED_COLOR_FUNCTIONS\[value\.name\];\s*if \(typeof colorFunction === 'undefined'\) \{\s*throw new Error\("Attempting to parse an unsupported color function \\"" \+ value\.name \+ "\\""\);/g;

const replacement1 = `var colorFunction = SUPPORTED_COLOR_FUNCTIONS[value.name];
            if (typeof colorFunction === 'undefined') {
                try {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var colorArgs = value.values.map(function(t) { return t.number !== undefined ? t.number : (t.value !== undefined ? t.value : ''); }).join(' ');
                    var str = value.name + '(' + colorArgs + ')';
                    ctx.fillStyle = str;
                    var res = ctx.fillStyle;
                    if (res && res.startsWith('#') && res.length === 7) {
                        return pack(parseInt(res.slice(1, 3), 16), parseInt(res.slice(3, 5), 16), parseInt(res.slice(5, 7), 16), 1);
                    }
                    if (res && res.startsWith('rgb')) {
                        var m = res.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
                        if (m) return pack(parseInt(m[1]), parseInt(m[2]), parseInt(m[3]), 1);
                    }
                } catch (e) {}
                return pack(31, 41, 55, 1);
            }`;

const targetPattern2 = /pattern = this_1\.ctx\.createPattern\(this_1\.resizeImage\(image, width, height\), 'repeat'\);\s*this_1\.renderRepeat\(path, pattern, x, y\);/g;

const replacement2 = `if (width > 0 && height > 0) {
                                                var resized = this_1.resizeImage(image, width, height);
                                                if (resized && resized.width > 0 && resized.height > 0) {
                                                    pattern = this_1.ctx.createPattern(resized, 'repeat');
                                                    this_1.renderRepeat(path, pattern, x, y);
                                                }
                                            }`;

const targetPattern3 = /CanvasRenderer\.prototype\.renderTextWithLetterSpacing = function \(text, letterSpacing, baseline\) \{\s*var _this = this;\s*if \(letterSpacing === 0\) \{\s*this\.ctx\.fillText\(text\.text, text\.bounds\.left, text\.bounds\.top \+ baseline\);\s*\}\s*else \{\s*var letters = segmentGraphemes\(text\.text\);[\s\S]*?text\.bounds\.left\);\s*\}\s*\};/g;

const replacement3 = `CanvasRenderer.prototype.renderTextWithLetterSpacing = function (text, letterSpacing, baseline) {
        try {
            if (letterSpacing) {
                this.ctx.letterSpacing = letterSpacing + 'px';
            } else {
                this.ctx.letterSpacing = '0px';
            }
        } catch (e) {}
        this.ctx.fillText(text.text, text.bounds.left, text.bounds.top + baseline);
    };`;

const targetPattern4 = /var breakText = function \(value, styles\) \{\s*return styles\.letterSpacing !== 0 \? segmentGraphemes\(value\) : segmentWords\(value, styles\);\s*\};/g;

const replacement4 = `var breakText = function (value, styles) {
    if (/[\\u0900-\\u0D7F]/.test(value)) {
        return segmentWords(value, styles);
    }
    return styles.letterSpacing !== 0 ? segmentGraphemes(value) : segmentWords(value, styles);
};`;

const targetPattern5 = /if \(clientRects\.length > 1\) \{\s*var subSegments = segmentGraphemes\(text\);/g;

const replacement5 = `if (clientRects.length > 1 && !/[\\u0900-\\u0D7F]/.test(text)) {
                        var subSegments = segmentGraphemes(text);`;

filesToPatch.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    if (targetPattern1.test(content)) {
      content = content.replace(targetPattern1, replacement1);
      modified = true;
    }
    if (targetPattern2.test(content)) {
      content = content.replace(targetPattern2, replacement2);
      modified = true;
    }
    if (targetPattern3.test(content)) {
      content = content.replace(targetPattern3, replacement3);
      modified = true;
    }
    if (targetPattern4.test(content)) {
      content = content.replace(targetPattern4, replacement4);
      modified = true;
    }
    if (targetPattern5.test(content)) {
      content = content.replace(targetPattern5, replacement5);
      modified = true;
    }
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[patch-html2canvas] Successfully patched ${filePath}`);
    } else {
      console.log(`[patch-html2canvas] Already patched or patterns already applied in ${filePath}`);
    }
  }
});
