<template></template>

<script setup>
  import * as ThumbHash from "../../../public/js/thumbhash";

  // Image to ThumbHash (although this is typically done on the server, not on the client)
  const originalURL = "../img/bg.jpg";
  const image = new Image();
  image.src = originalURL;

  const load = async () => {
    const img = new Image();
    img.src = "../img/bg.jpg";
    if (!img.complete) {
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
      console.log(placeholderURL);
      let style = document.createElement("style");
      style.innerHTML = `
        @media screen and (min-width:768px) {
          .VPHome:before {
            background-image: var(--bg-image, url(${placeholderURL}));
            transition: background-image 0.6s;
            background-size: cover;
          }
        }
        `;
      document.head.appendChild(style);
      let vp = document.querySelector(".VPHome");
      vp.style.setProperty("--bg-image", `url(${originalURL})`);
    } else {
      let style = document.createElement("style");
      style.innerHTML = `
      @media screen and (min-width:768px) {
        .VPHome:before {
          background-image: var(--bg-image, url(${originalURL}));
          transition: background-image 0.6s;
          background-size: cover;
        }
      }
      `;
      document.head.appendChild(style);
    }
  };
  load();
</script>

<style lang="scss" scoped></style>
