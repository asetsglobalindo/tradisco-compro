"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { cn } from "@/lib/utils";
import { HomeType } from "@/types/indes";
import { Button } from "../ui/button";
import { ArrowRight, X } from "lucide-react";
import JSCookie from "js-cookie";
import Modal from "../ui/modal";

const data2 = {
  title: "Bisnis Kami",
  tab: [
    {
      title: "Trading",
      content: [
        {
          small_text: "-",
          title: "SPBU",
          description:
            '<p style="text-align:justify;">Sebagai pengelola dan pengembangan Stasiun Pengisian Bahan Bakar Umum (SPBU) di Indonesia. Bukan sekadar tempat mengisi bahan bakar, SPBU Pertamina Retail kini bertransformasi menjadi pusat layanan lengkap dengan konsep one-stop service. Mulai dari isi bahan bakar, belanja di convenience store, hingga layanan tambahan lainnya, semuanya ada di sini!<br>&nbsp;</p><p style="text-align:justify;">Untuk memperluas jangkauan dan memenuhi kebutuhan masyarakat, Pertamina Retail mengelola beberapa jenis SPBU dengan model bisnis yang berbeda, yaitu COCO, KSO, TAC, dan CODO<br>&nbsp;</p><ol><li><p style="text-align:justify;">COCO (Company Owned Company Operated)<br>SPBU COCO dikelola langsung oleh Pertamina Retail, mulai dari kepemilikan hingga operasionalnya. Kualitas layanan dan produknya sudah pasti sesuai standar tinggi yang ditetapkan oleh Pertamina. SPBU jenis ini biasanya memiliki fasilitas yang lengkap dan modern, seperti Bright Store hingga layanan non-BBM lainnya.<br>&nbsp;</p></li><li><p style="text-align:justify;">KSO (Kerjasama Operasi)<br>SPBU KSO merupakan hasil kerja sama antara Pertamina Retail dan pihak ketiga dalam hal operasional SPBU. Dalam model ini, aset SPBU dimiliki oleh Pertamina, tetapi pengelolaannya dilakukan oleh mitra yang dipilih melalui skema kerjasama operasi. Mitra bertanggung jawab atas manajemen harian dan operasional, sementara Pertamina memastikan pasokan BBM dan standar operasional tetap terpenuhi.<br>&nbsp;</p></li><li><p style="text-align:justify;">TAC (Technical Assistance Contract)<br>SPBU TAC adalah bentuk kerjasama di mana Pertamina Retail memberikan dukungan teknis dan operasional kepada pemilik SPBU yang mengelola usahanya sendiri. Dalam hal ini, Pertamina Retail tidak memiliki kepemilikan pada aset SPBU, tetapi memberikan bantuan teknis, pelatihan, dan dukungan operasional untuk memastikan standar pelayanan, serta memastikan kualitas dan pasokan BBM sesuai standar operasional tetap terpenuhi.<br>&nbsp;</p></li><li><p style="text-align:justify;">CODO (Company Owned Dealer Operated)<br>Pada model CODO, Pertamina memiliki aset SPBU namun operasional sehari-hari dikelola oleh pihak ketiga (dealer). Dealer bertindak sebagai mitra yang mengoperasikan SPBU sesuai dengan standar yang ditetapkan Pertamina. Dalam hal ini, Pertamina tetap memasok BBM dan memastikan kualitas layanan, sementara dealer memperoleh keuntungan dari hasil penjualan BBM dan produk lainnya.<br>&nbsp;</p></li></ol><p style="text-align:justify;">Dengan berbagai skema ini, Pertamina Retail bisa lebih fleksibel dan cepat beradaptasi dengan kebutuhan pasar, sekaligus memberikan kesempatan kepada mitra untuk berkembang.</p>',
          _id: "67c51d9ac029eb63bd5a6f87",
          slug: "spbu",
          order: 5,
          thumbnail_images: [
            {
              _id: "67c51d7dc029eb63bd5a6ece",
              title: "Fuel Station",
              description: "Fuel Station",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/77b7933c-90a2-4048-a396-a7314b7f8138.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/5fb619a1-f592-468a-9ce2-5266d735dab5.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Bahan Bakar",
            _id: "67510ec22284f9bca4aca70a",
            slug: "bahan-bakar",
          },
          created_at: "2025-03-03T03:10:18.000Z",
        },
        {
          small_text: "SPBG",
          title: "SPBG",
          description:
            '<p style="text-align:justify;">Selain SPBU, sebagai bagian dari upaya diversifikasi energi dan mendukung program pemerintah dalam penggunaan bahan bakar yang lebih ramah lingkungan, Pertamina Retail mengoperasikan SPBG untuk memenuhi kebutuhan bahan bakar gas bagi kendaraan bermotor. Dengan standar keamanan dan kualitas yang tinggi, Pertamina Retail memastikan pasokan gas yang stabil dan pelayanan yang optimal di SPBG yang kami kelola.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">SPBG adalah Stasiun Pengisian Bahan Bakar Gas, yaitu fasilitas yang digunakan untuk mengisi bahan bakar gas pada kendaraan bermotor. Bahan bakar gas yang umumnya disediakan di SPBG meliputi CNG (Compressed Natural Gas) dan BBG (Bahan Bakar Gas) lainnya yang ramah lingkungan dan ekonomis dibandingkan bahan bakar minyak. SPBG dirancang dengan sistem keamanan yang tinggi dan dilengkapi dengan peralatan khusus untuk mengompresi dan mengalirkan gas ke kendaraan. Selain itu, penggunaan gas sebagai bahan bakar membantu mengurangi emisi karbon sehingga lebih ramah lingkungan dibandingkan bahan bakar fosil konvensional.</p>',
          _id: "6790fcf8a85144086fc81478",
          slug: "spbg",
          order: 6,
          thumbnail_images: [
            {
              _id: "67c5b8f4c029eb63bd5ac33d",
              title: "SPBG",
              description: "SPBG",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/cae4d93e-a2e5-48e6-ad13-65036fd0ad80.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/a18cebfa-467f-434c-b1a3-2b2dc2bda4c1.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Bahan Bakar",
            _id: "67510ec22284f9bca4aca70a",
            slug: "bahan-bakar",
          },
          created_at: "2025-01-22T14:13:12.000Z",
        },
        {
          small_text: "SPKLU",
          title: "SPKLU",
          description:
            '<p style="text-align:justify;">SPKLU (Stasiun Pengisian Kendaraan Listrik Umum) Ini merupakan fasilitas yang disediakan untuk mengisi daya baterai kendaraan listrik, seperti mobil dan motor listrik. SPKLU berfungsi seperti stasiun pengisian bahan bakar konvensional, namun khusus untuk kendaraan berbasis listrik. Umumnya, SPKLU dilengkapi dengan berbagai jenis charger yang mendukung kebutuhan daya yang berbeda, mulai dari fast charging hingga slow charging. Kehadiran SPKLU bertujuan untuk mendukung perkembangan ekosistem kendaraan listrik, mempermudah akses pengisian daya, dan mendorong masyarakat untuk beralih ke kendaraan yang lebih ramah lingkungan.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Pertamina Retail secara aktif mengembangkan infrastruktur untuk mendukung ekosistem kendaraan listrik di Indonesia dengan mengelola Stasiun Pengisian Kendaraan Listrik Umum (SPKLU) di berbagai lokasi SPBU. Langkah ini sejalan dengan komitmen Pertamina dalam mendukung program pemerintah untuk percepatan elektrifikasi kendaraan bermotor guna mengurangi emisi karbon dan ketergantungan pada bahan bakar fosil. Dengan mengedepankan kemudahan akses dan efisiensi pengisian daya, Pertamina Retail berupaya memberikan pengalaman pengisian daya yang aman, cepat, dan nyaman bagi pengguna kendaraan listrik.</p>',
          _id: "6790fc1fa85144086fc8134b",
          slug: "spklu",
          order: 7,
          thumbnail_images: [
            {
              _id: "67c5b9eec029eb63bd5ac39e",
              title: "SPKLU",
              description: "SPKLU",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/069fb6f1-7965-44b5-9f69-7ca01047f6a1.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/955bee2d-58f2-439d-b183-47cad8ec6c89.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Bahan Bakar",
            _id: "67510ec22284f9bca4aca70a",
            slug: "bahan-bakar",
          },
          created_at: "2025-01-22T14:09:35.000Z",
        },
        {
          small_text: "SPBKLU",
          title: "SPBKLU",
          description:
            '<p style="text-align:justify;">SPBKLU atau Stasiun Penukaran Baterai Kendaraan Listrik Umum adalah fasilitas yang menyediakan layanan penukaran baterai untuk kendaraan listrik, terutama sepeda motor listrik. Konsep SPBKLU memungkinkan pengguna kendaraan listrik untuk menukar baterai yang habis dengan baterai yang sudah terisi penuh secara cepat dan efisien, tanpa perlu menunggu waktu pengisian ulang. Hal ini membantu mengatasi keterbatasan jarak tempuh kendaraan listrik.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Pertamina Retail turut berperan dalam pengembangan ekosistem kendaraan listrik di Indonesia dengan mengelola SPBKLU yang ditempatkan di beberapa SPBU yang kami kelola. Inisiatif ini bertujuan untuk mempermudah akses pengguna kendaraan listrik dalam menukar baterai di lokasi yang strategis dan mudah dijangkau. Dengan memanfaatkan jaringan luas SPBU Pertamina, layanan SPBKLU ini diharapkan dapat meningkatkan kenyamanan dan keandalan penggunaan kendaraan listrik, sekaligus mendukung program pemerintah dalam percepatan penggunaan energi ramah lingkungan.</p>',
          _id: "67c65fd9c029eb63bd5ad6d6",
          slug: "spbklu",
          order: 8,
          thumbnail_images: [
            {
              _id: "67c65fa4c029eb63bd5ad5e8",
              title: "SPBKLU",
              description: "SPBKLU",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/8e78db63-4fbb-488d-b67a-2812364e4dde.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/46f64a00-426d-4640-91eb-9f81d37a453e.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Bahan Bakar",
            _id: "67510ec22284f9bca4aca70a",
            slug: "bahan-bakar",
          },
          created_at: "2025-03-04T02:05:13.000Z",
        },
        {
          small_text: "Kartu Pas RFID",
          title: "Kartu Pas RFID",
          description:
            '<p style="text-align:justify;">Kartu Pas RFID adalah kartu khusus yang memiliki teknologi gelombang radio. Kartu pas RFID atau yang juga disebut PT Pertamina Retail Card ini dapat digunakan sebagai metode pembayaran non tunai bagi pelanggan yang berasal dari korporasi (Business to Business / B2B).</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Kartu Pas RFID memiiliki sejumlah keunggulan, diantaranya memiliki fitur pelaporan otomatis (smart reporting), pembatasan pengisian bahan bakar sesuai kuota yang telah ditetapkan, kepemilikan kartu eksklusif yakni satu kartu untuk satu kendaraan, serta penguncian produk guna meminimalisir kecurangan saat pengisian bahan bakar.</p>',
          _id: "67c660dfc029eb63bd5ad862",
          slug: "kartu-pas-rfid",
          order: 9,
          thumbnail_images: [
            {
              _id: "67c660c4c029eb63bd5ad70c",
              title: "Kartu RFID",
              description: "Kartu RFID",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/afc0e291-6e27-49e3-92c5-bcb062972151.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/ab690c87-11d9-4cef-9153-9d347e47cc77.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Bahan Bakar",
            _id: "67510ec22284f9bca4aca70a",
            slug: "bahan-bakar",
          },
          created_at: "2025-03-04T02:09:35.000Z",
        },
        {
          small_text: "Voucher BBK",
          title: "Voucher BBK",
          description:
            '<p style="text-align:justify;">Voucher BBK merupakan alat pembayaran nontunai yang dapat digunakan untuk membeli berbagai macam produk Pertamina, seperti semua jenis Bahan Bakar Minyak Pertamina baik dalam Pertamax Series maupun Dex Series, serta transaksi di Bright Store maupun Bright Cafe. Voucher BBK tersedia dalam tiga nominal pecahan, yaitu pecahan Rp25.000,- Rp50.000,- dan Rp100.000,-</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Sejumlah keunggulan penggunaan Voucher BBK antara lain, memiliki jaringan penukaran yang luas yakni di SPBU COCO seluruh Indonesia, dapat digunakan untuk pemakaian pribadi maupun sebagai gift/hadiah bagi pengguna lain, menggunakan sistem barcode untuk meningkatkan keamanan transaksi.</p>',
          _id: "67c6616ac029eb63bd5ada9b",
          slug: "voucher-bbk",
          order: 10,
          thumbnail_images: [
            {
              _id: "67c6614dc029eb63bd5ad9c5",
              title: "Voucher BBK",
              description: "Voucher BBK",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/729144c9-9fe9-47e5-8cf1-533667807a1e.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/46fc9ec3-9764-4a2e-aec3-871661c4d7cc.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Bahan Bakar",
            _id: "67510ec22284f9bca4aca70a",
            slug: "bahan-bakar",
          },
          created_at: "2025-03-04T02:11:54.000Z",
        },
      ],
      image: {
        _id: "677b6fbccd255779b6ff2d13",
        title: "Fuel",
        description: "Fuel",
        button_name: "/",
        button_route: "/",
        images: [
          {
            url: "/images/trade.png",
          },
        ],
        images_mobile: [
          {
            url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/069e4f7a-7958-4398-86a3-de40d47191f0.jpeg",
          },
        ],
      },
      _id: "67da5e5c6d53968a302c7b53",
    },
    {
      title: "Digital",
      content: [
        {
          small_text: "Bright Store",
          title: "Bright Store",
          description:
            '<p style="text-align:justify;">Bright Store adalah jaringan toko ritel modern untuk memenuhi kebutuhan pelanggan dengan menyediakan berbagai produk mulai dari makanan dan minuman, kebutuhan harian, hingga layanan tambahan seperti area istirahat yang nyaman.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Dikelola secara profesional oleh Pertamina Retail, Bright Store tidak hanya dapat ditemukan di berbagai SPBU Pertamina, tetapi juga di lokasi-lokasi strategis lainnya. Dengan konsep yang modern dan suasana yang nyaman, Bright Store menjadi pilihan tepat bagi Anda yang membutuhkan kemudahan berbelanja saat dalam perjalanan maupun untuk kebutuhan sehari-hari.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Pertamina Retail berkomitmen untuk terus memberikan pengalaman berbelanja yang praktis, lengkap, dan menyenangkan bagi setiap pelanggan.</p>',
          _id: "6760f88bbd87b48a68a08b92",
          slug: "bright-store",
          order: 1,
          thumbnail_images: [
            {
              _id: "6760f80ebd87b48a68a08b34",
              title: "Bright Store",
              description: "Bright Store",
              button_name: "/",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/f3ad61f5-19f3-4cf3-9624-bac5a1a4d7b8.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/7faf920a-cae2-4342-b2cb-b46548a3781a.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Non-Bahan Bakar",
            _id: "675113f50410ac56b07decaf",
            slug: "non-bahan-bakar",
          },
          created_at: "2024-12-17T04:05:31.000Z",
        },
        {
          small_text: "Bright Cafe",
          title: "Bright Cafe",
          description:
            '<p style="text-align:justify;">Bright Cafe adalah jaringan kafe modern yang hadir untuk memberikan pengalaman bersantai dan menikmati kopi dengan suasana yang nyaman dan hangat. Bright Cafe dapat ditemui di beberapa SPBU yang dikelola oleh Pertamina Retail serta di berbagai lokasi perkantoran dan lokasi strategis lainnya.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Mengusung konsep yang menggabungkan kenyamanan dengan kemudahan akses, Bright Cafe menjadi tempat ideal untuk bersantai sejenak di tengah kesibukan, bertemu dengan kolega, atau sekadar menikmati secangkir kopi berkualitas. Bright Cafe menawarkan pengalaman yang berbeda dalam menikmati kopi di Indonesia.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Dikelola secara profesional oleh Pertamina Retail, setiap Bright Cafe menjamin kualitas layanan dan cita rasa yang konsisten, sehingga selalu menjadi pilihan yang tepat bagi siapa saja yang menginginkan momen rehat yang menyegarkan.</p>',
          _id: "6760fabb335d670515776f2b",
          slug: "bright-cafe",
          order: 2,
          thumbnail_images: [
            {
              _id: "6760fab6335d670515776f11",
              title: "Bright Cafe",
              description: "Bright Cafe",
              button_name: "/",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/c3d16a47-7b83-4f5e-9958-784796c92ab6.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/aa22a803-347a-436e-b694-2bc3bcc14552.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Non-Bahan Bakar",
            _id: "675113f50410ac56b07decaf",
            slug: "non-bahan-bakar",
          },
          created_at: "2024-12-17T04:14:51.000Z",
        },
        {
          small_text: "Solusi Ramah Lingkungan",
          title: "Bright Wash",
          description:
            '<p style="text-align:justify;">Bright Wash merupakan layanan pencucian kendaraan yang dirancang khusus untuk memenuhi kebutuhan pelanggan di SPBU. Dengan menawarkan proses pencucian yang cepat dan efisien, layanan Bright Wash sangat tepat bagi pelanggan yang memiliki waktu terbatas dan mengutamakan kenyamanan serta kepraktisan. Layanan Bright Wash juga sejalan dengan agenda keberlanjutan Pertamina yang mengutamakan penggunaan produk-prooduk berbahan dasar eco-friendly serta metode water treatment yang memungkinkan minimalisasi limbah air.</p>',
          _id: "6760fb20335d670515776f63",
          slug: "bright-wash",
          order: 3,
          thumbnail_images: [
            {
              _id: "6760fb1c335d670515776f46",
              title: "Eco-Friendly Solutions",
              description: "Eco-Friendly Solutions",
              button_name: "/",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/f9304238-fb58-4a40-8296-c4a54fcb5c39.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/66f4e23b-e726-49a8-90cd-d92b4d9f238d.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Non-Bahan Bakar",
            _id: "675113f50410ac56b07decaf",
            slug: "non-bahan-bakar",
          },
          created_at: "2024-12-17T04:16:32.000Z",
        },
        {
          small_text: "Bright Olimart",
          title: "Bright Olimart",
          description:
            '<p style="text-align:justify;">Bright Olimart adalah bengkel modern yang menyediakan beragam produk berkualitas dan pelayanan unggulan bagi pelanggan baik pengguna kendaraan roda dua maupun roda empat. Berbagai layanan yang dapat didapatkan pelanggan diantaranya, pembelian dan penggantian pelumas kendaraan bermotor, dan penggantian atau perbaikan suku cadang kendaraan seperti aki, ban, maupun aksesoris lainnya. Dikelola langsung oleh Pertamina Retail, layanan Bright Olimart dapat dijumpai langsung di jaringan SPBU COCO seluruh Indonesia.</p>',
          _id: "6790fe7ea85144086fc815ea",
          slug: "bright-olimart",
          order: 4,
          thumbnail_images: [
            {
              _id: "6790fe76a85144086fc81587",
              title: "Bright Olimart",
              description: "Bright Olimart",
              button_name: "/",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/1ca9ad40-517f-437a-b6cb-d9e485fddd97.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/823f53bb-aed5-4e1e-afcb-c4cbacece24b.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Non-Bahan Bakar",
            _id: "675113f50410ac56b07decaf",
            slug: "non-bahan-bakar",
          },
          created_at: "2025-01-22T14:19:42.000Z",
        },
        {
          small_text: " ",
          title: "Keagenan Pelumas & LPG",
          description:
            '<p style="text-align:justify;">PT Pertamina Retail menghadirkan jaringan keagenan resmi untuk produk pelumas dan LPG Pertamina guna memastikan ketersediaan energi yang andal dan produk yang berkualitas tinggi bagi masyarakat. Layanan ini dapat ditemukan di SPBU COCO seluruh Indonesia yang dikelola oleh Pertamina Retail.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Mengusung konsep kemudahan akses dan jaminan kualitas terbaik, keagenan ini memberikan solusi bagi pelanggan yang membutuhkan produk pelumas dan LPG untuk kebutuhan rumah tangga dan industri. Dengan jaringan yang luas dan sistem distribusi yang terjamin, pelanggan dapat dengan mudah mendapatkan produk resmi Pertamina dengan mendatangi langsung lokasi SPBU COCO maupun menggunakan layanan Pertamina Delivery Service 135. Dengan standar layanan terbaik, Pertamina Retail berkomitmen untuk mendukung kemudahan akses energi yang terpercaya bagi masyarakat.</p>',
          _id: "67ca61a596906c8f5c41081e",
          slug: "keagenan-pelumas--lpg",
          order: 11,
          thumbnail_images: [
            {
              _id: "67ca618996906c8f5c410747",
              title: " ",
              description: "",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/26a769a9-0189-4565-a723-e1fdaa4a3396.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/d4f70844-9ef3-4d8c-81b7-c85d78760f3c.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Non-Bahan Bakar",
            _id: "675113f50410ac56b07decaf",
            slug: "non-bahan-bakar",
          },
          created_at: "2025-03-07T03:01:57.000Z",
        },
        {
          small_text: "Property Management",
          title: "Property Management",
          description:
            '<p style="text-align:justify;">Property Management adalah layanan optimalisasi ruang dan lahan yang tersedia di jaringan SPBU COCO. Area ini umumnya dimanfaatkan sebagai lokasi strategis berbagai jenis usaha seperti restoran, cafe, ATM, agen perjalanan dan berbagai bisnis lainnya. Dengan model bisnis semacam ini, SPBU COCO tidak hanya berfungsi sebagai tempat pengisian bahan bakar, namun juga layanan tambahan lainnya, dan menjadikan SPBU COCO sebagai one stop service.</p>',
          _id: "67ce69ef0a8606f6fbe82e60",
          slug: "property-management",
          order: 12,
          thumbnail_images: [
            {
              _id: "67ce69c40a8606f6fbe82d84",
              title: " ",
              description: "",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/f6426c99-33bb-490a-9254-2f8d4ba5dd75.png",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/1d8cb5e0-5fa0-4889-9126-80f2aefb918f.png",
                },
              ],
            },
          ],
          category_id: {
            name: "Non-Bahan Bakar",
            _id: "675113f50410ac56b07decaf",
            slug: "non-bahan-bakar",
          },
          created_at: "2025-03-10T04:26:23.000Z",
        },
        {
          small_text: "Periklanan & Promosi",
          title: "Periklanan & Promosi",
          description:
            "<p>Pemanfaatan area strategis SPBU sebagai penempatan media periklanan ATL (above the Line) dan sarana promosi BTL (below the line).</p>",
          _id: "67ce6b1f0a8606f6fbe8318d",
          slug: "periklanan--promosi",
          order: 13,
          thumbnail_images: [
            {
              _id: "67ce6aea0a8606f6fbe83070",
              title: " ",
              description: "",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/3e35493e-b40a-4684-8735-3f5636975389.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/57342293-de0a-433d-9d0b-68302c1f961b.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Non-Bahan Bakar",
            _id: "675113f50410ac56b07decaf",
            slug: "non-bahan-bakar",
          },
          created_at: "2025-03-10T04:31:27.000Z",
        },
        {
          small_text: "MyPertamina Official Merchandise",
          title: "MyPertamina Official Merchandise",
          description:
            '<p style="text-align:justify;">PT Pertamina Retail mengelola dan menjual merchandise eksklusif Pertamina, termasuk Official Merchandise MotoGP Pertamina Mandalika berlisensi Dorna yang dapat dibeli dengan mengunjungi langsung outlet Bright Store maupun melalui aplikasi MyPertamina.</p>',
          _id: "67ce6b920a8606f6fbe83312",
          slug: "mypertamina-official-merchandise",
          order: 14,
          thumbnail_images: [
            {
              _id: "67ce6b740a8606f6fbe83208",
              title: " ",
              description: "",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/9b3829b4-d6a6-4a1b-90de-d5308dcee8e9.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/7f5137c9-58ea-44cf-9826-381e9cbcaf32.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Non-Bahan Bakar",
            _id: "675113f50410ac56b07decaf",
            slug: "non-bahan-bakar",
          },
          created_at: "2025-03-10T04:33:22.000Z",
        },
      ],
      image: {
        _id: "677b6fd3cd255779b6ff2d68",
        title: "none fuel",
        description: "none fuel",
        button_name: "/",
        button_route: "/",
        images: [
          {
            url: "/images/digital.png",
          },
        ],
        images_mobile: [
          {
            url: "/images/digital.png",
          },
        ],
      },
      _id: "67da5e5c6d53968a302c7b54",
    },
    {
      title: "Construction",
      content: [
        {
          small_text: "Energi Terbarukan",
          title: "Energi Terbarukan",
          description:
            '<p style="text-align:justify;">Pertamina Retail berkomitmen dalam pengembangan energi terbarukan melalui berbagai inisiatif ramah lingkungan. Salah satu program unggulan kami adalah pemasangan panel surya di jaringan SPBU yang dikelola oleh Pertamina Retail. Program ini bertujuan untuk mengurangi ketergantungan pada energi fosil dan menurunkan emisi karbon dari operasional SPBU.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Instalasi panel surya di atap SPBU memanfaatkan area yang tersedia untuk menghasilkan energi bersih yang dapat digunakan untuk operasional SPBU. Inisiatif ini tidak hanya mengurangi biaya operasional dalam jangka panjang tetapi juga menjadi wujud nyata komitmen Pertamina Retail terhadap lingkungan dan pembangunan berkelanjutan.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Ke depannya, Pertamina Retail akan terus memperluas program ini ke lebih banyak lokasi SPBU serta mengembangkan teknologi penyimpanan energi untuk mengoptimalkan pemanfaatan energi terbarukan yang dihasilkan.</p>',
          _id: "67e81d9ac029eb63bd5a8f21",
          slug: "energi-terbarukan",
          order: 1,
          thumbnail_images: [
            {
              _id: "67e81d7dc029eb63bd5a8e12",
              title: "Renewable Energy",
              description: "Renewable Energy",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/3deb9d09-607c-4b85-8545-5462daaeeff4.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/3deb9d09-607c-4b85-8545-5462daaeeff4.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Solusi Berkelanjutan",
            _id: "67510fc32284f9bca4aca80b",
            slug: "solusi-berkelanjutan",
          },
          created_at: "2025-03-15T10:25:18.000Z",
        },
        {
          small_text: "Program Konservasi Air",
          title: "Program Konservasi Air",
          description:
            '<p style="text-align:justify;">Pertamina Retail menyadari pentingnya pengelolaan sumber daya air yang berkelanjutan. Oleh karena itu, kami mengembangkan program konservasi air di seluruh jaringan SPBU yang kami kelola. Program ini mencakup beberapa inisiatif seperti sistem pengolahan air limbah (water treatment), penampungan air hujan, dan penggunaan kembali air yang telah diolah untuk kegiatan operasional non-konsumsi.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Melalui sistem pengolahan air limbah yang canggih, air yang digunakan dalam operasional SPBU, terutama dari layanan Bright Wash, dapat diolah dan digunakan kembali untuk keperluan seperti penyiraman tanaman dan pembersihan area SPBU. Selain itu, kami juga mengimplementasikan teknologi penampungan air hujan yang memungkinkan penggunaan air hujan untuk berbagai kebutuhan operasional.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Program konservasi air ini tidak hanya mengurangi konsumsi air bersih tetapi juga meminimalkan pembuangan limbah cair ke lingkungan. Dengan pendekatan yang terintegrasi terhadap pengelolaan air, Pertamina Retail berkomitmen untuk menjadi perusahaan yang bertanggung jawab terhadap lingkungan.</p>',
          _id: "67e82d9ac029eb63bd5a9f31",
          slug: "program-konservasi-air",
          order: 2,
          thumbnail_images: [
            {
              _id: "67e82d7dc029eb63bd5a9e22",
              title: "Water Conservation",
              description: "Water Conservation",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/3deb9d09-607c-4b85-8545-5462daaeeff4.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/3deb9d09-607c-4b85-8545-5462daaeeff4.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Solusi Berkelanjutan",
            _id: "67510fc32284f9bca4aca80b",
            slug: "solusi-berkelanjutan",
          },
          created_at: "2025-03-15T11:30:18.000Z",
        },
        {
          small_text: "Pengelolaan Limbah",
          title: "Pengelolaan Limbah",
          description:
            '<p style="text-align:justify;">Sebagai bagian dari komitmen terhadap lingkungan, Pertamina Retail mengimplementasikan sistem pengelolaan limbah yang komprehensif di seluruh jaringan SPBU yang dikelola. Program ini dirancang untuk mengurangi dampak lingkungan dari operasional SPBU melalui penerapan prinsip 3R (Reduce, Reuse, Recycle).</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Kami memastikan bahwa limbah berbahaya seperti oli bekas dan bahan kimia lainnya dikelola sesuai dengan standar dan peraturan yang berlaku. Selain itu, kami juga menerapkan pemilahan limbah pada sumbernya, menyediakan tempat sampah terpisah untuk limbah organik dan anorganik di area SPBU. Untuk limbah plastik dan kertas, kami bekerja sama dengan mitra daur ulang untuk memastikan bahwa limbah tersebut dapat diproses dan dimanfaatkan kembali.</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Melalui program pengelolaan limbah ini, Pertamina Retail tidak hanya mengurangi jumlah limbah yang berakhir di tempat pembuangan akhir tetapi juga mendukung ekonomi sirkular di mana limbah dapat diubah menjadi sumber daya yang berharga.</p>',
          _id: "67e83d9ac029eb63bd5aaf41",
          slug: "pengelolaan-limbah",
          order: 3,
          thumbnail_images: [
            {
              _id: "67e83d7dc029eb63bd5aae32",
              title: "Waste Management",
              description: "Waste Management",
              button_name: "",
              button_route: "/",
              images: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/3deb9d09-607c-4b85-8545-5462daaeeff4.jpeg",
                },
              ],
              images_mobile: [
                {
                  url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/3deb9d09-607c-4b85-8545-5462daaeeff4.jpeg",
                },
              ],
            },
          ],
          category_id: {
            name: "Solusi Berkelanjutan",
            _id: "67510fc32284f9bca4aca80b",
            slug: "solusi-berkelanjutan",
          },
          created_at: "2025-03-15T12:45:18.000Z",
        },
      ],
      image: {
        _id: "677b7fdccd255779b6ff3e25",
        title: "sustainability",
        description: "sustainability",
        button_name: "/",
        button_route: "/",
        images: [
          {
            url: "/images/construction.png",
          },
        ],
        images_mobile: [
          {
            url: "http://localhost:7152/static//6351115a3ae70d03975326d7/images/3deb9d09-607c-4b85-8545-5462daaeeff4.jpeg",
          },
        ],
      },
      _id: "67da6f5c6d53968a302c8c65",
    },
  ],
};

const HomeBussiness: React.FC<{ data: HomeType }> = ({ data }) => {
  const [selectedTabID, setSelectedTabID] = React.useState(data2.tab[0]._id);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const lang = JSCookie.get("lang") || "id";
  const [isOpen, setIsOpen] = useState<string | null>(null);

  return (
    <section className="relative mt-16">
      {/* heading */}
      <section className="container">
        <h1 className="title-3 text-center">{data2.title}</h1>
      </section>
      {/* main business */}
      <section className="container mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {data2.tab.map((d, index) => (
            <div
              onClick={() => setSelectedTabID(d._id)}
              key={d._id || index}
              className="relative h-[100px] lg:h-[150px] cursor-pointer group"
            >
              <div className="overflow-hidden w-full h-full rounded-2xl relative">
                <img
                  src={d?.image?.images[0]?.url}
                  alt={d?.title}
                  className="w-full h-full object-cover blur-[2px] transition-transform duration-300 group-hover:scale-125"
                />
                <span className="absolute z-10 top-1/2 left-10 -translate-y-1/2 title-4 text-white">
                  {d.title}
                </span>
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl",
                    d._id === selectedTabID
                      ? "bussiness-card-active"
                      : "bussiness-card"
                  )}
                ></div>
              </div>
              <img
                className={cn(
                  "absolute -bottom-7 left-1/2 -translate-x-1/2",
                  d._id === selectedTabID ? "block" : "hidden"
                )}
                src="/icons/arrow-down.png"
                alt="arrow-down"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="container mt-8">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {data2.tab
              .find((d) => d._id === selectedTabID)
              ?.content.map((d, index) => (
                <React.Fragment key={d._id || `content-${index}`}>
                  <CarouselItem className="pl-2 md:pl-4 w-[85%] sm:w-[50%] md:basis-1/3 lg:basis-1/4">
                    <section className="relative h-full rounded-2xl news-card our-business overflow-hidden flex items-end justify-end transition-all">
                      <img
                        className="w-full aspect-square object-cover"
                        src={d?.thumbnail_images[0]?.images[0]?.url}
                        alt={d?.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                        {/* This creates a dark gradient overlay that makes text more readable */}
                      </div>

                      {/* Content */}
                      <section className="absolute z-20 bottom-0 left-0 right-0 text-white p-4 md:p-6">
                        {/* Title */}
                        <h1 className="text-base md:text-lg font-semibold">
                          {d.title}
                        </h1>

                        <Button
                          rounded
                          size="sm"
                          className="w-full md:w-fit mt-3 text-sm md:text-base shadow-sm"
                          onClick={() => setIsOpen(d._id)}
                        >
                          <span className="mr-1">
                            {lang === "en" ? "Learn More" : "Selengkapnya"}
                          </span>
                          <ArrowRight size={16} />
                        </Button>
                      </section>
                    </section>
                  </CarouselItem>

                  <Modal
                    isOpen={isOpen === d._id}
                    onClose={() => setIsOpen?.(null)}
                  >
                    <header className="flex items-center justify-between mt-2 mb-3">
                      <section id="title">
                        <p className="text-lg text-green-light font-semibold">
                          {d.title}
                        </p>
                      </section>
                      <div className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X
                          className="w-5 h-5"
                          onClick={() => setIsOpen?.(null)}
                        />
                      </div>
                    </header>

                    <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                      <div className="md:order-2 w-full mb-4 md:mb-0">
                        <img
                          src={d?.thumbnail_images[0]?.images[0]?.url}
                          className="w-full rounded-md object-cover aspect-square"
                          alt={d.title}
                        />
                      </div>
                      <div
                        className="md:order-1 h-full max-h-[40vh] md:max-h-[60vh] lg:max-h-[50vh] overflow-y-auto pr-1 scrollbar-custom"
                        dangerouslySetInnerHTML={{
                          __html: d.description,
                        }}
                      ></div>
                    </div>
                  </Modal>
                </React.Fragment>
              ))}
          </CarouselContent>
          <div className="hidden md:flex justify-end gap-2 mt-4">
            <CarouselPrevious className="static transform-none mx-0" />
            <CarouselNext className="static transform-none mx-0" />
          </div>
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex gap-2">
              <CarouselPrevious className="h-8 w-8 static transform-none" />
              <CarouselNext className="h-8 w-8 static transform-none" />
            </div>
          </div>
        </Carousel>
      </section>
    </section>
  );
};

export default HomeBussiness;
