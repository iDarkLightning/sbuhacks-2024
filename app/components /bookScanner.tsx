import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useZxing } from "react-zxing";

const Inner = () => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <>
      <video ref={ref}></video>
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};

export const BookScanner = () => {
  // https://www.npmjs.com/package/react-qr-barcode-scanner

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <IoIosAddCircle className="text-2xl hover:text-lime-600 transition-colors outline-1" />
        </DialogTrigger>
        <DialogContent className="bg-amber-50">
          <Inner />
        </DialogContent>
      </Dialog>
    </>
  );
};
