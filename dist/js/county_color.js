document.addEventListener('DOMContentLoaded', function() {
    const SettingData = {
        county_colors : {
            Lincoln: "#FFFF00", // yellow
            Langlade: "#0000FF", // blue
            Taylor: "#000000", // black
            Price: "#008000" // green
        }
    };
    const countyElements = document.querySelectorAll('.county');
    const countyColors = SettingData.county_colors;
    countyElements.forEach(county => {
        const countyName = county.textContent.trim();
        const headerElement = county.closest('.card-link').querySelector('.card-header');
        const color = countyColors[countyName];

        if (color) {
            headerElement.style.backgroundColor = color;

            // Check lightness of color and set text color
            const hsl = rgbToHsl(hexToRgb(color));
            const lightness = hsl[2] * 100;
            if (lightness <= 50) {
                headerElement.style.color = '#fff';
            }
            else {
                headerElement.style.color = '#000';
            }
        }
        if (countyColors.hasOwnProperty(countyName)) {
        headerElement.style.backgroundColor = countyColors[countyName];
        }
    });
});

// Helper function to convert a hex color to an RGB array
function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

// Helper function to convert an RGB array to an HSL array
function rgbToHsl(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;

    let h, s, l;
    if (d === 0) {
        h = 0;
    } else if (max === r) {
        h = ((g - b) / d) % 6;
    } else if (max === g) {
        h = (b - r) / d + 2;
    } else {
        h = (r - g) / d + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) {
        h += 360;
    }

    l = (max + min) / 2;
    s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l];
}