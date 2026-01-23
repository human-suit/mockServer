import { Waybill } from "./model";
import { UuidEntityStore } from "../../core/entityStore";
import { waybillSeed } from "./seed";

export const waybillStore = new UuidEntityStore<Waybill>(waybillSeed);
