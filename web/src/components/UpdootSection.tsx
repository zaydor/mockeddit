import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Tooltip, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Box>
      <Tooltip label="UpDoot" aria-label="UpDoot Post">
        <ChevronUpIcon
          w={6}
          h={6}
          onClick={async () => {
            setLoadingState("updoot-loading");
            await vote({
              postId: post.id,
              value: 1,
            });
            setLoadingState("not-loading");
          }}
          isLoading={loadingState === "updoot-loading"}
          cursor="pointer"
        />
      </Tooltip>
      <Box textAlign="center">
        <Tooltip label="Total Doots" aria-label="Total Doots on this post">
          <Text>{post.points}</Text>
        </Tooltip>
      </Box>
      <Tooltip label="DownDoot" aria-label="DownDoot Post">
        <ChevronDownIcon
          w={6}
          h={6}
          cursor="pointer"
          onClick={async () => {
            setLoadingState("downdoot-loading");
            await vote({
              postId: post.id,
              value: -1,
            });
            setLoadingState("not-loading");
          }}
          isLoading={loadingState === "downdoot-loading"}
        />
      </Tooltip>
    </Box>
  );
};
