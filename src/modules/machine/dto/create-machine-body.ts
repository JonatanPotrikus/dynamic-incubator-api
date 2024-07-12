import { MachineTypes } from "src/shared/enums/machine-types";

export class CreateMachineDto {
  name: string;
  ip: string;
  type: MachineTypes;
}
