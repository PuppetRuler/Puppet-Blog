<template></template>

<script setup>
  import * as ThumbHash from "../../../public/js/thumbhash";

  // Image to ThumbHash (although this is typically done on the server, not on the client)
  const originalURL = "../img/bg.jpg";
  const image = new Image();
  image.src = originalURL;

  const load = async () => {
    await new Promise((resolve) => (image.onload = resolve));
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const scale = 100 / Math.max(image.width, image.height);
    canvas.width = Math.round(image.width * scale);
    canvas.height = Math.round(image.height * scale);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
    const binaryThumbHash = ThumbHash.rgbaToThumbHash(
      pixels.width,
      pixels.height,
      pixels.data
    );

    // ThumbHash to data URL
    const placeholderURL = ThumbHash.thumbHashToDataURL(binaryThumbHash);

    let vp = document.querySelector(".VPHome");
    vp.style.setProperty("--bg-image", `url(${originalURL})`);
  };
  load();
</script>

<style lang="scss" scoped></style>
