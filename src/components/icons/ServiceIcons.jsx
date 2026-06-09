/* Custom SVG icons for Protozap fabrication services */

const defaultProps = { size: 32, color: 'currentColor', className: '' }

export function LaserCuttingIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Sheet with cut line */}
      <rect x="4" y="8" width="24" height="16" rx="1.5" stroke={color} strokeWidth="1.8" fill="none"/>
      {/* Laser beam path */}
      <line x1="4" y1="16" x2="13" y2="16" stroke={color} strokeWidth="1.6" strokeDasharray="2 1.5"/>
      <line x1="19" y1="16" x2="28" y2="16" stroke={color} strokeWidth="1.6" strokeDasharray="2 1.5"/>
      {/* Laser focal point spark */}
      <circle cx="16" cy="16" r="2" fill={color}/>
      <line x1="16" y1="11" x2="16" y2="13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="18.5" x2="16" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11.5" y1="16" x2="13.5" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18.5" y1="16" x2="20.5" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Spark diagonals */}
      <line x1="12.9" y1="12.9" x2="14.4" y2="14.4" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="17.6" y1="17.6" x2="19.1" y2="19.1" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="19.1" y1="12.9" x2="17.6" y2="14.4" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="14.4" y1="17.6" x2="12.9" y2="19.1" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

export function BrakeBendingIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Flat portion of sheet */}
      <line x1="4" y1="22" x2="16" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      {/* Bent-up flange */}
      <line x1="16" y1="22" x2="26" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      {/* Bend radius arc */}
      <path d="M13 22 Q16 22 18.5 18.5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Dimension arrows */}
      <line x1="4" y1="26" x2="16" y2="26" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      <line x1="4" y1="24.5" x2="4" y2="27.5" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      <line x1="16" y1="24.5" x2="16" y2="27.5" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      {/* Angle indicator */}
      <path d="M22 16 A6 6 0 0 1 16 22" stroke={color} strokeWidth="1" fill="none" strokeDasharray="1.5 1.5"/>
    </svg>
  )
}

export function TubeBendingIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Horizontal tube section */}
      <line x1="4" y1="11" x2="16" y2="11" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="4" y1="15" x2="16" y2="15" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Tube end cap left */}
      <line x1="4" y1="11" x2="4" y2="15" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      {/* Bend arc - outer */}
      <path d="M16 11 Q22 11 22 17 L22 28" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Bend arc - inner */}
      <path d="M16 15 Q18 15 18 17 L18 28" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Tube end cap bottom */}
      <line x1="18" y1="28" x2="22" y2="28" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      {/* CNC tick marks */}
      <line x1="8" y1="9.5" x2="8" y2="7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="9.5" x2="12" y2="7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

export function HardwareInsertionIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Sheet */}
      <rect x="4" y="18" width="24" height="6" rx="1" stroke={color} strokeWidth="1.8" fill="none"/>
      {/* Hole in sheet */}
      <circle cx="16" cy="21" r="2.5" stroke={color} strokeWidth="1.5" fill="none"/>
      {/* PEM fastener body */}
      <rect x="13.5" y="7" width="5" height="10" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Fastener head */}
      <rect x="12" y="5" width="8" height="3" rx="0.8" stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Knurled lines on fastener */}
      <line x1="14.5" y1="9" x2="14.5" y2="16" stroke={color} strokeWidth="0.8" strokeDasharray="1.2 1.2"/>
      <line x1="16" y1="9" x2="16" y2="16" stroke={color} strokeWidth="0.8" strokeDasharray="1.2 1.2"/>
      <line x1="17.5" y1="9" x2="17.5" y2="16" stroke={color} strokeWidth="0.8" strokeDasharray="1.2 1.2"/>
      {/* Insertion arrow */}
      <line x1="16" y1="17" x2="16" y2="18.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export function PowderCoatingIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Spray gun body */}
      <rect x="4" y="13" width="10" height="6" rx="1.5" stroke={color} strokeWidth="1.6" fill="none"/>
      {/* Gun handle */}
      <path d="M8 19 L7 25 L11 25 L12 19" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      {/* Nozzle */}
      <line x1="14" y1="16" x2="17" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      {/* Spray particles */}
      <circle cx="21" cy="12" r="1" fill={color}/>
      <circle cx="24" cy="15" r="1.2" fill={color}/>
      <circle cx="22" cy="18" r="0.9" fill={color}/>
      <circle cx="25" cy="20" r="0.8" fill={color}/>
      <circle cx="27" cy="13" r="0.7" fill={color}/>
      <circle cx="19" cy="19" r="0.8" fill={color}/>
      <circle cx="26" cy="17" r="1" fill={color}/>
      <circle cx="23" cy="22" r="0.7" fill={color}/>
      {/* Part being coated */}
      <rect x="19" y="23" width="10" height="4" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

