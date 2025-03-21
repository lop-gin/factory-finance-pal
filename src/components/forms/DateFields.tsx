
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface DateFieldProps {
  label: string;
  date: Date;
  onDateChange: (date: Date) => void;
}

export const DateField: React.FC<DateFieldProps> = ({
  label,
  date,
  onDateChange,
}) => {
  return (
    <div>
      <div className="flex items-center mb-1">
        <Label className="text-xs font-medium text-gray-600 mr-1">{label}</Label>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-9 text-xs",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-3.5 w-3.5" />
            {date ? (
              format(date, "dd/MM/yyyy")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && onDateChange(date)}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface TermsSelectProps {
  terms: string;
  onTermsChange: (terms: string) => void;
}

export const TermsSelect: React.FC<TermsSelectProps> = ({
  terms,
  onTermsChange,
}) => {
  return (
    <div>
      <div className="flex items-center mb-1">
        <Label className="text-xs font-medium text-gray-600 mr-1">Terms</Label>
      </div>
      <Select value={terms} onValueChange={onTermsChange}>
        <SelectTrigger className="h-9 text-xs w-full">
          <SelectValue placeholder="Select terms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Due on receipt">Due on receipt</SelectItem>
          <SelectItem value="Net 15">Net 15</SelectItem>
          <SelectItem value="Net 30">Net 30</SelectItem>
          <SelectItem value="Net 60">Net 60</SelectItem>
          <SelectItem value="Custom">Custom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
