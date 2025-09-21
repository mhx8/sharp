"use client";

import { useState, useEffect } from "react";
import SuccessCelebration from "./SuccessCelebration";

interface BudgetData {
  preferredBudget: number;
  name?: string;
}

interface BudgetFormProps {
  onSubmit: (data: BudgetData) => Promise<void>;
}

export default function BudgetForm({ onSubmit }: BudgetFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    preferredBudget: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check localStorage on component mount
  useEffect(() => {
    const submitted = localStorage.getItem('budget-submitted');
    if (submitted) {
      setHasSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const budgetData: BudgetData = {
      name: formData.name || undefined,
      preferredBudget: parseInt(formData.preferredBudget),
    };

    // Validation
    if (budgetData.preferredBudget <= 0 || !Number.isInteger(budgetData.preferredBudget)) {
      setError("Bitte geben Sie ein gültiges ganzes Budget ein (keine Dezimalstellen)");
      setIsLoading(false);
      return;
    }

    try {
      await onSubmit(budgetData);
      // Clear any previous errors
      setError(null);
      // Mark as submitted in localStorage
      localStorage.setItem('budget-submitted', 'true');
      // Reset form
      setFormData({ name: "", preferredBudget: "" });
      // Show celebration instead of toast
      setShowCelebration(true);
    } catch (err) {
      console.error("Error submitting budget:", err);
      setError(
        err instanceof Error ? err.message : "Fehler beim Übermitteln des Budgets. Bitte versuchen Sie es erneut.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // If user has already submitted, show a message instead
  const submittedContent = (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">✅ Budget eingereicht</h2>
        <p className="text-sm opacity-70 mb-4">
          Sie haben bereits Ihr Budget eingegeben. Pro Person ist nur eine Eingabe möglich.
        </p>
        <div className="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" role="img" aria-label="Success icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Ihr Budget wurde erfolgreich gespeichert!</span>
        </div>
        <button 
          type="button"
          onClick={() => {
            localStorage.removeItem('budget-submitted');
            setHasSubmitted(false);
          }}
          className="btn btn-outline btn-sm mt-4"
        >
          Neues Budget eingeben (Reset)
        </button>
      </div>
    </div>
  );

  const budgetForm = (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">💰 Budget Planung</h2>
        <p className="text-sm opacity-70 mb-4">
          Legen Sie Ihre Budgetvorstellungen für den Junggesellenabschied fest
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="preferred-budget-input">
              <span className="label-text-alt">
                Was Sie gerne ausgeben möchten (Anonym)
              </span>
            </label>
            <div className="input-group">
              <input
                id="preferred-budget-input"
                type="number"
                name="preferredBudget"
                placeholder="z.B. 500 CHF"
                className="input input-bordered w-full"
                min="1"
                step="1"
                required
                value={formData.preferredBudget}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <div className="form-control mt-6">
            <button
              type="submit"
              className={`btn btn-primary ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Budget wird hinzugefügt..." : "Budget hinzufügen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {hasSubmitted ? submittedContent : budgetForm}
      <SuccessCelebration 
        show={showCelebration}
        onClose={() => {
          setShowCelebration(false);
          setHasSubmitted(true);
        }}
        title="Herzlichen Glückwunsch! 🎉"
        message="Ihr Budget wurde erfolgreich eingereicht!"
      />
    </>
  );
}
