import LoadingText from "./LoadingText";

interface Props {
  title: string;
  subtitle: string;
}

function PageHeader(props: Props) {
  const { title, subtitle } = props;

  return <div className="page-header">
    <h2>
      { title }
      { !title && <LoadingText chars={10}/> }
    </h2>
    <small>
      { subtitle }
      { !subtitle && <LoadingText chars={10}/> }
    </small>
  </div>
}

export default PageHeader;