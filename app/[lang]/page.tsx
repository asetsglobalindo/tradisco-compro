import HomeBanner from "@/components/HomeBanner";
import HomeBussiness from "@/components/HomeBussiness";
import HomeGrowth from "@/components/HomeGrowth";
import HomeLocator from "@/components/HomeLocator";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Pertamina Retail",
};

export default function Home() {
  return (
    <section>
      <HomeBanner />
      {/* our bussiness */}
      <HomeBussiness />

      <HomeLocator />

      {/* growth revenue */}
      <HomeGrowth />

      {/* News */}
      <section className="relative mt-16 lg:mt-32">
        {/* heading */}
        <section className="container flex justify-between items-center">
          <h1 className="title-3">
            Lastest <span className="text-green-light">News</span>
          </h1>

          <button className="flex border-green group hover:bg-green-light transition-all hover:text-white border px-8 py-4 rounded-full items-center">
            <span className="leading-none">See More</span>
            <svg width="25" height="14" viewBox="0 0 25 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.4766 7.77772H5.97656C5.55656 7.77772 5.22656 7.4355 5.22656 6.99995C5.22656 6.56439 5.55656 6.22217 5.97656 6.22217H19.4766C19.8966 6.22217 20.2266 6.56439 20.2266 6.99995C20.2266 7.4355 19.8966 7.77772 19.4766 7.77772Z"
                fill="currentColor"
              />
              <path
                d="M15.7266 13.2221C15.6282 13.2234 15.5307 13.2033 15.4403 13.1631C15.3498 13.1229 15.2685 13.0635 15.2016 12.9888C14.9016 12.6777 14.9016 12.1955 15.2016 11.8844L19.9266 6.98436L15.2016 2.08436C14.9016 1.77325 14.9016 1.29103 15.2016 0.979915C15.5016 0.668804 15.9666 0.668804 16.2666 0.979915L21.5166 6.42436C21.8166 6.73547 21.8166 7.21769 21.5166 7.5288L16.2666 12.9732C16.1166 13.1288 15.9216 13.2066 15.7416 13.2066L15.7266 13.2221Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </section>

        {/* news */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container mt-8">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <section
                key={index}
                className="relative rounded-2xl news-card overflow-hidden group flex items-end justify-end"
              >
                <img className="blur-[2px]" src="/temp/img-gasoline.png" alt="" />

                {/* content */}
                <section className="absolute z-20  text-white px-8 py-16">
                  {/* category */}
                  <span className="text-green-lighter">Article / News</span>

                  {/* title */}
                  <h1 className="title-4 mt-4">Pertamina Retail Promotes “Paperless Movement” with AR Catalogue</h1>
                  <p className="mt-4">
                    Pertamina is committed to supporting the paperless movement by using the Augmented Reality (AR)
                    Catalogue,...
                  </p>
                  <span className="text-xs mt-8 inline-block">10/Oktober/2024</span>

                  <button className="flex border-green-lighter border px-6 py-3 rounded-full items-center mt-8">
                    <span className="leading-none">See More</span>
                  </button>
                </section>

                {/* background shade */}
                <div className="absolute top-0 left-0 w-full h-full news-card group-hover:bg-none  group-hover:bg-green-light transition-all duration-500"></div>
              </section>
            ))}
        </section>
      </section>
    </section>
  );
}

