import { Input } from '@headlessui/react'

type textInputProps = {
  label: string;
  name: string;
  isRequired?: boolean;
  placeholder?: string;
  type: "text" | "email" | "tel"
}

const TextInput:React.FC<textInputProps> = ({
  label,
  isRequired,
  placeholder,
  name,
  type
}) => {
  return ( 
  <section id="text-input" className='my-4'>
    <label className="text-xs">{label}</label>
    <div>
      <Input 
        name={name}
        placeholder={placeholder}
        type={type} 
        className="p-4 mt-2 rounded-lg border border-neutral-400 w-full h-[56px] data-[focus]:outline-green-light"
      />
    </div>
  </section>
  );
}
 
export default TextInput;