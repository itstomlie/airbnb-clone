import Image from "next/image";

const ImageGallery = ({ images }: { images: string[] | undefined }) => {
  return (
    <div className="h-[50vh]">
      <div className="grid grid-cols-4 gap-2 h-full w-full">
        {images?.map((url, index) => (
          <div
            key={url}
            className={`
              ${index === 0 ? "col-span-2 row-span-2" : ""}
              ${index >= 3 ? "col-span-1" : ""}
              overflow-hidden
              ${index === 0 ? "rounded-l-lg" : ""}
              ${index === 2 ? "rounded-tr-lg" : ""}
              ${index === 4 ? "rounded-br-lg" : ""}
              relative h-full
            `}
          >
            <Image
              src={url}
              alt={`Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
