import { ModuleTree } from "vuex";
import { IRootState } from "@/store/modules/root/root.types";
import auth from "@/store/modules/auth";
import users from "@/store/modules/users";

const modules: ModuleTree<IRootState> = { auth, users };

export default modules;
