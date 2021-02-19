import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, Box, Link, Tooltip, IconButton } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
}) => {
  const [, deletePost] = useDeletePostMutation();

  return (
    <Flex>
      <Box mr={2}>
        <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
          <Link>
            <Tooltip label="Edit Post" aria-label="Edit Post">
              <IconButton
                aria-label="Edit Post"
                icon={<EditIcon />}
                bottom={-6}
              />
            </Tooltip>
          </Link>
        </NextLink>
      </Box>
      <Box>
        <Tooltip label="Delete Post" aria-label="Delete Post">
          <IconButton
            aria-label="Delete Post"
            icon={<DeleteIcon />}
            bottom={-6}
            onClick={() => {
              deletePost({ id });
            }}
          />
        </Tooltip>
      </Box>
    </Flex>
  );
};
