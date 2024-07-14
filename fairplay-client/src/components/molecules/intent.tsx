import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Clock, Hourglass, Loader, ExternalLinkIcon } from "lucide-react";

import { Button } from "../atoms/button";
import { Separator } from "../atoms/separator";
import { cn } from "../../../utils";

import { Alert, AlertDescription } from "../atoms/alert";

import NewVoteIntent from "./new-campaign";

const IntentHead = ({ campaign }: { campaign: any }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <div className="relative w-fit">
          <Hourglass />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          {campaign.metadata.campaignTitle}
        </h3>
      </div>
      <div className="flex gap-2 bg-slate-200 p-1 rounded-lg text-gray-700">
        {(campaign as any)?.documentTitle}
      </div>
    </div>
  );
};

const IntentBody = ({
  shop,
  onSubmit,
  products
}: {
  onSubmit: Function;
  shop: string;
  products: any
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voting, setVoting] = useState(false);

  const handleButtonClick = async () => {
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* <Alert variant="destructive">
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert> */}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-2 text-gray-700 text-base font-semibold w-full">
       
       Eligible Products:
          <p className="text-gray-500 font-bold text-xs cursor-pointer  underline">
            🔗 {  products?.map((x: any) => x.name).join(", ") || ""}
          </p>
        </div>
        <div className="flex w-full gap-2 items-center">
          <Separator
            className=" bg-slate-200 hidden sm:block"
            orientation="vertical"
          />

          {/* <NewVoteIntent
            isDisabled={false}
            title={"Publish"}
            docId={"0"}
            onSubmit={() => {}}
          /> */}

          <Button
            className={cn("bg-zinc-800 text-white hover:bg-zinc-700 w-full")}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Closing..."
            ) : (
              <a
                href={`https://${shop}`}
                target="_blank"
                className="flex flex-row gap-2 justify-center items-center"
              >
                <ExternalLinkIcon className="w-4 h-4" />
                <p>Open on Shopify</p>
              </a>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { IntentBody, IntentHead };
