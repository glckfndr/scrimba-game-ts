import Confetti from "react-confetti";

export default function ConfettiContainer({
  isGameWon,
}: {
  isGameWon: boolean;
}) {
  return isGameWon ? <Confetti recycle={false} numberOfPieces={1000} /> : null;
}
