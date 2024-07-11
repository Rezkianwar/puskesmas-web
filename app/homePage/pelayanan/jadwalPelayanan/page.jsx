"use client";

import { useState, useRef } from "react";
import styles from "../../../ui/homePage/pelayanan/jadwalPelayana.module.css";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import image from "../../../../public/jadwal.png";

const JadwalLayanan = () => {
  const [open, setOpen] = useState(false);

  const fullscreenRef = useRef(null);

  const images = [image];

  const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
  const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

  function nextImageUrl(src, size) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
  }

  const slides = images.map(({ src, width, height }) => ({
    width,
    height,
    src: nextImageUrl(src, width),
    srcSet: imageSizes
      .concat(...deviceSizes)
      .filter((size) => size <= width)
      .map((size) => ({
        src: nextImageUrl(src, size),
        width: size,
        height: Math.round((height / width) * size),
      })),
  }));

  return (
    <div className={styles.container}>
      <Image
        src="/jadwal.png"
        alt="layanan"
        width="800"
        height="1500"
        onClick={() => setOpen(true)}
        className={styles.img}
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          {
            ...slides[0],
            src: "/jadwal.png",
            downloadUrl: "/jadwal.png",
          },
        ]}
        plugins={[Zoom, Download, Fullscreen]}
        fullscreen={{ ref: fullscreenRef }}
        on={{
          click: () => fullscreenRef.current?.enter(),
        }}
      />
    </div>
  );
};

export default JadwalLayanan;
