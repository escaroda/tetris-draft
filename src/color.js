function modulateColorHSL(baseColor, hRange = 8, sRange = 8, lRange = 8) {
  // pick a random number in a given range
  const random = (min, max) => Math.random() * (max - min) + min;

  // return a new color object
  return {
    // add or subtract a random amount to each color property
    h: baseColor.h + random(-hRange, hRange),
    s: baseColor.s + random(-sRange, sRange),
    l: baseColor.l + random(-lRange, lRange),
  };
}
