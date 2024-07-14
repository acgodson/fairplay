import React, { useEffect, useState } from "react";

import { Button } from "../atoms/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../atoms/dialog";
import { Divider } from "@chakra-ui/react";
import { useGlobalContext } from "@/contexts/GlobalContext";

interface Draft {
  id: string;
  shop: string;
  campaignTitle: string;
  products: string[];
  endDate: Date;
}

const NewCapaign = ({
  title,
  isDisabled,
  docId,
  onSubmit,
  draft,
}: {
  title: string;
  docId: string;
  isDisabled: boolean;
  onSubmit: (payload: any) => void;
  draft?: Draft;
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [rewardType, setRewardType] = useState<string>("erc20");
  const [rewardAddress, setRewardAddress] = useState<string>(
    process.env.NEXT_PUBLIC_FAIRPLAY_TOKEN || ""
  );
  const [rewardValue, setRewardValue] = useState<string>("");

  const handleSubmit = () => {
    onSubmit({
      shop: draft?.shop,
      type: rewardType,
      token: rewardAddress,
      value: rewardValue,
      id: docId,
      endDate: draft?.endDate.toString(),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-zinc-800 text-white hover:bg-zinc-700"
          disabled={isDisabled}
        >
          {title}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[905px] bg-white sm:rounded-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            <span
              className="bg-gray-200 text-gray-500 p-1"
              style={{
                fontWeight: "lighter",
              }}
            >
              {docId}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-x-2  w-full">
          <div className="flex flex-row w-full justify-between gap-4">
            <div className="w-1/2">
              <p className="text-sm">Shopify Store</p>
              <input
                type="text"
                value={draft?.shop || ""}
                readOnly
                className="w-full p-2 border mb-4 bg-gray-100"
              />
              <br />
              <p className="text-sm">Campaign Title</p>
              <input
                type="text"
                value={draft?.campaignTitle || ""}
                readOnly
                className="w-full p-2 border mb-4  bg-gray-100"
              />

              <p className="text-sm">Campaign Title</p>
              <input
                type="text"
                value={
                  draft?.products?.map((x: any) => x.name).join(", ") || ""
                }
                readOnly
                className="w-full p-2 border mb-4 bg-gray-100"
              />
              <p className="text-sm">End Date</p>
              <input
                type="text"
                value={draft?.endDate.toString() || ""}
                readOnly
                className="w-full p-2 border mb-4 bg-gray-100"
              />
            </div>

            <div className="w-1/2">
              <p className="text-sm">Token Type</p>
              <select
                value={rewardType}
                onChange={(e) => setRewardType(e.target.value)}
                className="w-full p-2 border mb-4"
              >
                <option value="erc20">ERC20</option>
                <option value="erc721">ERC721</option>
              </select>

              <p className="text-sm">Token Address</p>
              <input
                type="text"
                placeholder="Token Address"
                value={rewardAddress}
                onChange={(e) => setRewardAddress(e.target.value)}
                className="w-full p-2 border mb-4"
              />

              <p className="text-sm">Amount per Reward</p>
              <input
                type="text"
                placeholder="Reward Value"
                value={rewardValue}
                onChange={(e) => setRewardValue(e.target.value)}
                className="w-full p-2 border mb-4"
              />
            </div>
          </div>

          <Divider my={4} />

          <Button
            type="submit"
            className="w-full bg-zinc-800 text-white hover:bg-zinc-700"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Publish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewCapaign;
