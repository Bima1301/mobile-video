import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButtom from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwirte";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",

    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
     
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-psemibold mt-10">
            Sign Up to Aora
          </Text>
          <FormField
            title="Username"
            placeholder="Enter your username"
            value={form.username}
            handleChange={(text) => setForm({ ...form, username: text })}
            otherStyles="mt-10"
            keyboardType="username-address"
          />
          <FormField
            title="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChange={(text) => setForm({ ...form, email: text })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChange={(text) => setForm({ ...form, password: text })}
            otherStyles="mt-7"
          />

          <CustomButtom
            containerStyle="mt-7"
            title={"Sign Up"}
            handlePress={handleSubmit}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2 text-base">
            <Text className="text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link href={"/sign-in"} className="text-secondary font-psemibold ">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
