import { useState } from "react";
export const QrCodeAccordion: React.FC = () => {
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const address = "EQD0JzxoU4J5VlnPkUVKKL7SHTKmmA1YRA31vbCvydKXrZGD";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
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
          <img className="my-2 rounded-lg" src="/qr.png" />
          <div className="flex flex-col">
            <span className="break-words">{address}</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isCopied ? "Copied!" : "Copy Address"}
          </button>
          <div>
            <span className="text-sm text-gray-500">I accept Toncoin</span>
          </div>
        </div>
      </div>
    </div>
  );
};
