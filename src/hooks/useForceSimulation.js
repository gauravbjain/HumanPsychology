import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Force-directed layout simulation for a small set of nodes and edges.
 *
 * Forces:
 *  1. Repulsion between all node pairs (Coulomb-like)
 *  2. Spring attraction along edges
 *  3. Centering pull toward the viewport center
 *
 * Returns positions array, plus pinNode/unpinNode for drag support.
 */
export function useForceSimulation(nodes, edges, width, height) {
  const posRef = useRef([]);
  const edgesRef = useRef(edges);
  const alphaRef = useRef(1.0);
  const frameRef = useRef(null);
  const sizeRef = useRef({ width, height });

  const [positions, setPositions] = useState([]);

  // Keep edges ref current
  useEffect(() => {
    edgesRef.current = edges;
  }, [edges]);

  useEffect(() => {
    sizeRef.current = { width, height };
  }, [width, height]);

  // Initialize positions when nodes change
  useEffect(() => {
    if (!nodes.length || !width || !height) {
      posRef.current = [];
      setPositions([]);
      return;
    }

    // Group by region for angular sector placement
    const regionGroups = {};
    nodes.forEach((n) => {
      if (!regionGroups[n.region]) regionGroups[n.region] = [];
      regionGroups[n.region].push(n);
    });

    const regionKeys = Object.keys(regionGroups);
    const sectorAngle = (2 * Math.PI) / (regionKeys.length || 1);
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.32;
    const newPos = [];

    regionKeys.forEach((region, sIdx) => {
      const group = regionGroups[region];
      const baseAngle = sIdx * sectorAngle - Math.PI / 2;
      group.forEach((node, nIdx) => {
        const angle = baseAngle + ((nIdx + 0.5) / group.length) * sectorAngle;
        const r = radius * (0.7 + 0.3 * Math.random());
        newPos.push({
          id: node.id,
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle),
          vx: 0,
          vy: 0,
          fx: null,
          fy: null,
        });
      });
    });

    posRef.current = newPos;
    alphaRef.current = 1.0;
    setPositions([...newPos]);
    startLoop();

    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, width, height]);

  function startLoop() {
    cancelAnimationFrame(frameRef.current);
    let frameCount = 0;
    function tick() {
      const alpha = alphaRef.current;
      if (alpha < 0.001) {
        setPositions([...posRef.current]);
        return;
      }

      const pos = posRef.current;
      const { width: w, height: h } = sizeRef.current;
      const REPULSION = 2500;
      const SPRING = 0.045;
      const IDEAL_LEN = 140;
      const CONTRADICTS_LEN = 220;
      const CENTER_STR = 0.008;
      const DAMPING = 0.55;
      const DECAY = 0.985;

      // 1. Repulsion
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          let dx = pos[i].x - pos[j].x;
          let dy = pos[i].y - pos[j].y;
          let distSq = dx * dx + dy * dy;
          if (distSq < 1) { dx = Math.random() - 0.5; dy = Math.random() - 0.5; distSq = 1; }
          const dist = Math.sqrt(distSq);
          const force = (REPULSION * alpha) / distSq;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          pos[i].vx += fx;
          pos[i].vy += fy;
          pos[j].vx -= fx;
          pos[j].vy -= fy;
        }
      }

      // 2. Spring attraction along edges
      const posMap = {};
      pos.forEach((p) => { posMap[p.id] = p; });
      const curEdges = edgesRef.current;
      for (const edge of curEdges) {
        const s = posMap[edge.source];
        const t = posMap[edge.target];
        if (!s || !t) continue;
        const idealLen = edge.type === 'contradicts' ? CONTRADICTS_LEN : IDEAL_LEN;
        const dx = t.x - s.x;
        const dy = t.y - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const displacement = dist - idealLen;
        const force = SPRING * displacement * alpha;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        s.vx += fx;
        s.vy += fy;
        t.vx -= fx;
        t.vy -= fy;
      }

      // 3. Centering
      const cx = w / 2;
      const cy = h / 2;
      for (const p of pos) {
        p.vx += (cx - p.x) * CENTER_STR * alpha;
        p.vy += (cy - p.y) * CENTER_STR * alpha;
      }

      // 4. Apply velocity
      for (const p of pos) {
        if (p.fx !== null) {
          p.x = p.fx;
          p.y = p.fy;
          p.vx = 0;
          p.vy = 0;
          continue;
        }
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;
        p.x = Math.max(50, Math.min(w - 50, p.x));
        p.y = Math.max(50, Math.min(h - 50, p.y));
      }

      alphaRef.current *= DECAY;

      // Update React state every 2nd frame for performance
      frameCount++;
      if (frameCount % 2 === 0) {
        setPositions([...pos]);
      }

      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
  }

  const pinNode = useCallback((id, x, y) => {
    const p = posRef.current.find((n) => n.id === id);
    if (p) {
      p.fx = x;
      p.fy = y;
      p.x = x;
      p.y = y;
    }
    // Reheat
    if (alphaRef.current < 0.05) {
      alphaRef.current = 0.15;
      startLoop();
    }
  }, []);

  const unpinNode = useCallback((id) => {
    const p = posRef.current.find((n) => n.id === id);
    if (p) {
      p.fx = null;
      p.fy = null;
    }
  }, []);

  const reheat = useCallback(() => {
    alphaRef.current = 0.5;
    startLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { positions, pinNode, unpinNode, reheat };
}
