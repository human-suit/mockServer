import { EntityStore } from "../../core/entityStore";
import { Waybill } from "./model";
import { waybillSeed } from "./seed";

export const waybillStore = new EntityStore<Waybill>(waybillSeed);
