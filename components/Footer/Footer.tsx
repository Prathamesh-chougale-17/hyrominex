import { Text, Container, ActionIcon, Group, rem } from "@mantine/core";
import { YoutubeIcon, InstagramIcon, Twitter } from "lucide-react";
// import HydroMinex from "../../public/android-chrome-192x192.png";
import classes from "./FooterLinks.module.css";
import Image from "next/image";
import Link from "next/link";

const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

export function FooterLinks() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          {/* <Image
            src={HydroMinex}
            alt="HydroMinex Logo"
            width={40}
            height={40}
          /> */}
          <Text size="xs" c="dimmed" className={classes.description}>
            Build fully to avoid the Accident at Heights
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          &#169; 2023 HydroMinex | All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Link
              href="https://www.youtube.com/channel/UCdojH6e-M_89K8GKshE-qfA"
              target="_blank"
            >
              <YoutubeIcon scale={2} />
            </Link>
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Link href="https://twitter.com/HydroMinex" target="_blank">
              <Twitter scale={2} />
            </Link>
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Link href="https://www.instagram.com/hydrominex/" target="_blank">
              <InstagramIcon scale={2} />
            </Link>
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
