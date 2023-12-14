"use client";
import { Title, Text, Button, Container, Group } from "@mantine/core";
import classes from "./ServerError.module.css";

interface Props {
  error: Error;
  reset: () => void;
}
const ServerError = ({ error, reset }: Props) => {
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text size="lg" ta="center" className={classes.description}>
          Our servers could not handle your request. Don&apos;t worry, our
          development team was already notified. Try refreshing the page.
          <br />
          {error.message}
        </Text>
        <Group justify="center">
          <Button variant="white" size="md" onClick={() => reset()}>
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
};

export default ServerError;
