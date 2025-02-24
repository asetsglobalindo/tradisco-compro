import Link from "next/link";

interface RelatedPageProps {
  links: {
    href: string;
    image: string;
    alt: string;
    title: string;
  }[];
}

const RelatedPage: React.FC<RelatedPageProps> = ({ links }) => {
    if (!links || links.length === 0) return null;
    const columnCount = Math.min(links.length, 4); 
  
    return (
      <section className="mt-16">
        <section className={`mx-auto grid grid-cols-1 md:grid-cols-${columnCount} gap-0 lg:h-[240px] sm:h-[170px] h-[170px]`}>
          {links.map((link, index) => (
            <Link key={index} href={link.href} className="relative group cursor-pointer overflow-hidden">
              <img 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125" 
                src={link.image} 
                alt={link.alt} 
              />
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full text-white h-full flex flex-col justify-center z-10">
                <h2 className="text-xl font-semibold">{link.title}</h2>
                <p className="hidden group-hover:block text-sm mt-2">Selengkapnya →</p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-2 group-hover:bg-green-light transition-all duration-300"></div>
            </Link>
          ))}
        </section>
      </section>
    );
};

export default RelatedPage;