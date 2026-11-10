import React from 'react';
import { SECRET_WORD, SECRET_WORD_TRANSLATION_HY } from './questionsData';
import { Trophy, HelpCircle, Sparkles } from 'lucide-react';

interface WordBoardProps {
  revealedLetters: Set<string>;
  onGuessWholeWordModal: () => void;
  isWordCompleted: boolean;
}

export const WordBoard: React.FC<WordBoardProps> = ({
  revealedLetters,
  onGuessWholeWordModal,
  isWordCompleted,
}) => {
  const letters = SECRET_WORD.split('');

  // Count how many unique letters revealed
  const uniqueSecretLetters = new Set(letters);
  const revealedUniqueCount = Array.from(uniqueSecretLetters).filter((l) =>
    revealedLetters.has(l)
  ).length;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-amber-950/30 p-5 md:p-6 border border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.12)]">
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          <h2 className="text-sm uppercase tracking-wider font-bold text-amber-300">
            ՏԱԽՏԱԿ «ՊՈԼԵ ՉՈՒԴԵՍ» · ТАБЛО ПОЛЕ ЧУДЕС
          </h2>
        </div>

        <div className="flex items-center gap-3 text-xs text-amber-200/80">
          <span className="font-medium">
            Տառեր՝ <strong className="text-amber-300 font-bold tabular-nums">{revealedUniqueCount} / {uniqueSecretLetters.size}</strong>
          </span>
          <span className="text-amber-500/40">|</span>
          <span>Գաղտնի բառ՝ <strong>8 տառ</strong></span>
        </div>
      </div>

      {/* Secret Word Tiles Showcase */}
      <div className="py-6 flex flex-col items-center">
        <div className="text-center mb-3">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">
            Главное слово / Գլխավոր բառը (Ֆուտբոլային տերմին)
          </p>
        </div>

        {/* 8 Letter Tiles */}
        <div className="grid grid-cols-8 gap-1.5 sm:gap-2.5 max-w-full">
          {letters.map((letter, idx) => {
            const isRevealed = revealedLetters.has(letter) || isWordCompleted;

            return (
              <div
                key={idx}
                className="flex flex-col items-center gap-1 group select-none"
              >
                {/* Letter Index Badge */}
                <span className="text-[10px] font-mono text-amber-400/70 font-semibold">
                  {idx + 1}
                </span>

                {/* 3D Tile Container */}
                <div className="w-9 h-13 sm:w-12 sm:h-16 md:w-14 md:h-18 perspective-1000">
                  <div
                    className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                      isRevealed ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front: Closed Pole Chudes Tile */}
                    <div className="absolute inset-0 backface-hidden rounded-lg bg-gradient-to-br from-amber-600 via-amber-800 to-amber-950 border-2 border-amber-400/80 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded border border-amber-300/40 bg-amber-950/40 flex items-center justify-center">
                        <span className="text-amber-200/50 text-xs font-black">★</span>
                      </div>
                    </div>

                    {/* Back: Revealed Letter Tile */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg bg-gradient-to-b from-emerald-600 via-emerald-800 to-slate-900 border-2 border-amber-300 shadow-[inset_0_2px_6px_rgba(255,255,255,0.4),0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center">
                      <span className="text-xl sm:text-2xl md:text-3xl font-black text-amber-100 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans">
                        {letter}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Translation Banner when guessed / hint info */}
        {isWordCompleted ? (
          <div className="mt-5 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center animate-pulse">
            <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm sm:text-base">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>PORTERIA = {SECRET_WORD_TRANSLATION_HY} (Դարպաս)</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xs text-emerald-200/80 mt-1">
              Շնորհավորո՜ւմ ենք, բառն ամբողջությամբ գուշակված է։
            </p>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <button
              onClick={onGuessWholeWordModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-200 font-semibold transition-all hover:scale-[1.02] cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Անվանել ամբողջ բառը / Adivinar palabra</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
