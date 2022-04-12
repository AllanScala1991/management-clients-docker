import { ChanceRandom } from "src/adapters/chance/main";
import { IRandom } from "src/interfaces/IRandom";

class Random implements IRandom {
    constructor(
        private readonly adapter: IRandom = new ChanceRandom()
    ){}

    generateName(): string {
        return this.adapter.generateName()
    }
    generateEmail(): string {
        return this.adapter.generateEmail()
    }
}

export default new Random()