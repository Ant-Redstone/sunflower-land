import { CONFIG } from "lib/config";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import BumpkinDetailsABI from "./abis/BumpkinDetails.json";
import { metamask } from "./metamask";
import { BumpkinDetails as IBumpkinDetails } from "./types/BumpkinDetails";

const address = CONFIG.BUMPKIN_DETAILS_CONTRACT;

export type OnChainBumpkin = {
  tokenId: string;
  tokenURI: string;
  owner: string;
  createdAt: string;
  createdBy: string;
  nonce: string;
  metadata: string;
  wardrobe: string;
};

/*
 * Bumpkin details contract
 */
export class BumpkinDetails {
  private web3: Web3;
  private account: string;

  private contract: IBumpkinDetails | null;

  constructor(web3: Web3, account: string) {
    this.web3 = web3;
    this.account = account;

    if (CONFIG.NETWORK === "mainnet") {
      this.contract = null;
      return;
    }

    this.contract = new this.web3.eth.Contract(
      BumpkinDetailsABI as AbiItem[],
      address as string
    ) as unknown as IBumpkinDetails;
  }

  public async loadBumpkins(): Promise<OnChainBumpkin[]> {
    console.log("load");
    if (!this.contract) {
      return [];
    }

    return this.contract.methods
      .loadBumpkins(metamask.myAccount as string)
      .call({ from: this.account });
  }
}
