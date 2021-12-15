interface Props {
  chars: number;
}

export default function LoadingText(props: Props) {
  return <div>
    <div className="loading-text">
      {
        Array.from(Array(props.chars).keys()).join()
      }
    </div>
  </div>;
}