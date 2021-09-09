"use strict";

window.addEventListener("DOMContentLoaded", getColor);

function getColor() {
  const userChoice = document.querySelector("#colorPicker");
  // sets the color boxes to random colors
  let boxes = document.querySelectorAll(".colorBox");
  boxes.forEach(function (box) {
    let h = Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 100);
    let l = Math.floor(Math.random() * 100);
    box.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
  });

  userChoice.addEventListener("input", convertColor);
  console.log(userChoice);
}

function convertColor(event) {
  // gets chosen color value, converts it to rbg and hsl, then it delegates function
  // which calculates new values for 4 colors, depending on selected palette
  const harmonyChoice = document.querySelector("#operator").value;
  let hex = getHex(event);
  let rgb = getRgb(hex);
  let hsl = getHsl(rgb);

  if (harmonyChoice === "analogous") {
    let analogous = getHarmony(hsl);
    displayColor(analogous);
  } else if (harmonyChoice === "monochromatic") {
    let monochromatic = getHarmony(hsl);
    displayColor(monochromatic);
  } else if (harmonyChoice === "triad") {
    let triad = getHarmony(hsl);
    displayColor(triad);
  } else if (harmonyChoice === "complementary") {
    let complementary = getHarmony(hsl);
    displayColor(complementary);
  } else if (harmonyChoice === "compound") {
    let compound = getHarmony(hsl);
    displayColor(compound);
  } else {
    let shades = getHarmony(hsl);
    displayColor(shades);
  }
}
function getHex(hexValue) {
  // gets hex value of user choice
  console.log(hexValue);
  return hexValue.target.value;
}

function getRgb(hex) {
  // converts hex value to rgb
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5), 16);
  console.log(r, g, b);
  return { r, g, b };
}

