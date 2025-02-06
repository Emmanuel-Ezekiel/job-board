"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { countries } from "@/helpers/data";

interface SearchFiltersProps {
  readonly onSearch: (filters: {
    query: string;
    country: string;
    minSalary: number;
    maxSalary: number;
  }) => void;
}

export function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    query: "Senior Frontend Developers",
    country: "us",
    minSalary: 0,
    maxSalary: 200000,
  });

  const handleChange = (key: string, value: string | number | number[]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <div className="space-y-2">
        <Label htmlFor="search">Search Jobs</Label>
        <Input
          id="search"
          placeholder="Job title or keyword"
          value={filters.query}
          onChange={(e) => handleChange("query", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Select
          value={filters.country}
          onValueChange={(value) => handleChange("country", value)}
        >
          <SelectTrigger id="country">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="salary-range">Salary Range</Label>
        <div className="pt-2 px-2">
          <Slider
            id="salary-range"
            min={0}
            max={200000}
            step={1000}
            value={[filters.minSalary, filters.maxSalary]}
            onValueChange={(value) => {
              handleChange("minSalary", value[0]);
              handleChange("maxSalary", value[1]);
            }}
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${filters.minSalary.toLocaleString()}</span>
          <span>${filters.maxSalary.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex items-end md:col-span-2 lg:col-span-1">
        <Button type="submit" className="w-full">
          Search
        </Button>
      </div>
    </form>
  );
}
