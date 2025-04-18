import React from 'react'

const PageTopInfo = ({PageTitle, PageDescription, ShowLocation}) => {
  return (
    <header className="TopInfo-Container" style={{paddingBottom: ShowLocation ? "48px" : "0px"}}>
      <div className="TopInfo-TitleDescrip">
        <h1>{PageTitle}</h1>
        {/* Conditionally render it for reusability across pages */}
        {PageDescription && <h2 style={{paddingTop:'48px'}}>{PageDescription}</h2>}
      </div>

    {/* Divider for header */}
      <div className="TopInfo-LocationDivider">
        {ShowLocation ?  (
          <>
            <div className="TopInfo-MiniGroup">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#4CE6A6" viewBox="0 0 256 256" aria-label="Location Marker Icon">
                <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
              </svg>
              <p>California, United States</p>
            </div>
            <hr className="MiniGroup-Divider"/>
          </>
        ) : (
          null
        )}
      </div>
    </header>
  )
}

export default PageTopInfo