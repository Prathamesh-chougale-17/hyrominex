"use client";
import { Group, Burger } from "@mantine/core";
import MantineLogo from "../../public/android-chrome-192x192.png";
import classes from "./Header.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const links = [
  { link: "/", label: "Home" },
  { link: "/maps", label: "Maps" },
  { link: "/weather", label: "Weather" },
];

const Header = () => {
  const [opened, setOpened] = useState(false);

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          {/* <MantineLogo size={28} /> */}
          <Image src={MantineLogo} alt="Mantine Logo" width={40} height={40} />
        </Group>

        <Group>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
            hiddenFrom="sm"
          />
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {links.map((link) => (
              <Link key={link.label} href={link.link} className={classes.link}>
                {link.label}
              </Link>
            ))}
          </Group>
        </Group>
      </div>
    </header>
  );
};

export default Header;
