"use client";
import { Group, Burger } from "@mantine/core";
import MantineLogo from "../../public/android-chrome-192x192.png";
import classes from "./Header.module.css";
import Image from "next/image";
import { useState } from "react";

const links = [
  { link: "/", label: "Home" },
  { link: "/maps", label: "Maps" },
  { link: "/weather", label: "Weather" },
];

const Header = () => {
  const [opened, setOpened] = useState(false);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          {/* <MantineLogo size={28} /> */}
          <Image src={MantineLogo} alt="Mantine Logo" width={28} height={28} />
        </Group>

        <Group>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
            hiddenFrom="sm"
          />
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
        </Group>
      </div>
    </header>
  );
};

export default Header;
