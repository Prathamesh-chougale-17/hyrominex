"use client";
import { Autocomplete, Group, Burger, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { IconSearch } from "@tabler/icons-react";
// import { MantineLogo } from "@mantinex/mantine-logo";
import MantineLogo from "../../public/android-chrome-192x192.png";
import classes from "./Header.module.css";
import Image from "next/image";
import { useState } from "react";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
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
          {/* <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
            visibleFrom="xs"
          /> */}
        </Group>
      </div>
    </header>
  );
};

export default Header;