export function CountersinkingIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Sheet material */}
      <rect x="4" y="18" width="24" height="7" rx="1" stroke={color} strokeWidth="1.8" fill="none"/>
      {/* Countersink profile - V-shape */}
      <path d="M10 18 L16 24 L22 18" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
      {/* Drill bit shaft */}
      <line x1="16" y1="5" x2="16" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      {/* Drill bit tip */}
      <path d="M13 16 L16 20 L19 16" stroke={color} strokeWidth="1.6" fill="none" strokeLinejoin="round"/>
      {/* Flute lines */}
      <line x1="14.5" y1="7" x2="16" y2="15" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      <line x1="17.5" y1="7" x2="16" y2="15" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      {/* Angle marks */}
      <line x1="10" y1="18" x2="8" y2="16" stroke={color} strokeWidth="1" strokeLinecap="round"/>
      <line x1="22" y1="18" x2="24" y2="16" stroke={color} strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

export function TubeCuttingIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Tube body */}
      <rect x="4" y="13" width="24" height="6" rx="3" stroke={color} strokeWidth="1.8" fill="none"/>
      {/* Tube end ellipses */}
      <ellipse cx="4" cy="16" rx="1.5" ry="3" stroke={color} strokeWidth="1.5" fill="none"/>
      <ellipse cx="28" cy="16" rx="1.5" ry="3" stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Cut line */}
      <line x1="16" y1="10" x2="16" y2="22" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="1.5 1.5"/>
      {/* Laser / cutting sparks */}
      <line x1="13" y1="8" x2="15" y2="11" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="19" y1="8" x2="17" y2="11" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="11" y1="10" x2="14" y2="12" stroke={color} strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

export function TappingIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Tap tool handle */}
      <rect x="12" y="4" width="8" height="4" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Tap body */}
      <rect x="14" y="8" width="4" height="12" rx="0.5" stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Thread lines on tap */}
      <line x1="13.5" y1="10" x2="18.5" y2="10" stroke={color} strokeWidth="0.9"/>
      <line x1="13.5" y1="12" x2="18.5" y2="12" stroke={color} strokeWidth="0.9"/>
      <line x1="13.5" y1="14" x2="18.5" y2="14" stroke={color} strokeWidth="0.9"/>
      <line x1="13.5" y1="16" x2="18.5" y2="16" stroke={color} strokeWidth="0.9"/>
      <line x1="13.5" y1="18" x2="18.5" y2="18" stroke={color} strokeWidth="0.9"/>
      {/* Tap tip */}
      <path d="M14 20 L16 24 L18 20" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      {/* Material sheet */}
      <rect x="4" y="24" width="24" height="5" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
      {/* Hole */}
      <line x1="15" y1="24" x2="15" y2="29" stroke={color} strokeWidth="1" strokeDasharray="1 1"/>
      <line x1="17" y1="24" x2="17" y2="29" stroke={color} strokeWidth="1" strokeDasharray="1 1"/>
    </svg>
  )
}

