export function BudgetSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section Skeleton */}
      <div className="lg:col-span-1">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="h-8 bg-base-300 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-base-300 rounded animate-pulse mb-6 w-3/4"></div>

            <div className="space-y-4">
              <div className="form-control">
                <div className="h-4 bg-base-300 rounded animate-pulse mb-2"></div>
                <div className="h-12 bg-base-300 rounded animate-pulse"></div>
              </div>

              <div className="form-control">
                <div className="h-4 bg-base-300 rounded animate-pulse mb-2"></div>
                <div className="h-12 bg-base-300 rounded animate-pulse"></div>
              </div>

              <div className="h-12 bg-base-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagram Section Skeleton */}
      <div className="lg:col-span-2">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="h-8 bg-base-300 rounded animate-pulse mb-6"></div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="stat bg-base-200 rounded animate-pulse">
                <div className="h-4 bg-base-300 rounded mb-2"></div>
                <div className="h-8 bg-base-300 rounded mb-1"></div>
                <div className="h-3 bg-base-300 rounded w-2/3"></div>
              </div>
              <div className="stat bg-base-200 rounded animate-pulse">
                <div className="h-4 bg-base-300 rounded mb-2"></div>
                <div className="h-8 bg-base-300 rounded mb-1"></div>
                <div className="h-3 bg-base-300 rounded w-2/3"></div>
              </div>
              <div className="stat bg-base-200 rounded animate-pulse">
                <div className="h-4 bg-base-300 rounded mb-2"></div>
                <div className="h-8 bg-base-300 rounded mb-1"></div>
                <div className="h-3 bg-base-300 rounded w-2/3"></div>
              </div>
            </div>

            {/* Chart Skeleton */}
            <div className="h-64 bg-base-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IdeasSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section Skeleton */}
      <div className="lg:col-span-1">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="h-8 bg-base-300 rounded animate-pulse mb-4"></div>
            <div className="h-4 bg-base-300 rounded animate-pulse mb-6 w-3/4"></div>

            <div className="space-y-4">
              <div className="form-control">
                <div className="h-4 bg-base-300 rounded animate-pulse mb-2"></div>
                <div className="h-12 bg-base-300 rounded animate-pulse"></div>
              </div>

              <div className="form-control">
                <div className="h-4 bg-base-300 rounded animate-pulse mb-2"></div>
                <div className="h-24 bg-base-300 rounded animate-pulse"></div>
              </div>

              <div className="h-12 bg-base-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Ideas Display Section Skeleton */}
      <div className="lg:col-span-2">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="h-8 bg-base-300 rounded animate-pulse mb-6"></div>

            {/* Ideas List Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card bg-base-200 animate-pulse">
                  <div className="card-body p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="h-5 bg-base-300 rounded w-1/4"></div>
                      <div className="h-4 bg-base-300 rounded w-1/6"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-base-300 rounded"></div>
                      <div className="h-4 bg-base-300 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
