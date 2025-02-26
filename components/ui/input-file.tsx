import { useRef, useState } from "react";
import { Paperclip } from "lucide-react";

type fileInputProps = {
  label: string;
  placeholder: string
}


const InputFile:React.FC<fileInputProps> = ({
  label,
  placeholder
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Hanya file PDF yang diperbolehkan!");
        event.target.value = ""; // Reset input jika file bukan PDF
        setFileName(""); // Reset nama file
        return;
      }

      setFileName(file.name); // Simpan nama file
    }
  };

  return (
    <div className="relative w-full">
      <label className="text-xs">{label}</label>
      <input
        type="file"
        ref={fileInputRef}
        accept="application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <div
        onClick={handleClick}
        className="mt-2 w-full h-[56px] flex items-center justify-between border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <span>{fileName || placeholder}</span>
        <Paperclip className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  );
};

export default InputFile;
