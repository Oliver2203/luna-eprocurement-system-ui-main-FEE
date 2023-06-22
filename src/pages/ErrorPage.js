import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-5xl text-rose-600 font-bold">
      <div className="">CÓ LỖI TỪ HỆ THỐNG</div>
      <button onClick={returnHome} className="p-4 rounded-lg border-rose-600 text-white text-lg bg-rose-600 mt-4">
        Return Home
      </button>
    </div>
  );
}

export default ErrorPage;
