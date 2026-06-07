function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white border border-stone-100 animate-pulse">
      <div className="aspect-[4/5] bg-stone-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-100 rounded w-full" />
        <div className="h-3 bg-stone-100 rounded w-2/3" />
        <div className="h-4 bg-stone-200 rounded w-1/3 mt-2" />
      </div>
    </div>
  );
}

export default function CatalogoLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 space-y-2 animate-pulse">
        <div className="h-3 w-20 bg-stone-200 rounded" />
        <div className="h-8 w-40 bg-stone-200 rounded" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-56 space-y-3 animate-pulse">
          <div className="h-8 bg-stone-200 rounded-xl" />
          <div className="h-8 bg-stone-200 rounded-xl" />
          <div className="h-8 bg-stone-200 rounded-xl" />
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
