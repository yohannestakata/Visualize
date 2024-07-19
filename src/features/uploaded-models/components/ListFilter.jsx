import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetDepartments from "../../../hooks/useGetDepartments";

function ListFilter({ setDepartmentFilter, setStatusFilter }) {
  const { data: departments } = useGetDepartments();

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
            {departments?.map((dep) => (
              <SelectItem value={dep._id} key={dep._id}>
                {dep.name}
              </SelectItem>
            ))}
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
