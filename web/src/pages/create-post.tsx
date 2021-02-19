import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { BackButton } from "../components/BackButton";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useisAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();

  return (
    <Layout variant="small">
      <Flex>
        <Box left="-4.5rem" position="relative">
          <BackButton width={8} height={8} />
        </Box>
        <Box left={-10} position="relative" width="100%">
          <Formik
            initialValues={{ title: "", text: "" }}
            onSubmit={async (values) => {
              const { error } = await createPost({ input: values });
              if (!error) {
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField name="title" placeholder="title" label="Title" />
                <Box mt={4}>
                  <InputField
                    name="text"
                    placeholder="Any thoughts on your mind?"
                    label="Body"
                    textarea
                  />
                </Box>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  create post
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
