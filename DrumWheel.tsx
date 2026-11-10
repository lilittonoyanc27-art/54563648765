import React, { useRef, useState } from 'react';
import { sound } from './sound';
import { RotateCw, Award, Zap, Gift, AlertTriangle } from 'lucide-react';

export interface Sector {
  label: string;
  sublabel?: string;
  type: 'points' | 'plus' | 'prize' | 'x2' | 'bankrupt';
  value: number;
  color: string;
  textColor: string;
}

export const SECTORS: Sector[] = [
  { label: '300', type: 'points', value: 300, color: '#1e3a8a', textColor: '#ffffff' },
  { label: '500', type: 'points', value: 500, color: '#047857', textColor: '#ffffff' },
  { label: '+', sublabel: 'Սեկտոր +', type: 'plus', value: 0, color: '#b45309', textColor: '#fef3c7' },
  { label: '200', type: 'points', value: 200, color: '#4338ca', textColor: '#ffffff' },
  { label: '1000', type: 'points', value: 1000, color: '#ca8a04', textColor: '#000000' },
  { label: 'ПРИЗ', sublabel: 'Մրցանակ', type: 'prize', value: 500, color: '#dc2626', textColor: '#ffffff' },
  { label: '400', type: 'points', value: 400, color: '#0369a1', textColor: '#ffffff' },
  { label: 'х2', sublabel: 'Կրկնակի', type: 'x2', value: 2, color: '#7c3aed', textColor: '#ffffff' },
  { label: '100', type: 'points', value: 100, color: '#334155', textColor: '#ffffff' },
  { label: '600', type: 'points', value: 600, color: '#0f766e', textColor: '#ffffff' },
  { label: '750', type: 'points', value: 750, color: '#d97706', textColor: '#ffffff' },
  { label: '0', sublabel: 'Банкрот', type: 'bankrupt', value: 0, color: '#18181b', textColor: '#ef4444' },
];

interface DrumWheelProps {
  onSpinEnd: (sector: Sector) => void;
  currentSector: Sector | null;
  disabled?: boolean;
}

