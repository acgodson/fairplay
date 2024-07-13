"use client";
import { Box, Image } from "@chakra-ui/react";
import React, { useState } from "react";

const QueryIntents = () => {
  return (
    <Box className="pt-8 flex flex-col justify-between items-center gap-5 min-h-72 relative">
      <Box
        zIndex={0}
        as="div"
        opacity={0.8}
        // mb={4}
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
  );
};

export default QueryIntents;
