export default function Compliment({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h2>✨ Compliment</h2>

      <p>Kamu itu spesial</p>

      <button onClick={onNext}>Selesai →</button>
    </div>
  );
}
