'use client';

import { useEffect, useRef, useState } from 'react';

interface TilePortraitProps {
  src: string;
  alt: string;
  /** Tiles across the portrait. */
  grid?: number;
  className?: string;
  /** Called once, when the last tile has landed in the portrait. */
  onAssembled?: () => void;
}

interface Tile {
  /** Grid position. */
  col: number;
  row: number;
  /** Flat duotone colour shown while the tile is "loose". */
  color: string;
  /** Assembly: where the tile starts from and when it sets off. */
  startX: number;
  startY: number;
  delay: number;
  /** Live state, eased toward the hover targets every frame. */
  ox: number;
  oy: number;
  flat: number;
}

const ASSEMBLE_MS = 700;
const SETTLE_MS = 450;
/** Room around the portrait (as a fraction of its size) for tiles to move into. */
const PAD = 0.14;

/** Dark brown → terracotta → cream, matching the site palette. */
const RAMP: [number, number, number][] = [
  [44, 36, 22],
  [204, 120, 92],
  [244, 237, 229],
];

function rampColor(luminance: number): string {
  const t = Math.min(1, Math.max(0, luminance)) * (RAMP.length - 1);
  const i = Math.min(RAMP.length - 2, Math.floor(t));
  const f = t - i;
  const [r, g, b] = RAMP[i].map((c, k) => Math.round(c + (RAMP[i + 1][k] - c) * f));
  return `rgb(${r}, ${g}, ${b})`;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * The portrait as a grid of square tiles. Tiles fly in and assemble once on
 * load, then resolve into the photo. Moving the pointer over it loosens the
 * tiles nearby. With reduced motion on, it is just the photo.
 */
export function TilePortrait({
  src,
  alt,
  grid = 30,
  className = '',
  onAssembled,
}: TilePortraitProps) {
  const onAssembledRef = useRef(onAssembled);
  onAssembledRef.current = onAssembled;
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduced) {
      return;
    }
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!wrap || !canvas || !ctx) {
      return;
    }

    let raf = 0;
    let cancelled = false;
    let tiles: Tile[] = [];
    let tilePx = 0; // tile size in device pixels
    let padPx = 0;
    let startTime = 0;
    let announced = false;
    let pointer: { x: number; y: number } | null = null;
    let crop = { x: 0, y: 0, size: 0 };
    const img = new Image();

    const layout = () => {
      const size = wrap.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      tilePx = Math.max(1, Math.round((size * dpr) / grid));
      padPx = Math.round(tilePx * grid * PAD);
      const total = tilePx * grid + padPx * 2;
      canvas.width = total;
      canvas.height = total;
      // Keep the photo area exactly the wrapper's size; padding hangs outside.
      const cssPad = (size * padPx) / (tilePx * grid);
      canvas.style.width = `${size + cssPad * 2}px`;
      canvas.style.height = `${size + cssPad * 2}px`;
      canvas.style.left = `${-cssPad}px`;
      canvas.style.top = `${-cssPad}px`;
    };

    const buildTiles = () => {
      // Centre-crop the photo to a square, then read one averaged colour per tile.
      const side = Math.min(img.naturalWidth, img.naturalHeight);
      crop = {
        x: (img.naturalWidth - side) / 2,
        y: (img.naturalHeight - side) / 2,
        size: side,
      };
      const sample = document.createElement('canvas');
      sample.width = grid;
      sample.height = grid;
      const sctx = sample.getContext('2d', { willReadFrequently: true });
      if (!sctx) {
        return;
      }
      sctx.drawImage(img, crop.x, crop.y, side, side, 0, 0, grid, grid);
      const data = sctx.getImageData(0, 0, grid, grid).data;

      const centre = (grid - 1) / 2;
      const radius = grid / 2;
      tiles = [];
      for (let row = 0; row < grid; row += 1) {
        for (let col = 0; col < grid; col += 1) {
          const dist = Math.hypot(col - centre, row - centre);
          if (dist > radius) {
            continue; // keep a round portrait with a stepped, pixel edge
          }
          const k = (row * grid + col) * 4;
          const lum = (0.2126 * data[k] + 0.7152 * data[k + 1] + 0.0722 * data[k + 2]) / 255;
          const angle = Math.random() * Math.PI * 2;
          const far = 0.25 + Math.random() * 0.5;
          tiles.push({
            col,
            row,
            color: rampColor(lum),
            startX: Math.cos(angle) * far,
            startY: Math.sin(angle) * far,
            // Centre lands first, edge last, with a little noise.
            delay: (dist / radius) * 500 + Math.random() * 250,
            ox: 0,
            oy: 0,
            flat: 1,
          });
        }
      }
    };

    const draw = (now: number) => {
      const elapsed = now - startTime;
      const span = tilePx * grid;
      const srcTile = crop.size / grid;
      let moving = false;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const tile of tiles) {
        const homeX = padPx + tile.col * tilePx;
        const homeY = padPx + tile.row * tilePx;
        let x = homeX;
        let y = homeY;
        let alpha = 1;
        let scale = 1;

        const t = (elapsed - tile.delay) / ASSEMBLE_MS;
        if (t < 1) {
          // Assembling: fly in from a scattered start.
          const e = easeOutCubic(Math.max(0, t));
          x += tile.startX * span * (1 - e);
          y += tile.startY * span * (1 - e);
          alpha = e;
          scale = 0.4 + 0.6 * e;
          tile.flat = 1;
          moving = true;
        } else {
          // Settled: ease toward the pointer's push (or back home).
          let targetX = 0;
          let targetY = 0;
          let targetFlat = 0;
          const sinceLanded = elapsed - tile.delay - ASSEMBLE_MS;
          if (sinceLanded < SETTLE_MS) {
            targetFlat = 1 - sinceLanded / SETTLE_MS;
            moving = true;
          }
          if (pointer) {
            const dx = homeX + tilePx / 2 - pointer.x;
            const dy = homeY + tilePx / 2 - pointer.y;
            const dist = Math.hypot(dx, dy) || 1;
            const reach = span * 0.3;
            if (dist < reach) {
              const force = Math.pow(1 - dist / reach, 2);
              targetX = (dx / dist) * force * tilePx * 2.4;
              targetY = (dy / dist) * force * tilePx * 2.4;
              targetFlat = Math.max(targetFlat, Math.min(0.7, force * 1.3));
            }
          }
          tile.ox += (targetX - tile.ox) * 0.16;
          tile.oy += (targetY - tile.oy) * 0.16;
          tile.flat += (targetFlat - tile.flat) * 0.16;
          if (
            Math.abs(targetX - tile.ox) > 0.05 ||
            Math.abs(targetY - tile.oy) > 0.05 ||
            Math.abs(targetFlat - tile.flat) > 0.01
          ) {
            moving = true;
          } else {
            tile.ox = targetX;
            tile.oy = targetY;
            tile.flat = targetFlat;
          }
          x += tile.ox;
          y += tile.oy;
          scale = 1 - tile.flat * 0.18;
        }

        const size = tilePx * scale;
        const inset = (tilePx - size) / 2;
        if (tile.flat < 1) {
          ctx.globalAlpha = alpha;
          // +1 device pixel overlap hides seams between photo tiles at rest.
          const overlap = tile.flat === 0 ? 1 : 0;
          ctx.drawImage(
            img,
            crop.x + tile.col * srcTile,
            crop.y + tile.row * srcTile,
            srcTile,
            srcTile,
            x + inset,
            y + inset,
            size + overlap,
            size + overlap,
          );
        }
        if (tile.flat > 0) {
          ctx.globalAlpha = alpha * tile.flat;
          ctx.fillStyle = tile.color;
          ctx.fillRect(x + inset, y + inset, size, size);
        }
      }
      ctx.globalAlpha = 1;

      // Longest tile delay is 750ms, so this is the moment the portrait is whole.
      if (!announced && elapsed > 750 + ASSEMBLE_MS) {
        announced = true;
        onAssembledRef.current?.();
      }

      // Only keep the loop alive while something is still moving.
      raf = moving || pointer ? requestAnimationFrame(draw) : 0;
    };

    const wake = () => {
      if (!raf && tiles.length > 0) {
        raf = requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const ratio = canvas.width / rect.width;
      pointer = {
        x: (event.clientX - rect.left) * ratio,
        y: (event.clientY - rect.top) * ratio,
      };
      wake();
    };
    const onPointerLeave = () => {
      pointer = null;
      wake();
    };
    const onResize = () => {
      layout();
      wake();
    };

    img.onload = () => {
      if (cancelled) {
        return;
      }
      layout();
      buildTiles();
      startTime = performance.now();
      wake();
    };
    img.src = src;

    wrap.addEventListener('pointermove', onPointerMove);
    wrap.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      wrap.removeEventListener('pointermove', onPointerMove);
      wrap.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced, src, grid]);

  return (
    <div ref={wrapRef} data-hero-portrait className={`relative shrink-0 ${className}`}>
      {/* The plain photo: shown only with reduced motion; otherwise the tiles draw it. */}
      <img
        src={src}
        alt={alt}
        className={`size-full rounded-full object-cover ${reduced ? '' : 'invisible'}`}
      />
      {!reduced && (
        <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute" />
      )}
    </div>
  );
}
