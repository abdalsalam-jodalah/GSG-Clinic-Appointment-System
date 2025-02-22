interface IProps {
  label: string;
  name: string;
  type?: "text" | "number" | "date" | "textarea" | "select";
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  options?: string[];
}

const Input = (props: IProps) => {
  return (
    <div>
      <label>{props.label}</label>

      {props.type === "select" && props.options ? (
        <select name={props.name} value={props.value} onChange={props.onChange} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #ccc" }}>
          {props.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : props.type === "textarea" ? (
        <textarea
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "0.25rem",
            border: "1px solid #ccc",
          }}
        />
      ) : (
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "0.25rem",
            border: "1px solid #ccc",
          }}
        />
      )}
    </div>
  );
};

export default Input;