function getHsl(rgb) {
  // converts rgb value to hsl
  let r = rgb.r;
  let b = rgb.b;
  let g = rgb.g;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  return { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
}
function getHarmony(hsl) {
  // it gets the parameter based on user choice of pallete, it calculates the value for each
  // color, then it puts them in an object and sends it back
  let color1 = getColor1(hsl);
  let color2 = getColor2(hsl);
  let color3 = getColor3(hsl);
  let color4 = getColor4(hsl);
  let color5 = getColor5(hsl);
  return { color1, color2, color3, color4, color5 };
}

function getColor1(hsl) {
  // returns values of one color depending on selected palette
  const harmonyChoice = document.querySelector("#operator").value;

  if (harmonyChoice === "analogous") {
    let h = bringIntoInterval(hsl.h + 10, 360);

    let s = hsl.s;
    let l = hsl.l;
    return { h, s, l };
  } else if (harmonyChoice === "monochromatic") {
    let h = hsl.h;

    let s = bringIntoInterval(hsl.h + 20, 100);
    let l = hsl.l;
    return { h, s, l };
  } else if (harmonyChoice === "triad") {
    let h = bringIntoInterval(hsl.h + 60, 360);
    let s = bringIntoInterval(hsl.s + 60, 100);
    let l = bringIntoInterval(hsl.l + 60, 100);
    return { h, s, l };
  } else if (harmonyChoice === "complementary") {
    let h = bringIntoInterval(hsl.h - 150, 360);
    let s = bringIntoInterval(hsl.s - 30, 100);
    let l = hsl.l;
    return { h, s, l };
  } else if (harmonyChoice === "compound") {
    let h = bringIntoInterval(hsl.h - 180, 360);
    let s = bringIntoInterval(hsl.s - 180, 100);
    let l = bringIntoInterval(hsl.l - 180, 100);
    return { h, s, l };
  } else {
    let h = hsl.h;
    let s = hsl.s;
    let l = bringIntoInterval(hsl.l + 50, 100);
    return { h, s, l };
  }
}
function getColor2(hsl) {
  const harmonyChoice = document.querySelector("#operator").value;
  if (harmonyChoice === "analogous") {
    let h = bringIntoInterval(hsl.h + 25, 360);
    let s = hsl.s;
    let l = hsl.l;
    return { h, s, l };
  } else if (harmonyChoice === "monochromatic") {
    let h = hsl.h;
    let s = bringIntoInterval(hsl.h - 30, 100);
    let l = hsl.l;
    return { h, s, l };
  } else if (harmonyChoice === "triad") {
    let h = bringIntoInterval(hsl.h - 60, 360);
    let s = bringIntoInterval(hsl.s - 60, 100);
    let l = bringIntoInterval(hsl.l - 60, 100);
    return { h, s, l };
  } else if (harmonyChoice === "complementary") {
    let h = bringIntoInterval(hsl.h - 180, 360);
    let s = bringIntoInterval(hsl.s - 180, 100);
    let l = bringIntoInterval(hsl.l - 180, 100);
    return { h, s, l };
  } else if (harmonyChoice === "compound") {
    let h = bringIntoInterval(hsl.h + 180, 360);
    let s = bringIntoInterval(hsl.s + 180, 100);
    let l = bringIntoInterval(hsl.l + 180, 100);
    return { h, s, l };
  } else {
    let h = hsl.h;
    let s = hsl.s;
    let l = bringIntoInterval(hsl.l + 20, 100);
    return { h, s, l };
  }
}
function getColor3(hsl) {
  let h = hsl.h;
  let s = hsl.s;
  let l = hsl.l;
  return { h, s, l };
}
function getColor4(hsl) {
  const harmonyChoice = document.querySelector("#operator").value;
  if (harmonyChoice === "analogous") {
    let h = bringIntoInterval(hsl.h - 30, 360);
    let s = hsl.s;
    let l = hsl.l;
    return { h, s, l };
  } else if (harmonyChoice === "monochromatic") {
    let h = hsl.h;
    let s = hsl.s;
    let l = bringIntoInterval(hsl.l + 40, 100);
    return { h, s, l };
  } else if (harmonyChoice === "triad") {
    let h = hsl.h;
    let s = hsl.s;
    let l = bringIntoInterval(hsl.l + 30, 100);
    return { h, s, l };
  } else if (harmonyChoice === "complementary") {
    let h = hsl.h;
    let s = hsl.s;
    let l = bringIntoInterval(hsl.l + 21, 100);
    return { h, s, l };
  } else if (harmonyChoice === "compound") {
    let h = bringIntoInterval(hsl.h + 20, 360);
    let s = hsl.s;
    let l = hsl.l;
    return { h, s, l };
  } else {
    let h = hsl.h;
    let s = hsl.s;
    let l = bringIntoInterval(hsl.l - 25, 100);
    return { h, s, l };
  }
}
function getColor5(hsl) {
  const harmonyChoice = document.querySelector("#operator").value;
  if (harmonyChoice === "analogous") {
    let h = bringIntoInterval(hsl.h - 15, 360);
    let s = hsl.s;
    let l = hsl.l;
    return { h, s, l };
  } else if (harmonyChoice === "monochromatic") {
    let h = hsl.h;
    let s = hsl.s;
    let l = bringIntoInterval(hsl.l - 15, 100);
    return { h, s, l };
  } else if (harmonyChoice === "triad") {
    let h = hsl.h;
    let s = hsl.s;
    let l = bringIntoInterval(hsl.l - 30, 100);
    return { h, s, l };
  } else if (harmonyChoice === "complementary") {
    let h = hsl.h;
    let s = hsl.s;
    let l = bringIntoInterval(hsl.l + 51, 100);
    return { h, s, l };
  } else if (harmonyChoice === "compound") {
    let h = bringIntoInterval(hsl.h - 30, 360);
    let s = hsl.s;
    let l = hsl.l;
    return { h, s, l };
  } else {
    let h = hsl.h;
    let s = hsl.s;
    let l = bringIntoInterval(hsl.l - 58, 100);
    return { h, s, l };
  }
}

function displayColor(harmony) {
  // delegates other functions to display adequate color of each box,
  // as well as text for hex,rgb and hsl values
  let color1 = harmony.color1;
  let color2 = harmony.color2;
  let color3 = harmony.color3;
  let color4 = harmony.color4;
  let color5 = harmony.color5;
  showColorBox(1, color1);
  showColorBox(2, color2);
  showColorBox(3, color3);
  showColorBox(4, color4);
  showColorBox(5, color5);
  // displays hsl value
  showHsl(1, color1);
  showHsl(2, color2);
  showHsl(3, color3);
  showHsl(4, color4);
  showHsl(5, color5);

  // it converts hsl to rgb value
  let rgbColor1 = getRgbfromHsl(color1);
  let rgbColor2 = getRgbfromHsl(color2);
  let rgbColor3 = getRgbfromHsl(color3);
  let rgbColor4 = getRgbfromHsl(color4);
  let rgbColor5 = getRgbfromHsl(color5);

  //display rgb valye
  showRgb(1, rgbColor1);
  showRgb(2, rgbColor2);
  showRgb(3, rgbColor3);
  showRgb(4, rgbColor4);
  showRgb(5, rgbColor5);

  // it converts rgb to hex value
  let hexColor1 = getHexFromRgb(rgbColor1);
  let hexColor2 = getHexFromRgb(rgbColor2);
  let hexColor3 = getHexFromRgb(rgbColor3);
  let hexColor4 = getHexFromRgb(rgbColor4);
  let hexColor5 = getHexFromRgb(rgbColor5);
  //display hexvalue
  showHex(1, hexColor1);
  showHex(2, hexColor2);
  showHex(3, hexColor3);
  showHex(4, hexColor4);
  showHex(5, hexColor5);
}

function getRgbfromHsl(color) {
  // converts hsl value to rgb
  let h = color.h;
  let s = color.s;
  let l = color.l;
  h = h;
  s = s / 100;
  l = l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}
function getHexFromRgb(rgb) {
  // converts rgb value to hex
  let hex1 = rgb.r.toString(16);
  let hex2 = rgb.g.toString(16);
  let hex3 = rgb.b.toString(16);

  return `#${hex1}${hex2}${hex3}`;
}

function showColorBox(boxNumber, color) {
  // displays each color
  let displayColor = document.querySelector(
    "#color" + boxNumber + " .colorBox"
  );

  displayColor.style.backgroundColor = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
}
function showHsl(num, hsl) {
  const hslOutput = document.querySelector("#color" + num + " .hsl span");

  hslOutput.textContent = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}

function showRgb(num, rgb) {
  const rgbOutput = document.querySelector("#color" + num + " .rgb span");

  rgbOutput.textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}
function showHex(num, color) {
  const hexOutput = document.querySelector("#color" + num + " .hex span");

  hexOutput.textContent = color;
}

function bringIntoInterval(number, max) {
  // checks if the value is negative

  while (number < 0) {
    number += max; // number = number + max
  }
  return number % max;
}
