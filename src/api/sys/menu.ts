import { defHttp } from "@/utils/http/axios";
import { getMenuListResultModel } from "./model/menuModel";

enum Api {
  GetMenuList = "/getMenuList",
}

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};
