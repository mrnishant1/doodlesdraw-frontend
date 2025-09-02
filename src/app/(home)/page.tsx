import { url } from "inspector";
import Image from "next/image";

export default function HomePage() {


  
  return (
    <div className="min-h-screen bg-[#94cdd7] flex flex-col  items-center justify-center px-6 overflow-hidden"style={{backgroundImage: `url('/background.jpeg')`, height:'100svh',width:'100svw',backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}>  
      <div className=" bg-cover bg-center  absolute z-0 w-[100svw] h-[100svh] opacity-10"  >
      </div>
      {/* Hero Section */}
      <header className="text-center max-w-2xl z-20">
        <h1 className="text-6xl font-cursive  text-gray-800 mb-4">
          DoodlesDraw
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A collaborative drawing canvas right in your browser. Sketch, share,
          and create together in real-time.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/draw"
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
          >
            Start Drawing
          </a>
          <a
            href="#features"
            className="px-6 py-3 border border-gray-300 rounded-2xl hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl w-full z-20">
        <div className="bg-[#cbeff6] p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Real-time Collaboration</h3>
          <p className="text-gray-600 text-sm">
            Work with your friends, teammates, or clients instantly on the same
            canvas.
          </p>
        </div>

        <div className="bg-[#cbeff6] p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Infinite Canvas</h3>
          <p className="text-gray-600 text-sm">
            Draw, zoom, and pan without limits. The canvas grows with your ideas.
          </p>
        </div>

        <div className="bg-[#cbeff6] p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Simple Tools</h3>
          <p className="text-gray-600 text-sm">
            Pens, shapes, colors, and text. Everything you need, nothing you
            don’t.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 text-gray-500 text-sm z-20">
        <p>
          Built with ❤️ for creators. DoodlesDraw © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
