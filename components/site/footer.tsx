import { Section, Container } from "@/components/ds";

export const Footer = () => {
  return (
    <footer>
      <Section>
        <Container className="text-muted-foreground flex justify-start gap-2 sm:gap-4 items-center">
          <p>&copy; {new Date().getFullYear()}</p>
        </Container>
      </Section>
    </footer>
  );
};