export const DrumWheel: React.FC<DrumWheelProps> = ({
  onSpinEnd,
  currentSector,
  disabled = false,
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const audioIntervalRef = useRef<number | null>(null);

  const numSectors = SECTORS.length;
  const sectorAngle = 360 / numSectors;

  const handleSpin = () => {
    if (isSpinning || disabled) return;

    setIsSpinning(true);
    sound.playDrumSpin();

    // Random spin: at least 4 full rotations plus random landing
    const extraSpins = 4 + Math.floor(Math.random() * 3);
    const randomAngle = Math.floor(Math.random() * 360);
    const targetRotation = rotation + extraSpins * 360 + randomAngle;

    setRotation(targetRotation);

    // Audio ticks during rotation
    let tickCount = 0;
    const totalTicks = 25;
    const intervalTime = 3000 / totalTicks;

    audioIntervalRef.current = window.setInterval(() => {
      sound.playTick();
      tickCount++;
      if (tickCount >= totalTicks) {
        if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      }
    }, intervalTime);

    // Determine winning sector
    setTimeout(() => {
      setIsSpinning(false);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);

      // The pointer is at top (270 degrees in standard SVG math or 0 at 12 o'clock)
      // Normalize angle to [0, 360)
      const normalizedAngle = (360 - (targetRotation % 360)) % 360;
      const winningIndex = Math.floor(normalizedAngle / sectorAngle) % numSectors;
      const winningSector = SECTORS[winningIndex];

      if (winningSector.type === 'prize' || winningSector.type === 'plus') {
        sound.playFanfare();
      } else {
        sound.playLetterReveal();
      }

      onSpinEnd(winningSector);
    }, 3200);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-2">
          <RotateCw className="w-4 h-4 text-amber-400" />
          <span className="text-xs uppercase font-bold tracking-wider text-slate-300">
            ԲԱՐԱԲԱՆ · БАРАБАН
          </span>
        </div>
        {currentSector && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <span>Սեկտոր՝</span>
            <span className="font-bold">{currentSector.label}</span>
            {currentSector.sublabel && (
              <span className="text-[10px] text-amber-400/80">({currentSector.sublabel})</span>
            )}
          </div>
        )}
      </div>

      {/* Wheel Visual Container */}
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center my-2">
        {/* Pointer Arrow at top */}
        <div className="absolute -top-1.5 z-20 flex flex-col items-center pointer-events-none">
          <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[16px] border-t-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-300 -mt-4.5 border border-amber-600 shadow-sm" />
        </div>

        {/* Rotating SVG Disc */}
        <div
          className="w-full h-full rounded-full shadow-[0_0_25px_rgba(0,0,0,0.6),inset_0_0_15px_rgba(0,0,0,0.5)] border-4 border-amber-600 overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3.2s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none',
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="60%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#78350f" />
              </radialGradient>
            </defs>

            {SECTORS.map((sector, i) => {
              const startAngle = (i * sectorAngle * Math.PI) / 180;
              const endAngle = ((i + 1) * sectorAngle * Math.PI) / 180;
              const x1 = 100 + 100 * Math.cos(startAngle);
              const y1 = 100 + 100 * Math.sin(startAngle);
              const x2 = 100 + 100 * Math.cos(endAngle);
              const y2 = 100 + 100 * Math.sin(endAngle);

              // Text position along middle of wedge
              const midAngle = ((i + 0.5) * sectorAngle * Math.PI) / 180;
              const textR = 68;
              const tx = 100 + textR * Math.cos(midAngle);
              const ty = 100 + textR * Math.sin(midAngle);
              const textRotation = (midAngle * 180) / Math.PI + 90;

              return (
                <g key={i}>
                  {/* Wedge Slice */}
                  <path
                    d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                    fill={sector.color}
                    stroke="#0f172a"
                    strokeWidth="1.5"
                  />
                  {/* Peg on border */}
                  <circle
                    cx={100 + 94 * Math.cos(startAngle)}
                    cy={100 + 94 * Math.sin(startAngle)}
                    r="2"
                    fill="#fbbf24"
                  />
                  {/* Sector Label */}
                  <text
                    x={tx}
                    y={ty}
                    fill={sector.textColor}
                    fontSize={sector.label.length > 3 ? '8' : '10'}
                    fontWeight="800"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textRotation}, ${tx}, ${ty})`}
                  >
                    {sector.label}
                  </text>
                </g>
              );
            })}

            {/* Central Studio Hub */}
            <circle cx="100" cy="100" r="26" fill="url(#hubGrad)" stroke="#451a03" strokeWidth="2" />
            <circle cx="100" cy="100" r="14" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="4" fill="#fbbf24" />
          </svg>
        </div>
      </div>

      {/* Spin Button */}
      <div className="w-full mt-2">
        <button
          onClick={handleSpin}
          disabled={isSpinning || disabled}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
            isSpinning || disabled
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 border border-amber-300 shadow-amber-500/20 hover:scale-[1.02]'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'Թմբուկը պտտվում է...' : 'Պտտել թմբուկը (Крутить барабан)'}</span>
        </button>
      </div>

      {/* Sector Description / Perks */}
      <div className="mt-2 text-[11px] text-slate-400 text-center">
        {currentSector ? (
          <span className="text-amber-300 flex items-center justify-center gap-1">
            {currentSector.type === 'plus' && <Zap className="w-3.5 h-3.5 text-amber-400 inline" />}
            {currentSector.type === 'prize' && <Gift className="w-3.5 h-3.5 text-rose-400 inline" />}
            {currentSector.type === 'x2' && <Award className="w-3.5 h-3.5 text-purple-400 inline" />}
            {currentSector.type === 'bankrupt' && <AlertTriangle className="w-3.5 h-3.5 text-red-400 inline" />}
            {currentSector.type === 'plus'
              ? 'Սեկտոր + ՝ ճիշտ պատասխանի դեպքում կարող եք բացել ցանկացած տառ!'
              : currentSector.type === 'prize'
              ? 'Սեկտոր ПРИЗ ՝ +500 բոնուսային միավոր!'
              : currentSector.type === 'x2'
              ? 'Սեկտոր х2 ՝ կրկնակի միավորներ այս հարցի համար!'
              : currentSector.type === 'bankrupt'
              ? 'Բանկրոտ ՝ այս հարցի համար միավորները 0 են:'
              : `Պարգև՝ +${currentSector.value} միավոր ճիշտ պատասխանի համար:`}
          </span>
        ) : (
          <span>Պտտեք թմբուկը՝ միավորները բազմապատկելու համար</span>
        )}
      </div>
    </div>
  );
};
