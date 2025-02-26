import { Checkbox, Field, Label } from '@headlessui/react'
import { useState } from "react";

const CheckBox = () => {
  const [enabled, setEnabled] = useState(false)
  return ( 
    <Field className="flex items-center gap-2">
      <Checkbox
        checked={enabled}
        onChange={setEnabled}
        className="group block border border-neutral-400 size-5 rounded border bg-white data-[checked]:bg-green-light"
      >
        {/* Checkmark icon */}
        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
          <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Checkbox>
      <Label className='cursor-pointer'>Saya Setuju dengan ketentuan dari PT Pertamina Retail</Label>
      
    </Field>
  );
}
 
export default CheckBox;