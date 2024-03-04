import { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import AppLogo from "../../assets/logo.png";
import { useOAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function SigninScreen() {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  const googleSignin = useCallback(async () => {
    console.log("googleSignin");
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      console.log("createdSessionId", createdSessionId);

      if (createdSessionId) {
        if (!setActive) {
          console.error("setActive is not defined");
          return;
        }
        await setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", JSON.stringify(err));
    }
  }, [startOAuthFlow]);

  const iconSize = 18;

  return (
    <View className="flex-1 justify-center items-center bg-green-400">
      <Image
        className="rounded-full"
        source={{ uri: "http://placekitten.com/200/300" }}
      />

      <TouchableOpacity
        className="flex items-center flex-row bg-blue-500 p-3 rounded-full mb-4"
        onPress={googleSignin}
      >
        <AntDesign
          className="mr-2"
          name="google"
          size={iconSize}
          color="white"
        />
        <Text className="text-white text-lg">Iniciar sesión con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex items-center flex-row bg-black p-3 rounded-full">
        <AntDesign
          className="mr-2"
          name="apple1"
          size={iconSize}
          color="white"
        />
        <Text className="">Iniciar sesión con Apple</Text>
      </TouchableOpacity>
    </View>
  );
}
