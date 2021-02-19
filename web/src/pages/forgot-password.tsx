import { Box, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { BackButton } from "../components/BackButton";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <Wrapper variant="small">
      <Flex>
        <Box left="-4.5rem" position="relative">
          <BackButton width={8} height={8} />
        </Box>
        <Box left={-10} position="relative" width="100%">
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              await forgotPassword(values);
              setComplete(true);
            }}
          >
            {({ isSubmitting }) =>
              complete ? (
                <Box>
                  if an account with that email exists, we will send an email!
                </Box>
              ) : (
                <Form>
                  <InputField
                    name="email"
                    placeholder="email"
                    label="Email"
                    type="email"
                  ></InputField>
                  <Button
                    mt={4}
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="teal"
                  >
                    forgot password
                  </Button>
                </Form>
              )
            }
          </Formik>
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
