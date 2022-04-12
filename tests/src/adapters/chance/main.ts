import { IRandom } from "src/interfaces/IRandom";
import { Chance } from "chance"

export class ChanceRandom implements IRandom {
    generateName(): string {
        return Chance().name()
    }

    generateEmail(): string {
        return Chance().email()
    }
    
}