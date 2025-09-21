interface IdeaData {
  name: string;
  idea: string;
  timestamp?: string;
}

interface IdeaDisplayProps {
  ideas: IdeaData[];
}

export default function IdeaDisplay({ ideas }: IdeaDisplayProps) {
  if (ideas.length === 0) {
    return (
      <div className="card w-full bg-base-200 shadow-xl">
        <div className="card-body text-center">
          <h3 className="card-title justify-center">💭 Ideen Sammlung</h3>
          <p className="opacity-70">
            Füge Ideen hinzu, um die Sammlung zu sehen
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Ideas Grid */}
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h4 className="card-title mb-4">💡 Alle Party Ideen</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map((idea, index) => (
              <div
                key={`idea-${idea.name}-${index}-${idea.idea.substring(0, 20)}`}
                className="card bg-gradient-to-br from-primary/5 to-secondary/5 border border-base-300"
              >
                <div className="card-body p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="badge badge-primary badge-sm">
                      {idea.name}
                    </div>
                    {idea.timestamp && (
                      <div className="text-xs opacity-60">
                        {new Date(idea.timestamp).toLocaleDateString('de-DE', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed">{idea.idea}</p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="text-xs opacity-50">
                      {idea.idea.length} Zeichen
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
