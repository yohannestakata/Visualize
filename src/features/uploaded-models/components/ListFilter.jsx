import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ListFilter({ setDepartmentFilter, setStatusFilter }) {
  return (
    <div className="flex gap-2">
      <Select onValueChange={(value) => setDepartmentFilter(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter departments" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Departments</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="computer science">Computer Science</SelectItem>
            <SelectItem value="architecture">Architecture</SelectItem>
            <SelectItem value="accounting">Accounting</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setStatusFilter(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="drafted">Draft</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ListFilter;
