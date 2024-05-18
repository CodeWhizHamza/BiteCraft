import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import Icon from "./Icon";

export default function AccordionWithCustomIcon() {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <div className="mb-2">
        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="py-3 px-4 bg-gray-100 dark:bg-gray-700 cursor-pointer"
          >
            What is KitchenKonnect?
          </AccordionHeader>
          {open === 1 && (
            <AccordionBody className="p-4">
              KitchenKonnect is your one-stop shop for delicious, home-cooked
              meals delivered straight to your door. We use fresh, seasonal
              ingredients to create a variety of dishes that cater to all
              palates.
            </AccordionBody>
          )}
        </Accordion>
      </div>

      <div className="mb-2">
        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            className="py-3 px-4 bg-gray-100 dark:bg-gray-700 cursor-pointer"
          >
            How does KitchenKonnect work?
          </AccordionHeader>
          {open === 2 && (
            <AccordionBody className="p-4">
              Ordering from KitchenKonnect is simple! Just browse our rotating
              menu online, choose your desired meals, select your delivery time,
              and checkout. We&apos;ll take care of the rest, preparing your
              food with love and delivering it fresh to your doorstep.
            </AccordionBody>
          )}
        </Accordion>
      </div>

      <div className="mb-2">
        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(3)}
            className="py-3 px-4 bg-gray-100 dark:bg-gray-700 cursor-pointer"
          >
            What are the benefits of using KitchenKonnect?
          </AccordionHeader>
          {open === 3 && (
            <AccordionBody className="p-4">
              KitchenKonnect offers several benefits:
              <ul className="list-disc pl-4 mt-2">
                <li>
                  Enjoy delicious, home-cooked meals without the hassle of
                  cooking.
                </li>
                <li>
                  Discover new flavors and cuisines from the comfort of your
                  home.
                </li>
                <li>
                  Save time and energy by having your food delivered fresh and
                  ready to eat.
                </li>
              </ul>
            </AccordionBody>
          )}
        </Accordion>
      </div>

      <div className="mb-2">
        <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
          <AccordionHeader
            onClick={() => handleOpen(4)}
            className="py-3 px-4 bg-gray-100 dark:bg-gray-700 cursor-pointer"
          >
            Why KitchenKonnect?
          </AccordionHeader>
          {open === 4 && (
            <AccordionBody className="p-4">
              There are many reasons to choose KitchenKonnect for your
              home-cooked meals:
              <ul className="list-disc pl-4 mt-2">
                <li>
                  Taste the love: We use fresh, high-quality ingredients and
                  traditional cooking methods to create dishes that taste like
                  homemade.
                </li>
                <li>
                  Variety and convenience: Enjoy a wide selection of cuisines
                  and dishes, all delivered conveniently to your doorstep.
                </li>
                <li>
                  Save time and effort: Skip the grocery shopping, cooking, and
                  cleaning. We take care of everything so you can relax and
                  enjoy a delicious meal.
                </li>
              </ul>
            </AccordionBody>
          )}
        </Accordion>
      </div>
    </>
  );
}
