
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Filter, Search, SlidersHorizontal } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface ViewOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface ResultsFilterProps {
  filterGroups?: FilterGroup[];
  viewOptions?: ViewOption[];
  onFilterChange?: (filters: Record<string, string[]>) => void;
  onViewChange?: (viewId: string) => void;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export function ResultsFilter({
  filterGroups = [],
  viewOptions = [],
  onFilterChange,
  onViewChange,
  searchPlaceholder = "Search...",
  onSearch,
}: ResultsFilterProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [activeView, setActiveView] = useState<string>(viewOptions[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterToggle = (groupId: string, optionValue: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      
      if (!newFilters[groupId]) {
        newFilters[groupId] = [];
      }
      
      if (newFilters[groupId].includes(optionValue)) {
        newFilters[groupId] = newFilters[groupId].filter(value => value !== optionValue);
        if (newFilters[groupId].length === 0) {
          delete newFilters[groupId];
        }
      } else {
        newFilters[groupId] = [...newFilters[groupId], optionValue];
      }
      
      if (onFilterChange) {
        onFilterChange(newFilters);
      }
      
      return newFilters;
    });
  };

  const handleViewChange = (viewId: string) => {
    setActiveView(viewId);
    if (onViewChange) {
      onViewChange(viewId);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        {onSearch && (
          <form onSubmit={handleSearch} className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder={searchPlaceholder}
              className="h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        )}

        {/* Filters */}
        {filterGroups.length > 0 && (
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "h-10", 
                  hasActiveFilters && "bg-accent text-accent-foreground"
                )}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">{
                    Object.values(activeFilters).reduce((count, values) => count + values.length, 0)
                  }</Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="start">
              <div className="p-4 space-y-4">
                {filterGroups.map((group) => (
                  <div key={group.id} className="space-y-2">
                    <h4 className="font-medium text-sm">{group.label}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((option) => {
                        const isActive = activeFilters[group.id]?.includes(option.value);
                        return (
                          <Badge
                            key={option.id}
                            variant={isActive ? "active" : "filter"}
                            className="cursor-pointer"
                            onClick={() => handleFilterToggle(group.id, option.value)}
                          >
                            {isActive && <Check className="mr-1 h-3 w-3" />}
                            {option.label}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {hasActiveFilters && (
                <>
                  <Separator />
                  <div className="p-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setActiveFilters({});
                        if (onFilterChange) onFilterChange({});
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                </>
              )}
            </PopoverContent>
          </Popover>
        )}

        {/* View options */}
        {viewOptions.length > 0 && (
          <div className="inline-flex bg-muted rounded-md p-1">
            {viewOptions.map((view) => (
              <Button
                key={view.id}
                variant={activeView === view.id ? "default" : "ghost"}
                size="sm"
                className="h-8"
                onClick={() => handleViewChange(view.id)}
              >
                {view.icon}
                <span className="ml-1">{view.label}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
