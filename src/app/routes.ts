import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./pages/SplashScreen";
import { PermissionsScreen } from "./pages/PermissionsScreen";
import { MainLayout } from "./layouts/MainLayout";
import { ChatPage } from "./pages/ChatPage";
import { SummaryPage } from "./pages/SummaryPage";
import { StorePage } from "./pages/StorePage";
import { SettingsPage } from "./pages/SettingsPage";
import { CartPage } from "./pages/CartPage";
import { ClinicDetailPage } from "./pages/ClinicDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/permissions",
    Component: PermissionsScreen,
  },
  {
    path: "/settings",
    Component: SettingsPage,
  },
  {
    path: "/app/settings",
    Component: SettingsPage,
  },
  {
    path: "/cart",
    Component: CartPage,
  },
  {
    path: "/clinic/:clinicId",
    Component: ClinicDetailPage,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      {
        path: "chat",
        Component: ChatPage,
      },
      {
        path: "summary",
        Component: SummaryPage,
      },
      {
        path: "store",
        Component: StorePage,
      },
    ],
  },
]);