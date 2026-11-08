import React, { useEffect, useRef } from 'react';

/**
 * TripGenWaterfall
 * 
 * Photorealistic Middle-Chute Downward Waterfall Flow Animation:
 * - Direct Canvas Vector Clipping: Zero external image dependencies, zero offscreen
 *   compositing, zero latency, and zero alpha wipeout.
 * - Continuous downward water flow strictly in the middle place chute:
 *   from mountain crest rock lip down into the turquoise plunge pool.
 * - 100% resilient across page refresh, continuous scrolling, window resizing,
 *   and late image loading.
 * - Pure water aesthetics: Crystalline white and icy aqua ribbons, surging foaming wave pulses,
 *   sunlit spray glints, and concentric pool ripples.
 */

const TripGenWaterfall = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let lastTime = performance.now();

    // Responsive high-DPI sizing
    const updateSize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const parentRect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : null;
      const clientW = rect.width || (parentRect ? parentRect.width : 0) || canvas.clientWidth;
      const clientH = rect.height || (parentRect ? parentRect.height : 0) || canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(clientW * dpr);
      const h = Math.round(clientH * dpr);

      if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    updateSize();

    // Listen to parent banner image load to immediately adjust canvas size
    const bannerImg = canvas.parentElement ? canvas.parentElement.querySelector('img') : null;
    if (bannerImg) {
      if (!bannerImg.complete) {
        bannerImg.addEventListener('load', updateSize);
      }
    }

    // Scroll listeners: window scroll + modal scroll parent
    window.addEventListener('resize', updateSize, { passive: true });
    window.addEventListener('scroll', updateSize, { passive: true });

    // Look for scrollable parent modal container
    let scrollParent = canvas.closest('.overflow-y-auto') || canvas.closest('.overflow-auto');
    if (scrollParent) {
      scrollParent.addEventListener('scroll', updateSize, { passive: true });
    }

    // ResizeObserver on canvas, parent, and grandparent
    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserver.observe(canvas);
      if (canvas.parentElement) {
        resizeObserver.observe(canvas.parentElement);
        if (canvas.parentElement.parentElement) {
          resizeObserver.observe(canvas.parentElement.parentElement);
        }
      }
    }

    // ─── WATERFALL FLOW: MIDDLE PLACE DOWNWARD WATER STRANDS ───────────
    // Confined strictly to the middle cascade chute:
    // X ratio: 0.795 to 0.895
    // Y ratio: 0.138 to 0.895 (mountain rock lip down to plunge pool)
    const NUM_STRANDS = 220;
    const strands = Array.from({ length: NUM_STRANDS }, () => {
      const xRatio = 0.795 + Math.random() * 0.100;
      // Sloped crest rock lip: higher at right (0.895 -> ~0.138), lower at left (0.795 -> ~0.270)
      const topYRatio = Math.max(0.135, 0.270 - (xRatio - 0.795) * 1.32);
      const botYRatio = 0.895;

      return {
        xRatio,
        topYRatio,
        botYRatio,
        speedRatio: 0.65 + Math.random() * 0.50, // Rapid downward flow speed
        lengthRatio: 0.10 + Math.random() * 0.18, // Strand length
        width: 1.2 + Math.random() * 2.8,
        alpha: 0.55 + Math.random() * 0.40,       // Crisp, visible pure water
        offset: Math.random() * 1000,
      };
    });

    // Sunlit specular spray sparkles rushing down strictly in the middle chute
    const NUM_SPARKLES = 50;
    const sparkles = Array.from({ length: NUM_SPARKLES }, () => ({
      xRatio: 0.800 + Math.random() * 0.092,
      speedRatio: 0.70 + Math.random() * 0.45,
      size: 1.5 + Math.random() * 2.2,
      offset: Math.random() * 1000,
      phase: Math.random() * Math.PI * 2,
    }));

    // Concentric plunge pool ripples where middle water hits the base
    const NUM_RIPPLES = 5;
    const ripples = Array.from({ length: NUM_RIPPLES }, (_, i) => ({
      progress: i / NUM_RIPPLES,
      speed: 0.25,
    }));

    // ─── ANIMATION LOOP ───────────────────────────────────────────────
    const render = (currentTime) => {
      try {
        const now = currentTime || performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.064);
        lastTime = now;

        // Auto-heal canvas size on each frame if DOM dimensions became available
        const clientW = canvas.clientWidth;
        const clientH = canvas.clientHeight;
        if (clientW > 0 && clientH > 0) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const targetW = Math.round(clientW * dpr);
          const targetH = Math.round(clientH * dpr);
          if (canvas.width !== targetW || canvas.height !== targetH) {
            canvas.width = targetW;
            canvas.height = targetH;
          }
        }

        const w = canvas.width;
        const h = canvas.height;

        if (w > 0 && h > 0) {
          ctx.clearRect(0, 0, w, h);
          const timeSec = now / 1000;

          // Exact object-cover layout matching 2048 x 684 banner image
          const containerAR = w / h;
          const imgAR = 2048 / 684;
          let rw, rh, ox, oy;
          if (containerAR > imgAR) {
            rw = w;
            rh = w / imgAR;
            ox = 0;
            oy = (h - rh) / 2;
          } else {
            rh = h;
            rw = h * imgAR;
            ox = (w - rw) / 2;
            oy = 0;
          }

          // ─── DIRECT MIDDLE-CHUTE VECTOR CLIPPING ───
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(ox + 0.817 * rw, oy + 0.270 * rh);
          ctx.bezierCurveTo(
            ox + 0.840 * rw, oy + 0.190 * rh,
            ox + 0.875 * rw, oy + 0.145 * rh,
            ox + 0.898 * rw, oy + 0.138 * rh
          );
          ctx.lineTo(ox + 0.895 * rw, oy + 0.895 * rh);
          ctx.lineTo(ox + 0.790 * rw, oy + 0.895 * rh);
          ctx.bezierCurveTo(
            ox + 0.800 * rw, oy + 0.650 * rh,
            ox + 0.810 * rw, oy + 0.450 * rh,
            ox + 0.817 * rw, oy + 0.270 * rh
          );
          ctx.closePath();
          ctx.clip();

          // 1. Cascading foaming white water wave bands rushing downward in middle chute
          const wfTopY = oy + 0.135 * rh;
          const wfBotY = oy + 0.895 * rh;
          const wfHeight = wfBotY - wfTopY;
          const wfLeftX = ox + 0.792 * rw;
          const wfWidth = (0.898 - 0.792) * rw;

          for (let sw = 0; sw < 6; sw++) {
            const waveY = wfTopY + ((timeSec * (wfHeight * 0.68) + sw * (wfHeight / 6)) % wfHeight);
            const waveBandH = Math.max(16, 42 * (rh / 684));
            const topY = Math.max(wfTopY, waveY - waveBandH / 2);
            const botY = Math.min(wfBotY, waveY + waveBandH / 2);
            const bandDrawH = botY - topY;

            if (bandDrawH >= 2) {
              const waveGrad = ctx.createLinearGradient(0, topY, 0, botY);
              waveGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
              waveGrad.addColorStop(0.3, 'rgba(230, 248, 255, 0.24)');
              waveGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.40)');
              waveGrad.addColorStop(0.7, 'rgba(230, 248, 255, 0.24)');
              waveGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

              ctx.fillStyle = waveGrad;
              ctx.fillRect(wfLeftX, topY, wfWidth, bandDrawH);
            }
          }

          // 2. High-speed rushing water strands flowing top to bottom in middle chute
          strands.forEach((s) => {
            const startY = oy + s.topYRatio * rh;
            const endY = oy + s.botYRatio * rh;
            const chuteH = endY - startY;
            const speedPx = s.speedRatio * rh;
            const lengthPx = s.lengthRatio * rh;

            const currentY = startY + ((s.offset + speedPx * timeSec) % (chuteH + lengthPx)) - lengthPx;
            const yBot = currentY + lengthPx;
            if (yBot <= startY || currentY >= endY) return;

            const strandX = ox + s.xRatio * rw;
            const drawTop = Math.max(startY, currentY);
            const drawBottom = Math.min(endY, yBot);
            const drawH = drawBottom - drawTop;
            if (drawH < 2) return;

            // Pure crystalline white & aquatic icy water stream gradient
            const grad = ctx.createLinearGradient(0, drawTop, 0, drawBottom);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
            grad.addColorStop(0.25, `rgba(220, 246, 255, ${s.alpha * 0.75})`);
            grad.addColorStop(0.50, `rgba(255, 255, 255, ${s.alpha})`);
            grad.addColorStop(0.75, `rgba(210, 242, 255, ${s.alpha * 0.75})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = grad;
            ctx.fillRect(strandX - s.width / 2, drawTop, s.width, drawH);
          });

          // 3. Specular crystalline sunlit spray glints rushing down in middle chute
          sparkles.forEach((sp) => {
            const startY = oy + 0.14 * rh;
            const endY = oy + 0.89 * rh;
            const chuteH = endY - startY;
            const speedPx = sp.speedRatio * rh;
            const sy = startY + ((sp.offset + speedPx * timeSec) % chuteH);
            const sx = ox + sp.xRatio * rw;
            const sparkAlpha = (Math.sin(timeSec * 12 + sp.phase) * 0.5 + 0.5) * 0.95;

            ctx.fillStyle = `rgba(255, 255, 255, ${sparkAlpha})`;
            const sz = Math.max(1.5, sp.size * (rw / 1200));
            ctx.fillRect(sx - sz / 2, sy - sz / 2, sz, sz * 1.8);
          });

          ctx.restore();

          // 4. Concentric water ripples where middle water crashes into plunge pool
          const poolCenterX = ox + 0.845 * rw;
          const poolCenterY = oy + 0.885 * rh;
          ripples.forEach((r) => {
            r.progress = (r.progress + r.speed * dt) % 1.0;
            const rx = (16 + r.progress * 130) * (rw / 1200);
            const ry = rx * 0.32;
            const alpha = (1.0 - r.progress) * 0.45 * Math.sin(r.progress * Math.PI);
            if (alpha > 0.01) {
              ctx.beginPath();
              ctx.ellipse(poolCenterX, poolCenterY, rx, ry, 0, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(225, 250, 255, ${alpha})`;
              ctx.lineWidth = Math.max(1, (2.2 - r.progress * 1.2) * (rw / 1200));
              ctx.stroke();
            }
          });
        }
      } catch (err) {
        // Safe failover ensures continuous loop never dies
      } finally {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (bannerImg) bannerImg.removeEventListener('load', updateSize);
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('scroll', updateSize);
      if (scrollParent) scrollParent.removeEventListener('scroll', updateSize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-[6] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{
          display: 'block',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default TripGenWaterfall;
