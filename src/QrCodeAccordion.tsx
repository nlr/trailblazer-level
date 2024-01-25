import { useState } from "react";
export const QrCodeAccordion: React.FC = () => {
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);

  const AddressList = () => {
    type Address = {
      [key: string]: string;
    };

    const addresses: Address[] = [
      { btc: "bc1qdln58ccjakaxjecuvf87mhuhaew4qq064e3rnc" },
      { eth: "0x30442505D1EAA92A984047Ba13F77CB22ACbD149" },
      { ton: "EQD0JzxoU4J5VlnPkUVKKL7SHTKmmA1YRA31vbCvydKXrZGD" },
    ];

    return (
      <div>
        {addresses.map((address, index) => {
          const currency = Object.keys(address)[0];
          const value = address[currency];

          return (
            <div
              key={index}
              className="flex flex-col bg-gray-50 -mt-1 pt-1 pb-1"
            >
              <p>{currency.toUpperCase()}:</p>
              <p className="break-words p-2">{value}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-4 my-4">
      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button
            className="w-full inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
            type="button"
            onClick={() => setIsQrCodeOpen(!isQrCodeOpen)}
          >
            Appreciate my work? Show some love ❤!
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          className={`${isQrCodeOpen ? "block" : "hidden"} text-center`}
        >
          <AddressList />
        </div>
      </div>
    </div>
  );
};
