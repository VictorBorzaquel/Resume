interface ChangeImageProps {
  viewableItems: Array<ViewToken>;
  changed: Array<ViewToken>;
}

interface ImageUrlProps {
  id: string;
  photo: string;
}

interface Props {
  imageUrl: ImageUrlProps[];
}

export function ImageSlider({ imageUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChange = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  })

  return (
    <Container>
      <ImageIndexes>
        {
          imageUrl.map((item, index) => (
            <Bullet key={String(item.id)} active={index === imageIndex} />
          ))
        }
      </ImageIndexes>

      <FlatList
        onViewableItemsChanged={indexChange.current}
      />
    </Container>
  );
}
