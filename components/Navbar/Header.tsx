"use client";
import { Group, Burger, Button, Menu, Avatar } from "@mantine/core";
import MantineLogo from "../../public/android-chrome-192x192.png";
import classes from "./Header.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const links = [
  { link: "/", label: "Home" },
  { link: "/maps", label: "Maps" },
  { link: "/weather", label: "Weather" },
];

const Header = () => {
  const [opened, setOpened] = useState(false);
  const { status, data: session } = useSession();
  const image = session?.user?.image;

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
            {status === "authenticated" ? (
              <Menu>
                <Menu.Target>
                  <Avatar src={image} className={classes.Avatar} />
                </Menu.Target>
                <Menu.Dropdown>
                  <Link href="/api/auth/signout">
                    <Button>Sign out</Button>
                  </Link>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Link href="/api/auth/signin">
                <Button>Sign in</Button>
              </Link>
            )}
          </Group>
        </Group>
      </div>
    </header>
  );
};

export default Header;
