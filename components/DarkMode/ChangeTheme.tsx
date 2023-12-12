import cx from "clsx";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
} from "@mantine/core";
import { SunIcon, MoonIcon } from "lucide-react";
import classes from "./ActionToggle.module.css";

const ActionToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      >
        <SunIcon className={cx(classes.icon, classes.light)} />
        <MoonIcon className={cx(classes.icon, classes.dark)} />
      </ActionIcon>
    </Group>
  );
};

export default ActionToggle;
