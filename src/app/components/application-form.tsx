"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Update the schema to remove resume validation from here
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters"),
});

interface ApplicationFormProps {
  jobId: string;
  onSuccess?: () => void;
}

export function ApplicationForm({
  jobId,
  onSuccess,
}: Readonly<ApplicationFormProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resume, setResume] = useState<File | null>(null); // State to manage resume file
  const [resumeError, setResumeError] = useState<string | null>(null); // State to manage resume error

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      coverLetter: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Check for resume file before submission
    if (!resume) {
      setResumeError("Resume is required");
      setIsSubmitting(false);
      return;
    }

    try {
      // This would typically be an API call
      console.log("Form submitted:", { jobId, resume, ...values });
      toast.success("Application submitted successfully!");
      form.reset();
      setResume(null); // Clear resume after successful submission
      onSuccess?.();
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleResumeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setResume(file);
    if (file) {
      setResumeError(null); // Clear error if a file is selected
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Resume</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange} // Uncontrolled input using local state
            />
          </FormControl>
          {resumeError && <p className="text-red-500 text-sm">{resumeError}</p>}
        </FormItem>

        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us why you're interested in this position..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
