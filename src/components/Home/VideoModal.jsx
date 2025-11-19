import React from "react";

const VideoModal = ({ fullscreenVideo, onClose }) => {
  if (!fullscreenVideo) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-black rounded-lg overflow-hidden shadow-2xl w-full mx-1 xs:mx-2 sm:mx-4 md:mx-6 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-1.5 xs:top-2 sm:top-3 md:top-4 right-1.5 xs:right-2 sm:right-3 md:right-4 z-10 bg-black/80 hover:bg-red-600 text-white w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-red-500"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="aspect-video bg-black">
          <video
            autoPlay
            controls
            controlsList="nodownload"
            className="w-full h-full object-contain"
          >
            <source src={fullscreenVideo.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="bg-gradient-to-t from-black to-black/80 p-2 xs:p-3 sm:p-4 md:p-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1.5 xs:gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-accent text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl uppercase mb-0.5 xs:mb-1 font-bold truncate">
                {fullscreenVideo.client}
              </h3>
              <p className="text-white/80 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-gotham font-medium line-clamp-2">
                {fullscreenVideo.title}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-red-primary text-xs xs:text-sm sm:text-base md:text-lg uppercase tracking-widest font-gotham font-bold whitespace-nowrap">
                {fullscreenVideo.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;