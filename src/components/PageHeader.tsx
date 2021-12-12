import React from 'react';

interface Props {
  title: string;
  lines?: string[];
}

function PageHeader(props: Props) {
  const { title, lines } = props;

  return <div className="page-header">
    <h2>{ title }</h2>
    {
      lines?.map(line => 
        <small>{ line }</small> 
      )
    }
  </div>
}

export default PageHeader;