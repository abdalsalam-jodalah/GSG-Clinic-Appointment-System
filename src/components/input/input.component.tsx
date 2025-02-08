import { cn } from "../../utils/test";

interface IProps {
  label: string;
  id: string;
  name: string;
  type?: "text" | "number" | "date" | "textarea" | "select";
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  options?: string[];
  placeholder?: string;
  className?: string;
}

const Input = (props: IProps) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {props.label}
      </label>

      {props.type === "select" && props.options ? (
        <select
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className={props.className}
        >
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : props.type === "textarea" ? (
        <textarea
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={cn(
            "p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            props.className
          )}
        />
      ) : (
        <input
          type={props.type}
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required
          placeholder={props.placeholder}
          className={cn(
            "p-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            props.className
          )}
        />
      )}
    </div>
  );
};

export default Input;
