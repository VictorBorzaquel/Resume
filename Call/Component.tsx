interface Props {
  name: string;
  icon: React.FC<SvgProps>
}

function Accessory({ icon: Icon }: Props) {
  return (
    <Icon
      width={30}
      height={30}
    />
  );
}