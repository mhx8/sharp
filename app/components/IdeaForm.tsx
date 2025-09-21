"use client";

import { useActionState, useState, useEffect } from "react";
import SuccessCelebration from "./SuccessCelebration";

export default function IdeaForm({ addIdea }: { addIdea: any }) {
  const [formData, formAction] = useActionState(addIdea, {
    error: null,
    success: false,
  });
  const [showCelebration, setShowCelebration] = useState(false);

  // Trigger celebration on success
  useEffect(() => {
    if (formData.success && !formData.error) {
      setShowCelebration(true);
    }
  }, [formData.success, formData.error]);

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

          <form action={formAction} className="space-y-4">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Dein Name</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
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
                className="textarea textarea-bordered w-full"
                placeholder="Teile deine Idee mit..."
              />
            </div>

            {formData.error && (
              <div className="alert alert-error">
                <span>{formData.error}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full">
              Idee hinzufügen
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
