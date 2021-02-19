import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { BackButton } from "../../../components/BackButton";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>Post could not be found</div>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Flex>
        <Box left="-4.5rem" position="relative">
          <BackButton width={8} height={8} />
        </Box>
        <Box left={-10} position="relative" width="100%">
          <Formik
            initialValues={{ title: data?.post?.title, text: data?.post?.text }}
            onSubmit={async (values) => {
              await updatePost({ id: intId, ...values });
              router.back();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="title"
                  placeholder={data?.post?.title}
                  label="Title"
                />
                <Box mt={4}>
                  <InputField
                    name="text"
                    placeholder={data?.post?.text}
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
                  update post
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
