"use client";
import CheckBox from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { isEnglish } from "@/lib/utils";
import InputFile from "@/components/ui/input-file";
import SelectInput from "@/components/ui/select-input";
import { useEffect, useState } from "react";


const Form = () => {
 
 const renderTitle = () => {
	const text = isEnglish() ? "Collaboration_& Partnership" : "Kolaborasi_& Kemitraan"
	const newText = text.split('_');

	return (
		<p className="uppercase font-semibold text-4xl">
			 {newText[0]} <span className="text-green-light">{newText[1]}</span>
		</p>
	)
}

		const [formData, setFormData] = useState<{ [key: string]: string | boolean }>({
			name: "",
			company: "",
			address:"",
			email: "",
			phone:"",
			// collaboration_type: "",
			notes:"",
			agree: false
		});

		const [emptyFields, setEmptyFields] = useState<string[]>([]);
		const [isChecked, setIsChecked] = useState(false);
		const [isFormValid, setIsFormValid] = useState(false);

		useEffect(() => {
			const emptyFieldsList = Object.entries(formData)
				.filter(([_, value]) => value === "")
				.map(([key]) => key);
	
			setEmptyFields(emptyFieldsList);
			setIsFormValid(emptyFieldsList.length === 0 && isChecked);
		}, [formData, isChecked]);

		const handleTextinput = (name: string, value: string) => {
			setFormData((prev) => ({
				...prev,
				[name]: value, // Mengupdate hanya field yang berubah
			}));
		};

		const handleChangeCheckBox = (checked: boolean) => {
			setIsChecked(checked);
		}

		console.log('>>', emptyFields.length !== 0 || !isChecked)
 return ( 
    <section id="form-collaboration-partnership" className="flex justify-center md:mt-10 mt-8">
			<section>
			<header className="text-center">
				{renderTitle()}
				<p className="mt-4">Salurkan aspirasi anda melalui berbagai bentuk kegiatan kerja sama CSR</p>
			</header>
			<form className="md:mx-0 mx-4">
				<TextInput 
					label={"Nama"}
					name="name"
					placeholder="Masukkan nama Anda"
					type="text"
					onChange={handleTextinput}
				/>
				<TextInput 
					label={"Yayasan/Institusi/Perusahaan"}
					name="company"
					placeholder="Masukkan nama Yayasan/Institusi/Perusahaan Anda"
					type="text"
					onChange={handleTextinput}
				/>
				<TextInput 
					label={"Alamat"}
					name="address"
					placeholder="Masukkan alamat Anda"
					type="text"
					onChange={handleTextinput}
				/>
				<TextInput 
					label={"Email"}
					name="email"
					placeholder="Masukkan email Anda"
					type="email"
					onChange={handleTextinput}
				/>
				<TextInput 
					label={"Nomor Telepon"}
					name="phone"
					placeholder="Masukkan nomor telepon Anda"
					type="tel"
					onChange={handleTextinput}
				/>
				<SelectInput
					label="Jenis Kolaborasi"
					name="collaboration_type"
				/>
				<InputFile
					label="Lampiran PDF"
					placeholder="Masukkan File PDF"
				/>
				<TextInput 
					label={"Catatan"}
					name="notes"
					placeholder="Masukkan catatan Anda disini"
					type="text"
					onChange={handleTextinput}
				/>
				<CheckBox checked={isChecked} onChange={handleChangeCheckBox}/>
				<Button 
					className="bg-green-light disabled:bg-[#005CAB]/[.60] text-white mt-4 w-[172px] h-[56px] uppercase" 
					disabled={!isFormValid}>
					Daftar
				</Button>
			</form>
			</section>
    </section>
  );
}
 
export default Form;