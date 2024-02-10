import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useZxing } from "react-zxing";

export const BookScanner = () => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  useEffect(() => {
    console.log(result);
  }, [result]);

  // https://www.npmjs.com/package/react-qr-barcode-scanner

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="bg-amber-50">
        <video className="rounded-sm" ref={ref} />
        <p>
          <span>Last result:</span>
          <span>{result}</span>
        </p>
      </DialogContent>
    </Dialog>
  );
};
