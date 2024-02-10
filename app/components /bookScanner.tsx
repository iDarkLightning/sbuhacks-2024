import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useZxing } from "react-zxing";
import { trpc } from "../lib/trpc";

const Inner = () => {
  const [result, setResult] = useState("");
  const utils = trpc.useUtils();
  const scan = trpc.book.scan.useMutation({
    onSuccess: () => utils.book.getShelf.invalidate(),
  });

  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());

      scan.mutate({ isbn: result.getText() });
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
