import Link from "next/link";
import BudgetContent from "../components/BudgetContent";

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-[url('/bg-image.avif')] bg-cover bg-center bg-no-repeat relative p-4">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Link href="/" className="btn btn-ghost">
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>

        <BudgetContent />
      </div>
    </div>
  );
}
