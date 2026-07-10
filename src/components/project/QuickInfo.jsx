import './QuickInfo.css'

const QuickInfo = ({ facts, image, imageAlt, children }) => {
  return (
    <div className="QuickInfo-Container">
      <div className="QuickInfo-Description">
        <div className="QuickInfo-Facts">
          {Object.entries(facts).map(([label, value]) => (
            <p key={label}>
              <strong className="QuickInfo-FactLabel">{label}</strong>: {value}
            </p>
          ))}
        </div>
        <p>{children}</p>
      </div>

      <img src={image} alt={imageAlt} />
    </div>
  )
}

export default QuickInfo
