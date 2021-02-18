import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from "../generated/graphql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { UpdootSection } from "../components/UpdootSection";
import { DeleteIcon } from "@chakra-ui/icons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  const [currUser] = useMeQuery();

  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div> your query failed for some reason..</div>;
  }

  return (
    <Layout>
      <Flex align="center">
        <Heading>The Feed</Heading>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box ml={4} flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>by {p.creator.username}</Text>
                  <Flex>
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                    {p.creator.username === currUser.data?.me?.username ? (
                      <Box ml="auto">
                        <Tooltip label="Delete Post" aria-label="Delete Post">
                          <IconButton
                            aria-label="Delete Post"
                            icon={<DeleteIcon />}
                            bottom={-6}
                            onClick={() => {
                              deletePost({ id: p.id });
                            }}
                          />
                        </Tooltip>
                      </Box>
                    ) : null}
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more posts
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
