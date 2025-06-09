import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { useTheme } from '../pages/preferencesMenu/themeContext'; // Importe o useTheme

// Importe suas páginas
import homePage from "../pages/homePage";
import Menu from "../pages/menuProfile";

const Tab = createBottomTabNavigator();

export default function Routes() {
  const { theme, currentThemeName } = useTheme(); // Obtenha também o currentThemeName

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 75,
          paddingTop: 20,
          backgroundColor: theme.secondaryBg,
          borderTopColor: theme.secondaryText,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.secondaryText,
      }}
    >
      <Tab.Screen
        name="Home"
        component={homePage}
        options={{
          tabBarIcon: ({ focused }) => {
            let iconSource;
            if (focused) {
              iconSource = require("../assets/icons/listactive.png");
            } else {
              // Se não estiver focado, verifica o tema para o ícone inativo
              iconSource = currentThemeName === 'dark'
                ? require("../assets/icons/list1Dark.png") // Versão Dark para o modo escuro
                : require("../assets/icons/list1.png"); // Versão Light para o modo claro
            }
            return (
              <Image
                source={iconSource}
                style={{ width: 56, height: 56 }}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Menu}
        options={{
          tabBarIcon: ({ focused }) => {
            let iconSource;
            // AQUI ESTÁ A ÚNICA MUDANÇA: bellDark.png em vez de bell(2)Dark.png
            // Note: O arquivo bell(2).png é usado para o modo claro inativo.
            // Se você quiser que o ativo seja sempre bell(2).png e o inativo mude, a lógica abaixo está boa.
            // Se o ativo também precisa mudar para bellDark.png, ajuste o 'focused' if/else.
            iconSource = currentThemeName === 'dark'
              ? require("../assets/icons/bellDark.png") // Corrigido para bellDark.png
              : require("../assets/icons/bell(2).png"); // Mantém bell(2).png para o modo claro
            
            return (
              <Image
                source={iconSource}
                style={{ width: 46, height: 46 }}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="ProfileMenu"
        component={Menu}
        options={{
          tabBarIcon: ({ focused }) => {
            let iconSource;
            if (focused) {
              iconSource = require("../assets/icons/menuactive.png");
            } else {
              // Se não estiver focado, verifica o tema para o ícone inativo
              iconSource = currentThemeName === 'dark'
                ? require("../assets/icons/menuDark.png") // Versão Dark para o modo escuro
                : require("../assets/icons/menu.png"); // Versão Light para o modo claro
            }
            return (
              <Image
                source={iconSource}
                style={{ width: 56, height: 56 }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}