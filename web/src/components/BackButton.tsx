import { ArrowBackIcon } from "@chakra-ui/icons";
import { Tooltip, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface BackButtonProps {
  width: number;
  height: number;
}

export const BackButton: React.FC<BackButtonProps> = ({ width, height }) => {
  const router = useRouter();
  return (
    <Tooltip label="Back" aria-label="Back to previous page">
      <IconButton
        aria-label="Back to previous page"
        icon={<ArrowBackIcon w={width} h={height} />}
        onClick={() => {
          router.back();
        }}
      />
    </Tooltip>
  );
};
