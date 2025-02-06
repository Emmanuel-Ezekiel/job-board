import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { JobDetails } from "./components/job-details";

interface PageProps {
  readonly params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;

  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-8 max-w-4xl">
          <div className="space-y-4">
            <Skeleton className="h-12 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      }
    >
      <JobDetails id={resolvedParams.id} />
    </Suspense>
  );
}
