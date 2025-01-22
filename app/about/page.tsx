import React from "react";

const page = () => {
  return (
    <React.Fragment>
      <img className="w-full" src="/temp/banner-about.png" alt="" />
      <section className="container mt-16">
        <div className="mt-16">
          <h1 className="title-3 text-green-light text-center">Introduction</h1>
          <p className="max-w-[600px] mx-auto text-center mt-8">
            Sebagai anak Perusahaan Pertamina yang melakukan usaha di bidang ritel khususnya penyaluran bahan bakar di
            SPBU dan pengelolaan, pengembangan serta pemasaran produk-produk bahan bakar dan non bahan bakar sesuai
            dengan bisnis yang terkait di dalamnya.
          </p>
        </div>

        <img className="w-full mt-16" src="/temp/about-1.png" alt="" />

        <div className="text-center mt-16">
          <p className="text-[#005CAB] text-lg">MOTO</p>
          <h1 className="title-3 mt-4  font-Kalam">
            Satukan Energi <br />
            <span className="text-green-light">Melayani Negeri (SINERGI)</span>
          </h1>
        </div>

        <h1 className="mt-16 title-3">Timeline</h1>
        <img className="w-full mt-16" src="/temp/about-2.png" alt="" />
        <h1 className="mt-16 title-3">Struktur Organisasi</h1>
        <img className="w-full mt-16" src="/temp/about-3.png" alt="" />
        <img className="w-full mt-16" src="/temp/about-4.png" alt="" />
      </section>
    </React.Fragment>
  );
};

export default page;

