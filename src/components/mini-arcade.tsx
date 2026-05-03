import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Locale, translations } from "@/utility/translations";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="flex h-full w-full max-w-md flex-col items-center justify-between rounded-xl border border-[#1e8e94]/20 bg-background/50 p-6 shadow-md dark:bg-zinc-800/50">
      <div className="flex flex-col items-center">
        <h3 className="mb-4 text-2xl font-bold text-[#1e8e94]">Tic Tac Toe</h3>
        <div className="mb-4 min-h-[28px] text-lg font-semibold text-foreground">
          {winner ? (
            <span
              className={winner === "X" ? "text-[#1e8e94]" : "text-foreground"}
            >
              Winner: {winner}
            </span>
          ) : isDraw ? (
            "It's a Draw!"
          ) : (
            `Next Player: ${xIsNext ? "X" : "O"}`
          )}
        </div>
      </div>
      <div className="my-2 grid grid-cols-3 gap-2">
        {board.map((value, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="flex h-20 w-20 items-center justify-center rounded-md bg-[#1e8e94]/10 text-4xl font-bold text-foreground transition-colors hover:bg-[#1e8e94]/20 dark:bg-[#1e8e94]/20 dark:hover:bg-[#1e8e94]/30 sm:h-24 sm:w-24"
          >
            {value && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={value === "X" ? "text-[#1e8e94]" : "text-foreground"}
              >
                {value}
              </motion.span>
            )}
          </button>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-6 rounded-full bg-[#1e8e94] px-6 py-2 font-semibold text-background transition-transform hover:scale-105"
      >
        Restart Game
      </button>
    </div>
  );
}

function CoinFlip() {
  const [result, setResult] = useState<"Heads" | "Tails" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);

  const flip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setFlipCount((c) => c + 1);

    setTimeout(() => {
      setResult(Math.random() > 0.5 ? "Heads" : "Tails");
      setIsFlipping(false);
    }, 1200);
  };

  return (
    <div className="flex h-full w-full max-w-md flex-col items-center justify-between rounded-xl border border-[#1e8e94]/20 bg-background/50 p-6 shadow-md dark:bg-zinc-800/50">
      <div className="flex flex-col items-center">
        <h3 className="mb-4 text-2xl font-bold text-[#1e8e94]">Coin Flip</h3>
        <div className="mb-2 min-h-[28px] text-lg font-semibold text-foreground">
          {isFlipping ? (
            <span className="animate-pulse">Flipping...</span>
          ) : result ? (
            `Result: ${result}`
          ) : (
            "Ready to flip!"
          )}
        </div>
      </div>

      <div className="perspective-[1000px] relative my-10 flex h-32 w-32 items-center justify-center">
        <motion.div
          animate={{
            rotateY: isFlipping
              ? flipCount * 360 * 3 + 1080
              : flipCount * 360 * 3,
          }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 50,
            damping: 15,
          }}
          className="relative flex h-32 w-32 items-center justify-center rounded-full border-[6px] border-background bg-[#1e8e94] shadow-xl ring-4 ring-[#1e8e94]/20"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span
            className="absolute text-6xl font-bold text-background"
            style={{ backfaceVisibility: "hidden" }}
          >
            {result === "Tails" ? "T" : "H"}
          </span>
          <span
            className="absolute text-6xl font-bold text-background"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {result === "Tails" ? "H" : "T"}
          </span>
        </motion.div>
      </div>

      <button
        onClick={flip}
        disabled={isFlipping}
        className="mt-6 rounded-full bg-[#1e8e94] px-6 py-2 font-semibold text-background transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
      >
        Flip Coin
      </button>
    </div>
  );
}

const EMOJIS = ["🚀", "🌟", "💻", "🍕", "🎉", "🎸"];

function MemoryMatch() {
  const [cards, setCards] = useState<
    { id: number; emoji: string; isFlipped: boolean; isMatched: boolean }[]
  >([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initializeGame = () => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS].sort(
      () => Math.random() - 0.5,
    );
    setCards(
      shuffledEmojis.map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      })),
    );
    setFlippedIndices([]);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    )
      return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlippedIndices;
      if (newCards[first].emoji === newCards[second].emoji) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          setCards((prevCards) => {
            const resetCards = [...prevCards];
            resetCards[first] = { ...resetCards[first], isFlipped: false };
            resetCards[second] = { ...resetCards[second], isFlipped: false };
            return resetCards;
          });
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  const isWin = cards.length > 0 && cards.every((c) => c.isMatched);

  return (
    <div className="flex h-full w-full max-w-md flex-col items-center justify-between rounded-xl border border-[#1e8e94]/20 bg-background/50 p-6 shadow-md dark:bg-zinc-800/50">
      <div className="flex flex-col items-center">
        <h3 className="mb-2 text-2xl font-bold text-[#1e8e94]">Memory Match</h3>
        <p className="mb-2 text-sm font-medium text-muted-foreground">
          Find the pairs!
        </p>
        <div className="mb-4 min-h-[24px] font-semibold text-foreground">
          {isWin ? (
            <span className="animate-pulse text-[#1e8e94]">
              You won in {moves} moves!
            </span>
          ) : (
            `Moves: ${moves}`
          )}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            className={`perspective-[1000px] flex h-16 w-16 items-center justify-center rounded-md text-3xl shadow-sm transition-all duration-300 sm:h-[72px] sm:w-[72px]`}
          >
            <motion.div
              initial={false}
              animate={{ rotateY: card.isFlipped || card.isMatched ? 0 : 180 }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative flex h-full w-full items-center justify-center rounded-md"
            >
              <div
                className="absolute flex h-full w-full items-center justify-center rounded-md bg-[#1e8e94]/20 dark:bg-[#1e8e94]/30"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
              >
                {card.emoji}
              </div>
              <div
                className="absolute flex h-full w-full items-center justify-center rounded-md bg-[#1e8e94] text-background hover:bg-[#1e8e94]/90"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <span className="font-bold opacity-80">?</span>
              </div>
            </motion.div>
          </button>
        ))}
      </div>
      <button
        onClick={initializeGame}
        className="mt-2 rounded-full bg-[#1e8e94] px-6 py-2 font-semibold text-background transition-transform hover:scale-105"
      >
        Restart Game
      </button>
    </div>
  );
}

export default function MiniArcade() {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const t = translations[locale].events;

  return (
    <div className="mx-auto mt-20 max-w-7xl border-t border-[#1e8e94]/20 px-6 pt-10 sm:px-14 md:px-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          {t.miniArcadeTitle}
        </h2>
        <p className="mt-4 text-muted-foreground">{t.miniArcadeDesc}</p>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        <TicTacToe />
        <CoinFlip />
        <MemoryMatch />
      </div>
    </div>
  );
}
