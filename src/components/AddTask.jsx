export default function AddTask({ showInput, taskInputRef, handleKeyPress }) {
  if (!showInput) return null;

  return (
    <div className="mb-4 px-8">
      <input
        ref={taskInputRef}
        type="text"
        placeholder="Tambahkan tugas baru..."
        onKeyPress={handleKeyPress}
        autoFocus
        className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-indigo-400"
      />
    </div>
  );
}
