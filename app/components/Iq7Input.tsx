import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

export function Iq7Input<T extends FieldValues>({
  label,
  type,
  placeholder,
  inputClassName,
  ...props
}: {
  label?: string;
  type?: string;
  placeholder?: string;
  inputClassName?: string;
} & UseControllerProps<T>) {
  const { field, fieldState, formState } = useController(props);

  if (!field.value) field.value = "" as any;

  return (
    <div className="flex flex-col">
      {label && <label htmlFor={field.name}>{label}</label>}
      <input
        type={type}
        className={
          "input input-sm " +
          (fieldState.invalid ? "input-warning " : "") +
          inputClassName
        }
        {...field}
        required={true}
        placeholder={placeholder}
      />
      {/* <p>{fieldState.isTouched && "Touched"}</p>
      <p>{fieldState.isDirty && "Dirty"}</p> */}
      {/* <p>{fieldState.invalid ? fieldState.invalid : "valid"}</p> */}
      {fieldState.error && <p>{fieldState.error.message}</p>}
    </div>
  );
}
