"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ApplicationForm } from "./application-form";

interface ApplicationModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly jobId: string;
  readonly jobTitle: string;
}

export function ApplicationModal({
  isOpen,
  onClose,
  jobId,
  jobTitle,
}: ApplicationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
        </DialogHeader>
        <ApplicationForm jobId={jobId} onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}
