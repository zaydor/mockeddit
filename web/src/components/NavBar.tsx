import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
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
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">register</Link>
        </NextLink>
      </>
    );
  } else {
    // user is logged in
    body = (
      <Flex>
        <Box mr={4}>{data.me.username}</Box>
        <Button
          onClick={() => {
            logout();
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
    <Flex zIndex={1} position="sticky" top={0} p={4} backgroundColor="#4FD1C5">
      <Box mr={"auto"}>
        <NextLink href="/">
          <Link>
            <Tooltip label="Go to The Feed" aria-label="Go to The Feed">
              <Text fontSize={20}>
                <b>Mockeddit</b>
              </Text>
            </Tooltip>
          </Link>
        </NextLink>
      </Box>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
