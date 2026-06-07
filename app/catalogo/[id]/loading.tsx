export default function ProductoLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
      <div className="h-4 w-48 bg-stone-200 rounded mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div className="aspect-square rounded-3xl bg-stone-200" />

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-stone-200 rounded-full" />
            <div className="h-6 w-12 bg-stone-200 rounded-full" />
          </div>
          <div className="h-8 w-3/4 bg-stone-200 rounded" />
          <div className="h-7 w-1/3 bg-stone-200 rounded" />
          <div className="space-y-2 mt-2">
            <div className="h-4 bg-stone-100 rounded w-full" />
            <div className="h-4 bg-stone-100 rounded w-5/6" />
            <div className="h-4 bg-stone-100 rounded w-4/6" />
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-12 bg-stone-200 rounded-xl" />
            <div className="h-12 bg-stone-100 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
