import React, { useContext, useState } from "react";
import classNames from "classnames";

import token from "assets/icons/token.png";
import timer from "assets/icons/timer.png";

import { Box } from "components/ui/Box";
import { OuterPanel } from "components/ui/Panel";
import { Button } from "components/ui/Button";

import { secondsToString } from "lib/utils/time";

import { Context, InventoryItemName } from "features/game/GameProvider";
import { Craftable } from "features/game/events/craft";

import { Crop, CropName, CROPS, SEEDS } from "../lib/crops";

interface Props {}

export const Seeds: React.FC<Props> = ({}) => {
  const [selected, setSelected] = useState<Craftable>(SEEDS["Sunflower Seed"]);

  const { state, dispatcher, shortcutItem } = useContext(Context);
  const inventory = state.inventory;

  const hasFunds = state.balance >= selected.price;

  const buy = () => {
    dispatcher({
      type: "item.crafted",
      item: selected.name,
    });

    shortcutItem(selected.name);
  };

  const cropName = selected.name.split(" ")[0] as CropName;
  const crop = CROPS[cropName];

  const Action = () => {
    const isLocked = selected.requires && !inventory[selected.requires];
    if (isLocked) {
      return <span className="text-xs mt-1 text-shadow">Locked</span>;
    }

    return (
      <Button disabled={!hasFunds} className="text-xs mt-1" onClick={buy}>
        Buy
      </Button>
    );
  };

  return (
    <div className="flex">
      <div className="w-3/5 flex flex-wrap h-fit">
        {Object.values(SEEDS).map((item: Craftable) => (
          <Box
            isSelected={selected.name === item.name}
            key={item.name}
            onClick={() => setSelected(item)}
            image={item.image}
            count={inventory[item.name]}
          />
        ))}
      </div>
      <OuterPanel className="flex-1 w-1/3">
        <div className="flex flex-col justify-center items-center p-2 ">
          <span className="text-base text-shadow text-center">{`${selected.name} Seed`}</span>
          <img
            src={selected.image}
            className="w-12 img-highlight mt-1"
            alt={selected.name}
          />
          <div className="border-t border-white w-full mt-2 pt-1">
            <div className="flex justify-center items-end">
              <img src={timer} className="h-5 me-2" />
              <span className="text-xs text-shadow text-center mt-2 ">
                {secondsToString(crop.harvestSeconds)}
              </span>
            </div>
            <div className="flex justify-center items-end">
              <img src={token} className="h-5 mr-1" />
              <span
                className={classNames("text-xs text-shadow text-center mt-2 ", {
                  "text-red-500": !hasFunds,
                })}
              >
                {`$${selected.price}`}
              </span>
            </div>
          </div>
          {Action()}
        </div>
      </OuterPanel>
    </div>
  );
};