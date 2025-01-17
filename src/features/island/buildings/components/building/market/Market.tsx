import React from "react";

import market from "assets/buildings/market.png";
import betty from "assets/npcs/betty.gif";

import { PIXEL_SCALE } from "features/game/lib/constants";
import { Modal } from "react-bootstrap";
import { ShopItems } from "./ShopItems";
import { DynamicNFT } from "features/bumpkins/components/DynamicNFT";

export const Market: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <img
        src={market}
        style={{
          width: `${PIXEL_SCALE * 48}px`,
        }}
        className="cursor-pointer hover:img-highlight"
        onClick={handleClick}
      />
      <img
        src={betty}
        className="absolute right-4 top-14 pointer-events-none"
        style={{
          width: `${PIXEL_SCALE * 16}px`,
          transform: "scaleX(-1)",
        }}
      />
      <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
        <div className="absolute w-1/2 -left-2 top-[-40%] -z-10">
          <DynamicNFT
            bumpkinParts={{
              body: "Beige Farmer Potion",
              hair: "Rancher Hair",
              pants: "Farmer Overalls",
              shirt: "Red Farmer Shirt",
              tool: "Farmer Pitchfork",
              background: "Farm Background",
              shoes: "Black Farmer Boots",
            }}
          />
        </div>
        <ShopItems onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};
