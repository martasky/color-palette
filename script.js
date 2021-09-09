"use strict";

window.addEventListener("DOMContentLoaded", getColor);

function getColor() {
  const userChoice = document.querySelector("#colorPicker");

  userChoice.addEventListener("input", convertColor);

  console.log(userChoice);
}

function convertColor(event) {
  let hex = getHex(event);
  console.log(hex);
  let rgb = getRgb(hex);
  let hsl = getHsl(rgb);
  let css = getCss(rgb);
  displayColor(hex, rgb, hsl, css);
}
function getHex(hexValue) {
  console.log(hexValue);
  return hexValue.target.value;
}
function getRgb(hex) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5), 16);
  console.log(r, g, b);
  return { r, g, b };
}

function getHsl(rgb) {
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

function getCss(rgb) {
  let cssStr = `rgb( ${rgb.r}, ${rgb.g}, ${rgb.b} )`;
  return cssStr;
}

function displayColor(hexVal, rgbVal, hslVal, cssVal) {
  showColor(cssVal);
  showHex(hexVal);
  showRGB(rgbVal);
  showHSL(hslVal);
}
function showColor(color) {
  let displayColor = document.querySelector("#display_color");
  displayColor.style.backgroundColor = color;
}
function showHex(hex) {
  let hexOutput = document.querySelector(".hex span");
  hexOutput.textContent = hex;
}

function showRGB(rgb) {
  let rgbOutput = document.querySelector(".rgb span");
  rgbOutput.textContent = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}
function showHSL(hsl) {
  let hslOutput = document.querySelector(".hsl span");
  hslOutput.textContent = `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}
