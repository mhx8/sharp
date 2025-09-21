"use client";

import { useState } from "react";
import SuccessCelebration from "./SuccessCelebration";

interface IdeaData {
  name: string;
  idea: string;
}

interface IdeaFormProps {
  addIdea: (data: IdeaData) => Promise<void>;
}

export default function IdeaForm({ addIdea }: IdeaFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    idea: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await addIdea({
        name: formData.name,
        idea: formData.idea,
      });
      
      // Reset form and show celebration
      setFormData({ name: "", idea: "" });
      setShowCelebration(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to add idea");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
  };

  return (
    <>
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">💡 Ideen Sammlung</h2>
          <p className="text-sm opacity-70 mb-4">
            Teilen Sie Ihre Ideen für den Junggesellenabschied
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Dein Name</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="input input-bordered w-full"
                placeholder="Wie heisst du?"
              />
            </div>

            <div className="form-control">
              <label htmlFor="idea" className="label">
                <span className="label-text">Deine Idee</span>
              </label>
              <textarea
                id="idea"
                name="idea"
                required
                rows={4}
                value={formData.idea}
                onChange={(e) => setFormData(prev => ({ ...prev, idea: e.target.value }))}
                className="textarea textarea-bordered w-full"
                placeholder="Teile deine Idee mit..."
              />
            </div>

            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Wird hinzugefügt...
                </>
              ) : (
                "Idee hinzufügen"
              )}
            </button>
          </form>
        </div>
      </div>

      {showCelebration && (
        <SuccessCelebration
          show={showCelebration}
          onClose={handleCelebrationClose}
        />
      )}
    </>
  );
}
