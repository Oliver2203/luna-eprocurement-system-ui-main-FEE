function PrimaryButton({ onClick, children }) {
  return (
    <button className="h-12 bg-primary mt-4 text-white font-inter rounded-md" onClick={onClick}>
      {children}
    </button>
  );
}

export default PrimaryButton;
