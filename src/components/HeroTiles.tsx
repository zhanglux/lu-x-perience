'use client';

import { useEffect, useRef } from 'react';

/** Grid pitch and tile size in CSS pixels. */
const CELL = 12;
const TILE = 10;
/** How far from the pointer tiles light up, in CSS pixels. */
const REACH = 96;
/** Per-frame fade: tiles are gone in well under a second. */
const DECAY = 0.92;
const MAX_ALPHA = 0.6;
/** Tiles behind the text block are dimmed so the copy stays easy to read. */
const TEXT_DIM = 0.5;
/** The opening wave: how fast its front travels and how deep the lit band is. */
const WAVE_SPEED = 750; // CSS pixels per second
const WAVE_BAND = 90;

/**
 * A layer of square tiles behind the hero. When `play` turns true, one wave of
 * tiles spreads out from the portrait (`[data-hero-portrait]`) across the whole
 * hero; after that, tiles only tint near the pointer and fade back. Mount it as
 * the first child of a `relative` container; it listens on that container.
 */
export function HeroTiles({ play = false }: { play?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startWaveRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (play) {
      startWaveRef.current?.();
    }
  }, [play]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) {
      return;
    }

    const allowed = [
      window.matchMedia('(hover: hover)'),
      window.matchMedia('(prefers-reduced-motion: no-preference)'),
    ];

    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let levels = new Float32Array(0);
    let dim = new Float32Array(0);
    let raf = 0;
    let wave: { start: number; x: number; y: number; reach: number } | null = null;

    const layout = () => {
      const { width, height } = host.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      levels = new Float32Array(cols * rows);

      // Mark the cells that sit behind the text block.
      dim = new Float32Array(cols * rows).fill(1);
      const text = host.querySelector('[data-hero-text]');
      if (text) {
        const hostRect = host.getBoundingClientRect();
        const rect = text.getBoundingClientRect();
        const c0 = Math.floor((rect.left - hostRect.left) / CELL);
        const c1 = Math.ceil((rect.right - hostRect.left) / CELL);
        const r0 = Math.floor((rect.top - hostRect.top) / CELL);
        const r1 = Math.ceil((rect.bottom - hostRect.top) / CELL);
        for (let r = Math.max(0, r0); r < Math.min(rows, r1); r += 1) {
          for (let c = Math.max(0, c0); c < Math.min(cols, c1); c += 1) {
            dim[r * cols + c] = TEXT_DIM;
          }
        }
      }
    };

    /** Light the cells the wave front has just reached. */
    const advanceWave = (now: number) => {
      if (!wave) {
        return;
      }
      const front = ((now - wave.start) / 1000) * WAVE_SPEED;
      if (front - WAVE_BAND > wave.reach) {
        wave = null;
        return;
      }
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const dist = Math.hypot((c + 0.5) * CELL - wave.x, (r + 0.5) * CELL - wave.y);
          const behind = front - dist;
          // Sparse on purpose, so it reads as scattered tiles and not a solid sweep.
          if (behind < 0 || behind > WAVE_BAND || Math.random() > 0.1) {
            continue;
          }
          const level = (1 - behind / WAVE_BAND) * (0.4 + Math.random() * 0.6);
          const i = r * cols + c;
          if (level > levels[i]) {
            levels[i] = level;
          }
        }
      }
    };

    const draw = (now: number) => {
      advanceWave(now);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = wave !== null;
      const gap = (CELL - TILE) / 2;
      for (let i = 0; i < levels.length; i += 1) {
        const level = levels[i];
        if (level < 0.02) {
          levels[i] = 0;
          continue;
        }
        alive = true;
        const col = i % cols;
        const row = (i - col) / cols;
        ctx.fillStyle = `rgba(204, 120, 92, ${level * MAX_ALPHA * dim[i]})`;
        ctx.fillRect(
          Math.round((col * CELL + gap) * dpr),
          Math.round((row * CELL + gap) * dpr),
          Math.round(TILE * dpr),
          Math.round(TILE * dpr),
        );
        levels[i] = level * DECAY;
      }
      raf = alive ? requestAnimationFrame(draw) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!allowed.every((q) => q.matches)) {
        return;
      }
      const rect = host.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const span = Math.ceil(REACH / CELL);
      const pc = Math.floor(x / CELL);
      const pr = Math.floor(y / CELL);
      for (let r = Math.max(0, pr - span); r <= Math.min(rows - 1, pr + span); r += 1) {
        for (let c = Math.max(0, pc - span); c <= Math.min(cols - 1, pc + span); c += 1) {
          const dist = Math.hypot((c + 0.5) * CELL - x, (r + 0.5) * CELL - y);
          if (dist >= REACH) {
            continue;
          }
          // Uneven on purpose: a scatter of tiles, not a solid spotlight.
          const level = Math.pow(1 - dist / REACH, 2) * (0.35 + Math.random() * 0.65);
          const i = r * cols + c;
          if (level > levels[i]) {
            levels[i] = level;
          }
        }
      }
      if (!raf) {
        raf = requestAnimationFrame(draw);
      }
    };

    startWaveRef.current = () => {
      if (!allowed[1].matches) {
        return;
      }
      const hostRect = host.getBoundingClientRect();
      const portrait = host.querySelector('[data-hero-portrait]')?.getBoundingClientRect();
      const x = portrait ? portrait.left + portrait.width / 2 - hostRect.left : hostRect.width;
      const y = portrait ? portrait.top + portrait.height / 2 - hostRect.top : 0;
      // Far enough to reach the furthest corner of the hero.
      const reach = Math.hypot(
        Math.max(x, hostRect.width - x),
        Math.max(y, hostRect.height - y),
      );
      wave = { start: performance.now(), x, y, reach };
      if (!raf) {
        raf = requestAnimationFrame(draw);
      }
    };

    layout();
    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(host);
    host.addEventListener('pointermove', onPointerMove);

    return () => {
      cancelAnimationFrame(raf);
      startWaveRef.current = null;
      resizeObserver.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
