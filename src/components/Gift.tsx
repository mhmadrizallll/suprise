export default function Gift({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h2>🎁 Gift</h2>

      <p>Aku punya sesuatu buat kamu...</p>

      <button onClick={onNext}>Buka →</button>
    </div>
  );
}
