import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function Settings() {
  const { signOut, sessionId } = useAuth();

  const handleLogout = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const window = {
        addEventListener: () => {
          console.log("addEventListener");
        },
      };
      await signOut(
        () => {
          router.replace("/signin");
        },
        {
          sessionId: sessionId!,
          redirectUrl: "/signin",
        }
      );
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const handleNavigateToBankAccounts = () => {
    // Navegar a la pantalla de cuentas bancarias
  };

  const handleInviteFriends = () => {
    // Lógica para invitar amigos
  };

  return (
    <View className="bg-white h-full flex-1 flex-col justify-between">
      <View className="items-center p-6">
        <Image
          source={{ uri: "http://placekitten.com/200/300" }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text className="text-lg font-semibold mt-4">Nombre de Usuario</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleNavigateToBankAccounts}
          className="flex-row items-center p-4 border-b border-gray-200"
        >
          <Text className="flex-1 text-lg">Mis Cuentas Bancarias</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleInviteFriends}
          className="flex-row items-center p-4 border-b border-gray-200"
        >
          <Text className="flex-1 text-lg">Invitar Amigos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center p-4"
        >
          <Text className="flex-1 text-lg text-red-500 ">Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
