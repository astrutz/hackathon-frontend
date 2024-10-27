// src/model-viewer.d.ts
declare global {
  interface HTMLModelViewerElement extends HTMLElement {
    autoRotate?: boolean;
    autoplay?: boolean;
    cameraOrbit?: string;
    fieldOfView?: string;
    src?: string;
  }
}

// Diese Zeile ist notwendig, damit TypeScript die Datei als Modul behandelt
export {};
