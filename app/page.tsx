import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[url('/bg-image.avif')] bg-cover bg-center bg-no-repeat relative flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30"></div>
      <main className="text-center max-w-4xl mx-auto relative z-10">
        <div className="hero min-h-[60vh]">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/budget" className="btn btn-primary btn-lg">
                  💰 Budget
                </Link>
                <Link href="/ideas" className="btn btn-secondary btn-lg">
                  💡 Ideen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
