"use client";
import { Group, Burger, Button, Menu, Avatar } from "@mantine/core";
// import MantineLogo from "../../public/android-chrome-192x192.png";
import classes from "./Header.module.css";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ActionToggle from "../DarkMode/ChangeTheme";

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
          <Link href="/">
            {/* <Image
              src={MantineLogo}
              alt="HyroMinex Logo"
              width={60}
              height={60}
              className={classes.logo}
              priority
            /> */}
          </Link>
        </Group>

        <Group>
          <Group hiddenFrom="sm">
            <Menu>
              <Menu.Target>
                <Burger
                  opened={opened}
                  onClick={() => setOpened(!opened)}
                  size="sm"
                  hiddenFrom="sm"
                />
              </Menu.Target>
              <Menu.Dropdown>
                {links.map((link) => (
                  <Menu.Item key={link.label}>
                    <Link
                      className={classes.Dropdown}
                      href={link.link}
                      onClick={() => setOpened(!opened)}
                    >
                      {link.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
            <ActionToggle />
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
                <Button fullWidth>Sign in</Button>
              </Link>
            )}
          </Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {links.map((link) => (
              <Link key={link.label} href={link.link} className={classes.link}>
                {link.label}
              </Link>
            ))}
            <ActionToggle />
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
