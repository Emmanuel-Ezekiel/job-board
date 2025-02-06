import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Building2, MapPin, DollarSign, Bookmark } from "lucide-react"
import type { JobListing } from "@/helpers/types"
import { useBookmarks } from "../context/bookmark-context"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import type React from "react"

export function JobCard({ job }: Readonly<{ job: JobListing }>) {
  const { toggleBookmark, isBookmarked } = useBookmarks()

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    const wasBookmarked = isBookmarked(job.job_id)
    toggleBookmark(job.job_id, job)
    toast.success(wasBookmarked ? "Job removed from bookmarks" : "Job added to bookmarks")
  }

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">{job.job_title}</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span>{job.employer_name}</span>
            </div>
          </div>
          {job.employer_logo && (
            <Image
              src={job.employer_logo || "/placeholder.svg"}
              alt={`${job.employer_name} logo`}
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{`${job.job_city}, ${job.job_state}, ${job.job_country}`}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>
              {job.job_max_salary && job.job_min_salary
                ? `${job.job_min_salary} - ${job.job_max_salary}`
                : "Salary not available"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">{job.job_employment_type}</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className="hover:text-primary"
            aria-label={isBookmarked(job.job_id) ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            <Bookmark
              className={cn(
                "h-4 w-4",
                isBookmarked(job.job_id) ? "fill-primary text-primary" : "text-muted-foreground",
              )}
            />
          </Button>
          <Link
            href={{
              pathname: `/jobs/${job.job_id}`,
              query: { id: job.job_id },
            }}
            as={`/jobs/${job.job_id}`}
          >
            <Button onClick={() => localStorage.setItem("selectedJob", JSON.stringify(job))}>Apply now</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