export function DeburringIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Sheet */}
      <rect x="4" y="14" width="24" height="8" rx="1" stroke={color} strokeWidth="1.8" fill="none"/>
      {/* Burr spikes on edge (before) */}
      <line x1="8" y1="14" x2="7" y2="11" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="12" y1="14" x2="11.5" y2="11" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      {/* Deburring tool */}
      <path d="M18 6 L26 10 L24 14 L16 10 Z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      {/* Tool edge detail */}
      <line x1="20" y1="7.5" x2="25" y2="11.5" stroke={color} strokeWidth="0.9"/>
      {/* Motion arrow */}
      <path d="M14 9 L17 11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15.5 8 L17 11 L13.5 11" stroke={color} strokeWidth="1.2" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      {/* Clean edge highlight */}
      <line x1="17" y1="14" x2="26" y2="14" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}

export function BeadBlastingIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Part being blasted */}
      <rect x="16" y="10" width="12" height="16" rx="1.5" stroke={color} strokeWidth="1.8" fill="none"/>
      {/* Bead particles hitting surface */}
      <circle cx="16" cy="13" r="1" fill={color}/>
      <circle cx="16" cy="17" r="1" fill={color}/>
      <circle cx="16" cy="21" r="1" fill={color}/>
      {/* Bead streams */}
      <line x1="4" y1="12" x2="15" y2="13" stroke={color} strokeWidth="1" strokeLinecap="round" strokeDasharray="2 1.5"/>
      <line x1="4" y1="16" x2="15" y2="17" stroke={color} strokeWidth="1" strokeLinecap="round" strokeDasharray="2 1.5"/>
      <line x1="4" y1="20" x2="15" y2="21" stroke={color} strokeWidth="1" strokeLinecap="round" strokeDasharray="2 1.5"/>
      {/* Nozzle */}
      <path d="M2 10 L6 12 L6 14 L2 16 Z" stroke={color} strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
      {/* Scatter particles */}
      <circle cx="18" cy="8" r="0.8" fill={color}/>
      <circle cx="22" cy="7" r="0.7" fill={color}/>
      <circle cx="27" cy="9" r="0.8" fill={color}/>
    </svg>
  )
}

export function TumblingIcon({ size = 32, color = 'currentColor', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Tumbling barrel */}
      <ellipse cx="16" cy="16" rx="11" ry="9" stroke={color} strokeWidth="1.8" fill="none"/>
      <ellipse cx="16" cy="16" rx="11" ry="3" stroke={color} strokeWidth="1.2" fill="none" strokeDasharray="2 1.5"/>
      {/* Rotation arrows */}
      <path d="M5 12 Q4 8 8 6" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M6 6 L8 6 L7 8.5" stroke={color} strokeWidth="1.3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M27 20 Q28 24 24 26" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M26 26 L24 26 L25 23.5" stroke={color} strokeWidth="1.3" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      {/* Parts inside */}
      <rect x="12" y="13" width="3" height="2" rx="0.5" stroke={color} strokeWidth="1" fill="none" transform="rotate(-15 13.5 14)"/>
      <rect x="17" y="15" width="3" height="2" rx="0.5" stroke={color} strokeWidth="1" fill="none" transform="rotate(20 18.5 16)"/>
    </svg>
  )
}

/* Map from slug to icon component */
export const SERVICE_ICON_MAP = {
  'laser-cutting':      LaserCuttingIcon,
  'tube-cutting':       TubeCuttingIcon,
  'bending':            BrakeBendingIcon,
  'cnc-tube-bending':   TubeBendingIcon,
  'hardware-insertion': HardwareInsertionIcon,
  'tapping':            TappingIcon,
  'countersinking':     CountersinkingIcon,
  'deburring':          DeburringIcon,
  'bead-blasting':      BeadBlastingIcon,
  'tumbling':           TumblingIcon,
  'powder-coating':     PowderCoatingIcon,
}

export function ServiceIcon({ slug, size = 32, color = 'currentColor', className = '' }) {
  const Icon = SERVICE_ICON_MAP[slug]
  if (!Icon) return null
  return <Icon size={size} color={color} className={className} />
}
