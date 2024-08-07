"use client";
import { Box, Image } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NewCapaign from "../molecules/new-campaign";
import { useGlobalContext } from "@/contexts/GlobalContext";

interface Draft {
  id: string;
  shop: string;
  campaignTitle: string;
  products: string[];
  endDate: Date;
}

const QueryIntents = ({ id: slug }: { id?: any }) => {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [submiting, setSubmiting] = useState(false);
  const [fetching, setFetching] = useState(true);
  const id = slug && slug.params.id ? slug.params.id : null;
  const { startCampaign } = useGlobalContext();
  

  useEffect(() => {
    if (id) {
      console.log(id);
      const fetchDraft = async () => {
        try {
          const response = await fetch(`/api/draft?id=${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Failed to save draft");
          }
          const data = await response.text();
          setDraft(JSON.parse(data) as any);
          console.log("Draft retrieved with ID:", data);
        } catch (error) {
          console.error("Error saving draft:", error);
        }
      };
      fetchDraft();
    }
    setFetching(false);
  }, [slug, fetching]);

  const handleSubmit = async (payload: any) => {
    setSubmiting(true);
    console.log(payload);
    try {
      await startCampaign(payload.shop, payload.id, 604800);
      setSubmiting(false);
    } catch (e) {
      setSubmiting(false);
      console.log(e);
    }
  };

  return (
    <>
      {fetching ? (
        <div />
      ) : !draft ? (
        <Box className="pt-8 flex flex-col justify-between items-center gap-5 min-h-72 relative">
          <Box
            zIndex={0}
            as="div"
            opacity={0.8}
            className="bg-red-500 w-full h-16 absolute bottom-0 -z-0"
          />

          <div className="flex justify-between flex-row w-full pb-5">
            <div className="text-2xl font-bold">
              <img
                alt="fairplay-logo"
                src={"/title-logo.png"}
                style={{
                  height: "80px",
                  width: "auto",
                }}
              />
              <br />
              Exclusive Airdrops!
              <br />{" "}
              <span className="text-sm">
                when you buy Sports Merchs from our Stores..
              </span>
            </div>

            <div className="relative">
              <Image
                zIndex={"tooltip"}
                className="mt-[-10] z-50"
                alt="fairplay-cover"
                src={"/cover.png"}
                width={300}
                height={300}
              />
            </div>
          </div>
        </Box>
      ) : (
        <Box className="w-full flex justify-center flex-row">
          <NewCapaign
            title={"Publish Camapign"}
            docId={id}
            isDisabled={false}
            onSubmit={handleSubmit}
            draft={draft}
          />
        </Box>
      )}
    </>
  );
};

export default QueryIntents;
