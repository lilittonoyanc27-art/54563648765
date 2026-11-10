/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  QUESTIONS_DATA,
  SECRET_WORD,
  SECRET_WORD_TRANSLATION_HY,
  SECRET_WORD_MEANING,
  QuestionItem,
} from './questionsData';
import { sound } from './sound';
import { WordBoard } from './WordBoard';
import { DrumWheel, Sector, SECTORS } from './DrumWheel';
import {
  Trophy,
  Volume2,
  VolumeX,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Eye,
  Languages,
  Award,
} from 'lucide-react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [revealedLetters, setRevealedLetters] = useState<Set<string>>(new Set());
  const [triedLetters, setTriedLetters] = useState<Set<string>>(new Set());
  const [isWordCompleted, setIsWordCompleted] = useState<boolean>(false);

  // Wheel sector for current round
  const [currentSector, setCurrentSector] = useState<Sector | null>(SECTORS[0]);

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);

  // Armenian translations reveal toggles (per question and per option)
  const [questionArmenianRevealed, setQuestionArmenianRevealed] = useState<boolean>(false);
  const [revealedOptionsArmenian, setRevealedOptionsArmenian] = useState<Record<string, boolean>>({});

  // Letter picking state
  const [canPickLetter, setCanPickLetter] = useState<boolean>(false);
  const [lastPickedLetterMsg, setLastPickedLetterMsg] = useState<{
    letter: string;
    found: boolean;
    count: number;
  } | null>(null);

  // Whole word guess modal
  const [showGuessModal, setShowGuessModal] = useState<boolean>(false);
  const [guessInput, setGuessInput] = useState<string>('');
  const [guessError, setGuessError] = useState<string>('');

  // Vocabulary & Review drawer
  const [showVocabModal, setShowVocabModal] = useState<boolean>(false);

  // Sound mute
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Global game completion
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  const currentQ: QuestionItem = QUESTIONS_DATA[currentQuestionIndex];
  const totalQuestions = QUESTIONS_DATA.length;

  // Check if secret word is fully revealed
  useEffect(() => {
    const secretLetterSet = new Set(SECRET_WORD.split(''));
    let allFound = true;
    for (const l of secretLetterSet) {
      if (!revealedLetters.has(l)) {
        allFound = false;
        break;
      }
    }
    if (allFound && !isWordCompleted && revealedLetters.size > 0) {
      setIsWordCompleted(true);
      sound.playFanfare();
      triggerConfetti();
    }
  }, [revealedLetters, isWordCompleted]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // silent
    }
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  // Option select
  const handleSelectOption = (optId: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optId);
    sound.playTick();
  };

  // Click on question to reveal Armenian translation
  const toggleQuestionArmenian = () => {
    setQuestionArmenianRevealed((prev) => !prev);
    sound.playTick();
  };

  // Click on option to reveal Armenian translation
  const toggleOptionArmenian = (optId: string) => {
    setRevealedOptionsArmenian((prev) => ({
      ...prev,
      [optId]: !prev[optId],
    }));
    sound.playTick();
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;

    const correct = selectedOption === currentQ.correctAnswer;
    setIsAnswerSubmitted(true);
    setIsAnswerCorrect(correct);

    // Also reveal all translations on submit so player can review fully
    setQuestionArmenianRevealed(true);
    setRevealedOptionsArmenian({ A: true, B: true, C: true, D: true });

    if (correct) {
      sound.playCorrect();
      setCorrectCount((prev) => prev + 1);

      // Calculate score based on drum sector
      let pointsWon = 200; // Base points
      if (currentSector) {
        if (currentSector.type === 'points') {
          pointsWon = currentSector.value;
        } else if (currentSector.type === 'x2') {
          pointsWon = 400;
        } else if (currentSector.type === 'prize') {
          pointsWon = 700;
        } else if (currentSector.type === 'bankrupt') {
          pointsWon = 50;
        } else if (currentSector.type === 'plus') {
          pointsWon = 300;
        }
      }
      setScore((prev) => prev + pointsWon);

      // If word is not finished, enable letter picking
      if (!isWordCompleted) {
        setCanPickLetter(true);
      }
    } else {
      sound.playWrong();
      // If answer is incorrect, player doesn't get to pick a letter,
      // but continues playing!
      setCanPickLetter(false);
    }
  };

  // Pick Letter from alphabet (without hints)
  const handlePickLetter = (letter: string) => {
    if (triedLetters.has(letter) || isWordCompleted) return;

    const newTried = new Set(triedLetters);
    newTried.add(letter);
    setTriedLetters(newTried);

    const secretLetters = SECRET_WORD.split('');
    const count = secretLetters.filter((l) => l === letter).length;

    if (count > 0) {
      // Letter exists in PORTERIA!
      sound.playLetterReveal();
      const newRevealed = new Set(revealedLetters);
      newRevealed.add(letter);
      setRevealedLetters(newRevealed);
      setScore((prev) => prev + count * 150);

      setLastPickedLetterMsg({
        letter,
        found: true,
        count,
      });

      // Check if that completed the word
      const allDone = secretLetters.every((l) => newRevealed.has(l));
      if (allDone) {
        setIsWordCompleted(true);
        sound.playFanfare();
        triggerConfetti();
      }
    } else {
      // Letter not in word
      sound.playWrong();
      setLastPickedLetterMsg({
        letter,
        found: false,
        count: 0,
      });
    }

    // Finished letter picking for this turn
    setCanPickLetter(false);
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setIsAnswerCorrect(false);
      setCanPickLetter(false);
      setLastPickedLetterMsg(null);
      setQuestionArmenianRevealed(false);
      setRevealedOptionsArmenian({});
    } else {
      setIsGameFinished(true);
      sound.playFanfare();
      triggerConfetti();
    }
  };

  // Whole word guess submit
  const handleGuessWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanGuess = guessInput.trim().toUpperCase();

    if (cleanGuess === SECRET_WORD) {
      // Correct whole word guessed!
      sound.playFanfare();
      triggerConfetti();
      setIsWordCompleted(true);
      const allLetters = new Set(SECRET_WORD.split(''));
      setRevealedLetters(allLetters);
      setScore((prev) => prev + 1500);
      setShowGuessModal(false);
      setGuessInput('');
      setGuessError('');
    } else {
      sound.playWrong();
      setGuessError('Սխալ բառ է: Փորձեք կրկին: / ¡Palabra incorrecta! Inténtalo de nuevo.');
    }
  };

  // Restart game
  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectCount(0);
    setRevealedLetters(new Set());
    setTriedLetters(new Set());
    setIsWordCompleted(false);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(false);
    setCanPickLetter(false);
    setLastPickedLetterMsg(null);
    setQuestionArmenianRevealed(false);
    setRevealedOptionsArmenian({});
    setIsGameFinished(false);
    setShowGuessModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Top Bar Contract (1 line brand, nav items, primary action) */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-slate-950 text-base shadow-[0_0_12px_rgba(245,158,11,0.4)]">
            ⚽
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight text-amber-100 whitespace-nowrap">
            Fútbol Español · Պոլե Չուդես
          </span>
        </div>

        {/* Score & Controls Zone */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 font-medium">Միավորներ՝</span>
            <span className="font-bold text-amber-300 font-mono tabular-nums">{score}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
            <span className="text-slate-400 font-medium">Հարց՝</span>
            <span className="font-bold text-emerald-400 font-mono tabular-nums">
              {currentQuestionIndex + 1}/{totalQuestions}
            </span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Միացնել ձայնը' : 'Անջատել ձայնը'}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Vocabulary Review Action */}
          <button
            onClick={() => setShowVocabModal(true)}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>20 ֆուտբոլային բառարան</span>
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* 1. Pole Chudes Word Board for PORTERIA */}
        <section aria-label="Табло Поле Чудес">
          <WordBoard
            revealedLetters={revealedLetters}
            onGuessWholeWordModal={() => setShowGuessModal(true)}
            isWordCompleted={isWordCompleted}
          />
        </section>

        {/* 2. Interactive Letter Pick Notification Bar if User Answered Correctly */}
        {canPickLetter && !isWordCompleted && (
          <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950/60 p-5 rounded-2xl border-2 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.2)] animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-emerald-200 text-sm sm:text-base">
                    Ճիշտ պատասխան! Բացե՛ք տառ ցուցակից (¡Respuesta correcta!)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Ինքնուրույն ընտրեք տառ՝ առանց հուշումների (PORTERIA բառի համար):
                  </p>
                </div>
              </div>
            </div>

            {/* Alphabet letter list */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center pt-2">
              {ALPHABET.map((char) => {
                const isTried = triedLetters.has(char);
                const isHit = revealedLetters.has(char);

                return (
                  <button
                    key={char}
                    onClick={() => handlePickLetter(char)}
                    disabled={isTried}
                    className={`w-9 h-10 sm:w-10 sm:h-11 rounded-lg font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-center ${
                      isTried
                        ? isHit
                          ? 'bg-emerald-900/50 text-emerald-300 border border-emerald-600/50 opacity-60 cursor-not-allowed'
                          : 'bg-slate-800 text-slate-600 border border-slate-700 opacity-40 cursor-not-allowed'
                        : 'bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 border border-amber-300 shadow-md hover:scale-105 active:scale-95'
                    }`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Feedback on Last Picked Letter */}
        {lastPickedLetterMsg && (
          <div
            className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${
              lastPickedLetterMsg.found
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/30 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {lastPickedLetterMsg.found ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>
                {lastPickedLetterMsg.found
                  ? `Հիանալի՜ է! «${lastPickedLetterMsg.letter}» տառը առկա է բառում (${lastPickedLetterMsg.count} հատ): Տախտակը բացվեց!`
                  : `«${lastPickedLetterMsg.letter}» տառը բառում չկա: Խաղը շարունակվում է:`}
              </span>
            </div>
            <button
              onClick={() => setLastPickedLetterMsg(null)}
              className="text-xs opacity-75 hover:opacity-100 underline cursor-pointer"
            >
              Փակել
            </button>
          </div>
        )}

        {/* 3. Two-Column Workspace: Left Drum Wheel / Right Question Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Drum / Wheel Panel (4 columns on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <DrumWheel
              onSpinEnd={(sector) => setCurrentSector(sector)}
              currentSector={currentSector}
              disabled={isAnswerSubmitted}
            />

            {/* Word details / Help snippet */}
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Ինչպե՞ս խաղալ (Reglas del juego)</span>
              </div>
              <p>
                1. <strong>Սեղմեք իսպաներեն հարցի կամ տարբերակի վրա</strong>՝ հայերեն թարգմանությունը տեսնելու համար:
              </p>
              <p>
                2. <strong>Ընտրեք պատասխանը</strong>: Ճիշտ պատասխանի դեպքում դուք իրավունք եք ստանում ինքնուրույն բացել տառ՝ գաղտնի բառից (առանց հուշումների):
              </p>
              <p>
                3. Եթե պատասխանը սխալ է, <strong>խաղը շարունակվում է</strong>՝ անցնելով հաջորդ հարցերին:
              </p>
            </div>
          </div>

          {/* Question & Options Card (8 columns on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-5 bg-slate-900/80 rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-xl">
            {/* Question Progress & Indicator */}
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-400 font-mono uppercase tracking-wider">
                  Հարց #{currentQ.id} / 20
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">20 preguntas sobre fútbol</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">Ճիշտ պատասխաններ՝</span>
                <span className="font-bold text-emerald-400 font-mono tabular-nums">
                  {correctCount}
                </span>
              </div>
            </div>

            {/* Question Box (Clickable Spanish with Armenian Translation) */}
            <div className="flex flex-col gap-3">
              <div
                onClick={toggleQuestionArmenian}
                className="group relative p-4 sm:p-5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 transition-all cursor-pointer shadow-inner"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5 mb-1.5">
                      <span>🇪🇸 Español (Սեղմեք թարգմանության համար / Clic para traducir)</span>
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-amber-200 transition-colors leading-relaxed">
                      {currentQ.questionEs}
                    </h3>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-700/50 text-slate-400 group-hover:text-amber-300 transition-colors shrink-0">
                    <Languages className="w-4 h-4" />
                  </div>
                </div>

                {/* Armenian Translation revealed on click */}
                {questionArmenianRevealed ? (
                  <div className="mt-3 pt-3 border-t border-slate-700 text-amber-200 font-medium text-sm sm:text-base leading-relaxed flex items-start gap-2">
                    <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold shrink-0">
                      🇦🇲 Հայերեն
                    </span>
                    <span>{currentQ.questionHy}</span>
                  </div>
                ) : (
                  <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-amber-400/70" />
                    <span>Սեղմեք այստեղ՝ հարցի հայերեն թարգմանությունը տեսնելու համար</span>
                  </div>
                )}
              </div>
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isRevealed = revealedOptionsArmenian[opt.id] || isAnswerSubmitted;
                const isCorrectOpt = isAnswerSubmitted && opt.id === currentQ.correctAnswer;
                const isWrongSelection = isAnswerSubmitted && isSelected && !isCorrectOpt;

                return (
                  <div
                    key={opt.id}
                    onClick={() => {
                      if (!isAnswerSubmitted) {
                        handleSelectOption(opt.id);
                      } else {
                        toggleOptionArmenian(opt.id);
                      }
                    }}
                    className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                      isCorrectOpt
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : isWrongSelection
                        ? 'bg-rose-950/70 border-rose-500 text-rose-100'
                        : isSelected
                        ? 'bg-amber-950/40 border-amber-400 text-amber-100 ring-1 ring-amber-400/50'
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/70 hover:border-slate-600 text-slate-200'
                    }`}
                  >
                    {/* Option Header & Spanish Text */}
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center shrink-0 ${
                          isCorrectOpt
                            ? 'bg-emerald-500 text-slate-950'
                            : isWrongSelection
                            ? 'bg-rose-500 text-white'
                            : isSelected
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'
                        }`}
                      >
                        {opt.id}
                      </span>

                      <div className="flex-1">
                        <p className="font-semibold text-sm leading-snug">{opt.es}</p>
                      </div>
                    </div>

                    {/* Armenian Translation Box or Click to Reveal Hint */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOptionArmenian(opt.id);
                      }}
                      className="pt-2 border-t border-slate-700/60 text-xs"
                    >
                      {isRevealed ? (
                        <div className="text-amber-200/90 font-medium flex items-center gap-1.5">
                          <span className="text-[10px] text-amber-400 font-bold uppercase">🇦🇲</span>
                          <span>{opt.hy}</span>
                        </div>
                      ) : (
                        <button className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer">
                          <Languages className="w-3 h-3 text-amber-400/80" />
                          <span>Սեղմեք թարգմանության համար</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Answer Explanation Box if Submitted */}
            {isAnswerSubmitted && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm flex flex-col gap-2 ${
                  isAnswerCorrect
                    ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {isAnswerCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Ճիշտ է! (¡Correcto!): {currentQ.correctAnswer}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>Սխալ է: Ճիշտ պատասխանն է {currentQ.correctAnswer})</span>
                    </>
                  )}
                </div>

                <div className="space-y-1 text-slate-200 text-xs">
                  <p><strong>🇪🇸</strong> {currentQ.explanationEs}</p>
                  <p><strong>🇦🇲</strong> {currentQ.explanationHy}</p>
                </div>
              </div>
            )}

            {/* Bottom Controls / Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  setQuestionArmenianRevealed(true);
                  setRevealedOptionsArmenian({ A: true, B: true, C: true, D: true });
                }}
                className="text-xs text-slate-400 hover:text-amber-300 underline cursor-pointer flex items-center gap-1"
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span>Ցույց տալ բոլոր հայերեն թարգմանությունները</span>
              </button>

              <div className="flex items-center gap-3">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOption}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      selectedOption
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-[1.02]'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    Հաստատել պատասխանը
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
                  >
                    <span>{currentQuestionIndex + 1 < totalQuestions ? 'Հաջորդ հարցը' : 'Ավարտել խաղը'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Secret Word Porteria Meaning Card */}
        <section className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-amber-200 text-sm">
                PORTERIA = {SECRET_WORD_TRANSLATION_HY} (Դարպաս)
              </p>
              <p className="text-slate-400 text-xs">
                {SECRET_WORD_MEANING}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowVocabModal(true)}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs transition-colors cursor-pointer shrink-0"
          >
            Բացել բոլոր 20 հարցերի բառարանը
          </button>
        </section>
      </main>

      {/* MODAL 1: Guess Whole Word Modal */}
      {showGuessModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <HelpCircle className="w-5 h-5" />
                <span>Անվանել ամբողջ բառը / Adivinar palabra</span>
              </div>
              <button
                onClick={() => setShowGuessModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Եթե գիտեք գաղտնի բառը (8 տառ), մուտքագրեք այն այստեղ: Ճիշտ լինելու դեպքում կստանաք +1500 բոնուսային միավոր:
            </p>

            <form onSubmit={handleGuessWordSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={guessInput}
                onChange={(e) => {
                  setGuessInput(e.target.value);
                  setGuessError('');
                }}
                placeholder="Օրինակ՝ PORTERIA"
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-200 text-center uppercase tracking-widest font-black text-lg focus:outline-none focus:border-amber-400"
              />

              {guessError && (
                <p className="text-xs text-rose-400 text-center font-medium">{guessError}</p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowGuessModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 cursor-pointer"
                >
                  Չեղարկել
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Ստուգել
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Full Vocabulary & Questions Reference */}
      {showVocabModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-slate-100">
                  20 Ֆուտբոլային հարցերի և տերմինների բառարան (Español ⇄ Հայերեն)
                </h3>
              </div>
              <button
                onClick={() => setShowVocabModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 flex-1 text-xs sm:text-sm">
              {QUESTIONS_DATA.map((q) => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-amber-400 text-xs font-mono">
                      #{q.id}
                    </span>
                    <span className="text-emerald-400 font-semibold text-xs">
                      Պատասխան՝ {q.correctAnswer}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-100">🇪🇸 {q.questionEs}</p>
                  <p className="text-amber-200/90 font-medium">🇦🇲 {q.questionHy}</p>
                  <p className="text-xs text-slate-400 pt-1 border-t border-slate-700/40">
                    💡 {q.explanationHy}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowVocabModal(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs cursor-pointer"
              >
                Փակել
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Game Finish / Victory Modal */}
      {isGameFinished && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center flex flex-col items-center gap-5 shadow-[0_0_50px_rgba(245,158,11,0.3)]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-amber-200 tracking-tight">
                ¡Juego Terminado! · Խաղն ավարտվեց!
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Դուք անցաք ֆուտբոլային բոլոր 20 հարցերը:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-xs text-slate-400">Ընդհանուր միավոր</span>
                <p className="text-xl font-black text-amber-300 font-mono">{score}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-xs text-slate-400">Ճիշտ պատասխաններ</span>
                <p className="text-xl font-black text-emerald-400 font-mono">
                  {correctCount} / 20
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200">
              <p className="font-bold">Գլխավոր բառը՝ PORTERIA ({SECRET_WORD_TRANSLATION_HY})</p>
              <p className="mt-1 text-slate-300">
                {isWordCompleted
                  ? 'Դուք հաջողությամբ գուշակել եք գաղտնի բառը!'
                  : 'Շարունակեք մարզվել և գուշակել բոլոր տառերը:'}
              </p>
            </div>

            <button
              onClick={handleRestartGame}
              className="w-full max-w-xs py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Խաղալ նորից (Jugar de nuevo)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
