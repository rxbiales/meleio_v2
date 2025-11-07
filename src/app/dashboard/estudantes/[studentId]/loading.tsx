import Sidebar from "@/components/layout/Sidebar";

export default function LoadingStudentProfile() {
  return (
    <>
      <Sidebar />
      <section className="space-y-6 pb-12">
        <div className="animate-pulse rounded-3xl border border-purple-100 bg-white/80 p-6">
          <div className="mb-6 h-4 w-48 rounded-full bg-purple-100" />
          <div className="mb-4 h-7 w-80 rounded-full bg-purple-100" />
          <div className="mb-6 h-4 w-64 rounded-full bg-purple-100" />
          <div className="flex flex-wrap gap-3">
            <div className="h-9 w-28 rounded-full bg-purple-100" />
            <div className="h-9 w-28 rounded-full bg-purple-100" />
            <div className="h-9 w-28 rounded-full bg-purple-100" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-56 animate-pulse rounded-3xl bg-white/70" />
          <div className="h-56 animate-pulse rounded-3xl bg-white/70" />
        </div>
      </section>
    </>
  );
}
