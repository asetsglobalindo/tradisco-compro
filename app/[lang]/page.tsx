import HomeBanner from "@/components/HomeBanner";
import HomeGrowth from "@/components/HomeGrowth";
import HomeLocator from "@/components/HomeLocator";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

export default function Home() {
  return (
    <section>
      <HomeBanner />
      {/* our bussiness */}
      <section className="relative mt-32">
        {/* heading */}
        <section className="container">
          <h1 className="title-3 text-center">
            Our <span className="text-green-light">Bussines</span>
          </h1>
        </section>

        {/* main bussiness */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 container mt-8">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <section key={index} className="relative rounded-2xl h-full max-h-[200px]  overflow-hidden ">
                <img className="blur-[2px] object-cover w-full" src="/temp/our-bussines.png" alt="" />
                <span className="absolute z-10 top-1/2 left-10 title-4 text-white">NONFUEL</span>
                <div className="absolute top-0 left-0 w-full h-full bussiness-card"></div>
              </section>
            ))}
        </section>

        <section className="container mt-8">
          <Carousel>
            <CarouselContent>
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <CarouselItem key={index} className="basis-1/3">
                    <section className="relative rounded-2xl news-card overflow-hidden  flex items-end justify-end transition-all">
                      <img className="blur-[2px] aspect-square object-cover" src="/temp/our-bussines.png" alt="" />

                      {/* content */}
                      <section className="absolute z-20 text-white px-8 py-8 transition-all flex flex-col">
                        {/* category */}
                        <span className="text-green-light">Bright Wash</span>
                        {/* title */}
                        <h1 className="mt-2 text-lg font-semibold max-w-[70%] ">
                          Revitalize Your Vehicle with Bright Wash
                        </h1>
                        <button className="flex space-x-1  border-green-light bg-green-light w-fit border px-6 py-3 rounded-full items-center mt-4">
                          <span>Learn More</span>
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.21216 8.63376H12.721M12.721 8.63376L9.1552 4.51709M12.721 8.63376L9.1552 12.7504"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </section>

                      {/* background shade */}
                      <div className="absolute top-0 left-0 w-full h-full news-card"></div>
                    </section>
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </section>

      <HomeLocator />

      {/* growth revenue */}
      <HomeGrowth />

      {/* News */}
      <section className="relative mt-32">
        {/* heading */}
        <section className="container flex justify-between items-center">
          <h1 className="title-3">
            Lastest <span className="text-green-lighter">News</span>
          </h1>

          <button className="flex border-green border px-8 py-4 rounded-full items-center">
            <span className="leading-none">See More</span>
            <img src="/icons/arrow-button-right.svg" alt="" />
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

