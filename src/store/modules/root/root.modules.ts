import { ModuleTree } from "vuex";
import { IRootState } from "@/store/modules/root/root.types";
import auth from "@/store/modules/auth";

const modules: ModuleTree<IRootState> = { auth };

export default modules;
