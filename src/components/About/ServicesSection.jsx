import React from "react";
import RevealText from "../RevealText"; // importa tu componente

const ServicesSection = () => {
  const serviceColumns = [
    {
      title: "Photography",
      services: [
        "Fashion and editorial campaigns",
        "Corporate and artistic portraits",
        "Advertising photography",
        "Event photo coverage",
        "Product photography",
        "Film and video stills",
      ],
      key: "photography",
    },
    {
      title: "Equipment Rental",
      services: [
        "Monitors, transmitters, and on-set accessories",
        "Grip gear, tripods, C-stands, and rigging",
        "Professional audio and microphones",
        "Cinema lenses and accessories",
        "Fully equipped soundstage",
        "Digital cinema cameras",
        "Professional lighting",
      ],
      key: "equipment",
    },
    {
      title: "Live Events & Broadcasts",
      services: [
        "Live graphics integration (visuals and overlays)",
        "Event recording and post-event recap videos",
        "Multicam closed-circuit operation (CCTV)",
        "Live event production and coverage",
        "Technical and creative coordination",
        "Real-time multiplatform streaming",
        "Screen setup and AV equipment",
      ],
      key: "liveEvents",
    },
    {
      title: "Production",
      services: [
        "Corporate and institutional productions",
        "Testimonial capsules and interviews",
        "Advertising and commercial videos",
        "High-end social media content",
        "Series and cinematic projects",
        "Product and fashion spots",
        "Aerial drone filming",
        "Event coverage",
        "Music videos",
      ],
      key: "production",
    },
  ];

  return (
    <div className="section">
      <div className="min-h-[90vh] bg-black-pure text-white-pure flex items-center overflow-hidden pb-0">
        <div className="w-full border-0">
          <div className="w-full">
            <RevealText
              as="p"
              className="text-[12px] text-white-pure uppercase tracking-[0.3em] text-left mb-3 font-gotham font-medium px-4 sm:px-6 lg:px-8 xl:px-20"
            >
              OUR CAPABILITIES
            </RevealText>

            <RevealText
              as="h2"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gotham font-black uppercase tracking-tight text-white-pure text-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-8 xl:px-20"
            >
              How We Can Help
            </RevealText>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-16 xl:gap-20 justify-items-center px-0">
              {serviceColumns.map((column) => (
                <div
                  key={column.key}
                  className="text-center min-w-0 p-6 lg:p-8 h-full"
                >
                  <RevealText
                    as="h3"
                    className="text-white-pure text-[13px] uppercase tracking-[0.3em] mb-4 font-gotham font-bold whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {column.title}
                  </RevealText>
                  <ul className="space-y-2">
                    {column.services.map((service, index) => (
                      <RevealText
                        as="li"
                        key={index}
                        className="text-white-pure text-[12px] tracking-wide font-gotham font-light leading-tight break-keep whitespace-nowrap overflow-hidden text-ellipsis"
                      >
                        {service}
                      </RevealText>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;