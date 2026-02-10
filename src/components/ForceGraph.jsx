import { useState, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getThemeForRegion } from '../data/themes';
import { useForceSimulation } from '../hooks/useForceSimulation';
import './ForceGraph.css';

/**
 * Build edge list from theories array.
 * - relatedIds → solid, undirected (deduplicated)
 * - contradictsIds → dashed red, undirected (deduplicated)
 * - influencedBy → dotted with arrow, directed
 */
export function buildEdges(theories) {
  const edges = [];
  const seen = new Set();
  const idSet = new Set(theories.map((t) => t.id));

  for (const t of theories) {
    for (const rid of t.relatedIds || []) {
      if (!idSet.has(rid)) continue;
      const key = [t.id, rid].sort().join('--') + '--related';
      if (!seen.has(key)) {
        edges.push({ source: t.id, target: rid, type: 'related' });
        seen.add(key);
      }
    }
    for (const cid of t.contradictsIds || []) {
      if (!idSet.has(cid)) continue;
      const key = [t.id, cid].sort().join('--') + '--contradicts';
      if (!seen.has(key)) {
        edges.push({ source: t.id, target: cid, type: 'contradicts' });
        seen.add(key);
      }
    }
    for (const iid of t.influencedBy || []) {
      if (!idSet.has(iid)) continue;
      edges.push({ source: iid, target: t.id, type: 'influencedBy' });
    }
  }

  return edges;
}

