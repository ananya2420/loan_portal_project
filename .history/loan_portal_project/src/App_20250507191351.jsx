
import './App.css';

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-semibold text-gray-800">Hello, Tailwind!</h1>
          <button 
            className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-4"
          >
            Click Me
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

