import React from 'react'

const PageTopInfo = ({pageTitle, pageDescription}) => {
  return (
    <div className="TopInfo-Container">
    <h1>
      {pageTitle}
    </h1>
    <p>
      {pageDescription}
    </p>
  </div>
  )
}

export default PageTopInfo