export function ForceGraph({ theories, width, height, selectedId, onSelect }) {
  const navigate = useNavigate();
  const svgRef = useRef(null);
  const isMobile = width < 600;

  // Zoom / pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const panRef = useRef(null); // { startX, startY, origPanX, origPanY }

  // Drag state
  const dragRef = useRef(null); // { id }

  // Tooltip
  const [tooltip, setTooltip] = useState(null);

  // Build edges
  const edges = useMemo(() => buildEdges(theories), [theories]);

  // Theory map for lookup
  const theoryMap = useMemo(() => {
    const m = {};
    theories.forEach((t) => { m[t.id] = t; });
    return m;
  }, [theories]);

  // Run simulation
  const { positions, pinNode, unpinNode } = useForceSimulation(theories, edges, width, height);

  // Position lookup
  const posMap = useMemo(() => {
    const m = {};
    positions.forEach((p) => { m[p.id] = p; });
    return m;
  }, [positions]);

  // Connected ids for selected node
  const connectedIds = useMemo(() => {
    if (!selectedId) return new Set();
    const ids = new Set();
    edges.forEach((e) => {
      if (e.source === selectedId) ids.add(e.target);
      if (e.target === selectedId) ids.add(e.source);
    });
    return ids;
  }, [selectedId, edges]);

  // Convert screen coords to SVG user-space
  const screenToSvg = useCallback((clientX, clientY) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: (clientX - rect.left - pan.x) / zoom,
      y: (clientY - rect.top - pan.y) / zoom,
    };
  }, [pan, zoom]);

  // --- Event handlers ---

  function handleWheel(e) {
    e.preventDefault();
    setZoom((z) => Math.max(0.3, Math.min(3, z - e.deltaY * 0.001)));
  }

  function handlePointerDown(e, nodeId) {
    e.stopPropagation();
    if (nodeId) {
      // Start drag
      dragRef.current = { id: nodeId };
      const { x, y } = screenToSvg(e.clientX, e.clientY);
      pinNode(nodeId, x, y);
      svgRef.current?.setPointerCapture(e.pointerId);
    }
  }

  function handleBackgroundDown(e) {
    if (dragRef.current) return;
    // Start pan
    panRef.current = { startX: e.clientX, startY: e.clientY, origPanX: pan.x, origPanY: pan.y };
    svgRef.current?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (dragRef.current) {
      const { x, y } = screenToSvg(e.clientX, e.clientY);
      pinNode(dragRef.current.id, x, y);
    } else if (panRef.current) {
      const dx = e.clientX - panRef.current.startX;
      const dy = e.clientY - panRef.current.startY;
      setPan({ x: panRef.current.origPanX + dx, y: panRef.current.origPanY + dy });
    }
  }

  function handlePointerUp() {
    if (dragRef.current) {
      unpinNode(dragRef.current.id);
      dragRef.current = null;
    }
    panRef.current = null;
  }

  function handleNodeClick(e, nodeId) {
    e.stopPropagation();
    // Don't select if we were dragging
    if (dragRef.current) return;
    onSelect(selectedId === nodeId ? null : nodeId);
  }

  function handleNodeDblClick(e, nodeId) {
    e.stopPropagation();
    navigate(`/idea/${nodeId}`);
  }

  function handleBackgroundClick() {
    if (!panRef.current) {
      onSelect(null);
    }
  }

  function handleMouseEnter(e, nodeId) {
    const t = theoryMap[nodeId];
    if (!t) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      id: nodeId,
      name: t.name,
      person: t.person,
      era: t.era,
      summary: t.shortSummary,
      x: e.clientX - rect.left + 12,
      y: e.clientY - rect.top - 8,
    });
  }

  function handleMouseLeave() {
    setTooltip(null);
  }

  return (
    <div className="force-graph" style={{ width, height, position: 'relative' }}>
      <svg
        ref={svgRef}
        className={`force-graph__svg${dragRef.current ? ' force-graph__svg--dragging' : ''}`}
        width={width}
        height={height}
        onWheel={handleWheel}
        onPointerDown={handleBackgroundDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleBackgroundClick}
      >
        <defs>
          <marker
            id="arrow-influence"
            viewBox="0 0 10 10"
            refX="28"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#999" />
          </marker>
        </defs>

        <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
          {/* Edges */}
          {edges.map((edge) => {
            const sp = posMap[edge.source];
            const tp = posMap[edge.target];
            if (!sp || !tp) return null;

            const isDimmed = selectedId && selectedId !== edge.source && selectedId !== edge.target;
            let strokeProps = {};
            if (edge.type === 'related') {
              strokeProps = { stroke: '#9e9e9e', strokeWidth: 1.2, strokeDasharray: 'none' };
            } else if (edge.type === 'contradicts') {
              strokeProps = { stroke: '#e74c3c', strokeWidth: 1.8, strokeDasharray: '6 4' };
            } else if (edge.type === 'influencedBy') {
              strokeProps = { stroke: '#aaa', strokeWidth: 1.2, strokeDasharray: '3 3', markerEnd: 'url(#arrow-influence)' };
            }

            return (
              <line
                key={`${edge.source}-${edge.target}-${edge.type}`}
                x1={sp.x}
                y1={sp.y}
                x2={tp.x}
                y2={tp.y}
                {...strokeProps}
                opacity={isDimmed ? 0.08 : 0.5}
                style={{ transition: 'opacity 0.3s' }}
              />
            );
          })}

          {/* Nodes */}
          {positions.map((pos) => {
            const theory = theoryMap[pos.id];
            if (!theory) return null;
            const theme = getThemeForRegion(theory.region);
            const isSelected = selectedId === pos.id;
            const isConnected = selectedId && connectedIds.has(pos.id);
            const isDimmed = selectedId && !isSelected && !isConnected;
            const baseR = isMobile ? 20 : 16;
            const r = isSelected ? baseR + 6 : baseR;

            return (
              <g
                key={pos.id}
                transform={`translate(${pos.x},${pos.y})`}
                opacity={isDimmed ? 0.12 : 1}
                style={{ cursor: 'grab', transition: 'opacity 0.3s' }}
                onPointerDown={(e) => handlePointerDown(e, pos.id)}
                onClick={(e) => handleNodeClick(e, pos.id)}
                onDoubleClick={(e) => handleNodeDblClick(e, pos.id)}
                onMouseEnter={(e) => handleMouseEnter(e, pos.id)}
                onMouseLeave={handleMouseLeave}
              >
                <circle
                  r={r}
                  fill={theme.accent}
                  stroke={isSelected ? theme.primary : '#fff'}
                  strokeWidth={isSelected ? 3 : 2}
                />
                <text
                  y={-r - 6}
                  textAnchor="middle"
                  className="force-graph__label"
                  fill={isDimmed ? '#ccc' : theme.primary}
                >
                  {theory.person.split(' ').pop()}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="force-graph__tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="force-graph__tooltip-name">{tooltip.name}</div>
          <div className="force-graph__tooltip-person">{tooltip.person} &middot; {tooltip.era}</div>
          <div className="force-graph__tooltip-summary">{tooltip.summary}</div>
          <div
            className="force-graph__tooltip-link"
            onClick={() => navigate(`/idea/${tooltip.id}`)}
          >
            View details &rarr;
          </div>
        </div>
      )}
    </div>
  );
}
