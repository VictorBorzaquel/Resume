interface Props {
  children?: JSX.Element | JSX.Element[];
}

function Footer({ children }: Props) {
  return (
    <Container>
      {children}
    </Container>
  );
}