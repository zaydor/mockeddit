import { Box, Button, Flex, Heading, Link, Tooltip } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  let body = null;

  if (fetching) {
    // data is loading
    body = null;
  } else if (!data?.me) {
    // user is not logged in
    body = (
      <Flex>
        <Box mr={2}>
          <NextLink href="/create-post">
            <Link>create post</Link>
          </NextLink>
        </Box>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">register</Link>
        </NextLink>
      </Flex>
    );
  } else {
    // user is logged in
    body = (
      <Flex align="center">
        <Box>
          <NextLink href="/create-post">
            <Button as={Link} bg="#FEA82F" mr={4}>
              <Link>create post</Link>
            </Button>
          </NextLink>
        </Box>
        <Box mr={4} textColor="#8EF9F3">
          {data.me.username}
        </Box>
        <Button
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex zIndex={1} position="sticky" top={0} p={4} backgroundColor="#171738">
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Tooltip label="Go to The Feed" aria-label="Go to The Feed">
              <Heading color="#8EF9F3">Mockeddit</Heading>
            </Tooltip>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
