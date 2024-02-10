import React, { Suspense, useEffect, useState } from "react";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useZxing } from "react-zxing";
import { Drawer } from "vaul";
import { trpc } from "../lib/trpc";
import { Button } from "./ui/button";

const VerifyBook: React.FC<{ isbn: string }> = (props) => {
  const [book] = trpc.book.getOpenLibraryBook.useSuspenseQuery({
    isbn: props.isbn,
  });

  return (
    <div className="flex items-center justify-center flex-col gap-3">
      <img src={book.cover} alt={book.title} className="max-w-md rounded-md" />
      <div className="text-center">
        <p className="font-medium text-xl">{book.title}</p>
        <p className="text-zinc-600">{book.author_name.join(",")}</p>
      </div>
    </div>
  );
};

const Scanner: React.FC<{
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsbn: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
  const [result, setResult] = useState("");

  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();
      setResult(text);
      props.setIsbn(text);

      props.setIsOpen(true);
    },
  });

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div className="h-96 rounded-md overflow-hidden bg-black">
      <video className="h-full w-full rounded-md aspect-video" ref={ref} />
    </div>
  );
};

export const BookScanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isbn, setIsbn] = useState<string>("");
  const utils = trpc.useUtils();

  const scan = trpc.book.scan.useMutation({
    onSettled: () => {
      setIsOpen(false);

      utils.book.getShelf.invalidate();
    },
  });

  const addBook = () => {
    console.log("HI??");
    scan.mutate({ isbn });
  };

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button>Scan New Book</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 right-0 left-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-4" />
            <div className="flex items-center justify-center flex-col">
              <Drawer.Title className="font-medium mb-1 text-center text-xl">
                Scan your book
              </Drawer.Title>
              <p className="text-zinc-600 mb-2 text-sm text-center max-w-64">
                Use your camera to scan the barcode at the back of your book
              </p>
            </div>
            <div className="my-4">
              <Scanner setIsOpen={setIsOpen} setIsbn={setIsbn} />
            </div>
            <Drawer.NestedRoot open={isOpen} onOpenChange={setIsOpen}>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="bg-amber-50 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 right-0 left-0 min-h-[45%]">
                  <div className="p-4 bg-amber-50 rounded-t-[10px] flex-1">
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-4" />
                    <div className="flex items-center justify-center flex-col">
                      <Drawer.Title className="font-medium mb-1 text-center text-xl">
                        Is this your Book?
                      </Drawer.Title>
                      <p className="text-zinc-600 mb-2 text-sm text-center max-w-52">
                        Please verify that we have the correct book
                      </p>
                    </div>
                    <div className="my-4">
                      <Suspense fallback={"Loading..."}>
                        <VerifyBook isbn={isbn} />
                      </Suspense>
                    </div>
                    <div className="w-full flex gap-2">
                      <Button className="flex-1" onClick={addBook}>
                        Add
                      </Button>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.NestedRoot>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
