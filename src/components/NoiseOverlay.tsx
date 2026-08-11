import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 200;
    canvas.height = 200;
    let frame: number;

    const render = () => {
      const imageData = ctx.createImageData(200, 200);
      const buffer = new Uint32Array(imageData.data.buffer);
      for (let i = 0; i < buffer.length; i++) {
        const shade = Math.random() * 255;
        buffer[i] =
          (255 << 24) | (shade << 16) | (shade << 8) | shade;
      }
      ctx.putImageData(imageData, 0, 0);
      frame = requestAnimationFrame(() => {
        setTimeout(render, 60);
      });
    };
    render();
    return () => cancelAnimationFrame(frame);
  }, []);

  return <canvas ref={canvasRef} className="grain h-full w-full" />;
}
