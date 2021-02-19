import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, IconButton, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BackButton } from "../../components/BackButton";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { useMeQuery } from "../../generated/graphql";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

export const Post = ({}) => {
  const router = useRouter();
  const [{ data, error, fetching }] = useGetPostFromUrl();
  const [currUser] = useMeQuery();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex align="center">
        <Box mb={4} left={-12} position="relative">
          <BackButton width={8} height={8} />
        </Box>
        <Box left={-10} position="relative">
          <Heading mb={4}>{data.post.title}</Heading>
        </Box>
        {data.post.creator.username === currUser.data?.me?.username ? (
          <Box ml="auto">
            <EditDeletePostButtons id={data.post.id} />
          </Box>
        ) : null}
      </Flex>
      {data?.post?.text}
    </Layout>
  );
};

export default Post;
