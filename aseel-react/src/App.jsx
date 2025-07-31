import { useState } from "react";
import "./App.css";
import solutionLogo from './assets/solution.png';
import f from './assets/fa.png';
import i from './assets/in.png';
import x from './assets/ti.png';
import s from './assets/search.png';
import e from './assets/email.png';
import ph from './assets/phone.png';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="w-full border-b border-gray-200">
        <div className="hidden md:flex items-center justify-center gap-6 text-sm text-gray-500 border-b border-gray-200 py-5">
          <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
            <img src={ph} className="h-4" alt="phone" />
            <h5>+966 11 4002 03</h5>
          </div>

          <div className="flex items-center gap-2 ">
            <img src={e} alt="email" className="h-4" />
            <a href="#" className="hover:text-blue-600">info@gutenberg.com</a>

            <div className="flex gap-3 border-l border-gray-300 pl-4 py-1">
              <a href="#"><img src={f} alt="Facebook" className="h-4 w-4" /></a>
              <a href="#"><img src={i} alt="Twitter" className="h-4 w-4" /></a>
              <a href="#"><img src={x} alt="X" className="h-4 w-4" /></a>
            </div>
          </div>
        </div>


        <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 md:px-12 h-20">
          <div className="flex items-center gap-1">
            <img src={solutionLogo} alt="Logo" className="h-14" />
            <div className="text-md font-semibold text-blue-700">
              شركة جوتينبيرغ<br />
              <span className="text-sm">Gutenberg Co.</span>
            </div>
          </div>

          <div className="hidden md:block w-0 h-full border-l-[1px] border-gray-300 transform rotate-[-20deg] -ml-2 mr-6 origin-bottom"></div>




          <ul className="hidden md:flex items-center gap-7 text-gray-800 font-semibold">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">About</li>
            <li className="hover:text-blue-600 cursor-pointer">Services</li>
            <li className="hover:text-blue-600 cursor-pointer">Products</li>
            <li className="hover:text-blue-600 cursor-pointer">Contact</li>
          </ul>


          <div className="hidden md:flex items-center gap-7 border-l border-gray-300 h-full pl-3">
            <div className="flex items-center gap-1">
              <input
                type="text"
                placeholder="Search..."
                className="border-none py-1 text-sm outline-none focus:ring-2 focus:ring-blue-400 focus:rounded-xl"
              />
              <a href="#"><img src={s} alt="search" className="h-4 w-4" /></a>
            </div>
            <button className="bg-gradient-to-r from-blue-800 to-blue-400 text-white text-sm rounded-full px-5 py-2 shadow-lg hover:border-blue-900 transition">
              Get a quote now
            </button>
          </div>

{/* -------------------------------------------------------------------------- */}

          <button
            className="md:hidden text-blue-800 text-3xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </nav>

        {sidebarOpen && (
          <aside className="md:hidden bg-white shadow-lg px-6 py-4">
            <ul className="flex flex-col gap-4 text-gray-800 font-semibold">
              <li className="hover:text-blue-600 cursor-pointer">Home</li>
              <li className="hover:text-blue-600 cursor-pointer">About</li>
              <li className="hover:text-blue-600 cursor-pointer">Products</li>
              <li className="hover:text-blue-600 cursor-pointer">Contact</li>
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              />
              <img src={s} alt="search" className="h-4 w-4" />
            </div>
            <button className="w-full mt-4 bg-gradient-to-r from-blue-800 to-blue-400 text-white text-sm rounded-full px-5 py-2 shadow-lg hover:border-blue-900 transition">
              Get a quote now
            </button>
          </aside>
        )}
      </header>
    </>
  );
}

export default App;
