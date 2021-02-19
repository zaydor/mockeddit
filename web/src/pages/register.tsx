import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { BackButton } from "../components/BackButton";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Flex>
        <Box left="-4.5rem" position="relative">
          <BackButton width={8} height={8} />
        </Box>
        <Box left={-10} position="relative" width="100%">
          <Formik
            initialValues={{ email: "", username: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({ options: values });
              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
              } else if (response.data?.register.user) {
                // worked
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="username"
                  placeholder="username"
                  label="Username"
                ></InputField>
                <Box mt={4}>
                  <InputField
                    name="email"
                    placeholder="email"
                    label="Email"
                  ></InputField>
                </Box>
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="password"
                    label="Password"
                    type="password"
                  ></InputField>
                </Box>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="teal"
                >
                  register
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
