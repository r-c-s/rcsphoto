interface Props {
  title: string;
  subtitles?: string[];
}

function PageHeader(props: Props) {
  const { title, subtitles } = props;

  return <div className="page-header">
    <h2>{ title }</h2>
    {
      subtitles?.map(line => 
        <small>{ line }</small> 
      )
    }
  </div>
}

export default PageHeader;