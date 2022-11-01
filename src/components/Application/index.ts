import { withInstall } from "@/utils";

import appProvider from "./src/AppProvider.vue";
import appLogo from "./src/AppLogo.vue";
import appLocalePicker from "./src/AppLocalePicker.vue";

export { useAppProviderContext } from "./src/useAppContext";

export const AppProvider = withInstall(appProvider);
export const AppLocalePicker = withInstall(appLocalePicker);
export const AppLogo = withInstall(appLogo);
