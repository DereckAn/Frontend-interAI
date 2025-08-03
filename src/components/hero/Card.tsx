import Image from "next/image";
import cerdo from "@/src/assets/cerdo.webp";
import GreenBarcode from "./GreenBarcode";

export interface CardProps {
  name: string;
  title: string;
  id: string;
  job: string;
  image?: string;
  barcodeValue?: string;
}

export const Card = ({
  name,
  title,
  id,
  job,
  image,
  barcodeValue = "123",
}: CardProps) => {
  return (
    <div
      className="border-2 border-green-300/20 rounded-lg
      p-2 sm:p-4 lg:p-6 w-full h-full max-h-[250px] 2xl:max-h-none bg-green-100/35
      flex flex-col justify-between overflow-hidden "
    >
      <div className="flex items-start justify-between text-end min-h-0 flex-shrink-0 mb-2 sm:mb-3 lg:mb-4">
        <Image
          src={image || cerdo}
          alt={name}
          width={200}
          height={200}
          className="rounded-md sm:rounded-xl size-[40px] sm:size-[70px] lg:size-[90px] object-cover flex-shrink-0"
        />
        <div className="flex flex-col ml-2 min-w-0 flex-1 overflow-hidden">
          <h3 className="text-[9px] sm:text-sm lg:text-lg text-green-300/80 leading-tight uppercase truncate">
            {name}
          </h3>
          <h4 className="text-[8px] sm:text-xs lg:text-base text-green-300/50 leading-tight uppercase truncate">
            {title}
          </h4>
          <p className="text-[7px] sm:text-[10px] lg:text-sm text-green-300/20 mt-1 sm:mt-2 lg:mt-3 tracking-widest truncate">
            {id}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end min-h-0 overflow-hidden">
        <h2 className="text-[11px] sm:text-base lg:text-xl flex items-start text-green-300 mb-2 sm:mb-3 lg:mb-4 leading-tight">
          <svg
            fill="#6e9e8f30"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            width="90px"
            height="90px"
            viewBox="-32.23 -32.23 188.42 188.42"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
            stroke="#6e9e8f30"
            strokeWidth="0.00123959"
            className="size-2.5 sm:size-4 lg:size-5 flex-shrink-0 mr-1 mt-0.5"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#6e9e8f"
              strokeWidth="14.131325999999998"
            >
              <g>
                <path d="M85.742,1.779l-56,56c-2.3,2.3-2.3,6.1,0,8.401l56,56c3.801,3.8,10.2,1.1,10.2-4.2v-112 C95.942,0.679,89.543-2.021,85.742,1.779z"></path>
              </g>
            </g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path d="M85.742,1.779l-56,56c-2.3,2.3-2.3,6.1,0,8.401l56,56c3.801,3.8,10.2,1.1,10.2-4.2v-112 C95.942,0.679,89.543-2.021,85.742,1.779z"></path>
              </g>
            </g>
          </svg>
          <span className="leading-tight flex-1 min-w-0 truncate text-[11px] sm:text-base lg:text-xl">
            {job}
          </span>
        </h2>

        <div className="flex items-end gap-1 sm:gap-2 min-h-0">
          <div className="space-y-0.5 sm:space-y-1 w-full flex-1 min-w-0">
            <div className="flex gap-0.5 sm:gap-1">
              <div className="h-1 sm:h-1.5 lg:h-2 bg-green-300/10 rounded-full w-[35%] flex-shrink-0" />
              <div className="h-1 sm:h-1.5 lg:h-2 bg-green-300/10 rounded-full w-[15%] flex-shrink-0" />
              <div className="h-1 sm:h-1.5 lg:h-2 bg-green-300/10 rounded-full w-1.5 sm:w-2 lg:w-2 flex-shrink-0" />
              <div className="h-1 sm:h-1.5 lg:h-2 bg-green-300/10 rounded-full w-1.5 sm:w-2 lg:w-2 flex-shrink-0" />
              <div className="h-1 sm:h-1.5 lg:h-2 bg-green-300/10 rounded-full w-[15%] flex-shrink-0" />
            </div>
            <div className="flex gap-0.5 sm:gap-1">
              <div className="h-1 sm:h-1.5 lg:h-2 bg-green-300/10 rounded-full w-[15%] flex-shrink-0" />
              <div className="h-1 sm:h-1.5 lg:h-2 bg-green-300/10 rounded-full w-[30%] flex-shrink-0" />
              <div className="h-1 sm:h-1.5 lg:h-2 bg-green-300/10 rounded-full w-[15%] flex-shrink-0" />
            </div>
          </div>
          <div id="barcode" className="flex-shrink-0">
            <GreenBarcode
              value={barcodeValue}
              width={30}
              height={18}
              className="sm:w-[45px] sm:h-[22px] lg:w-[50px] lg:h-[25px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
