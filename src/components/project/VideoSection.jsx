import './VideoSection.css'

const VideoSection = ({ src }) => {
  return (
    <div className="VideoSection">
      <video controls width="100%" muted>
        <source src={src} type="video/mp4" />
        {/* Fallback if video doesnt load */}
        Your browser does not support video tag.
      </video>
    </div>
  )
}

export default VideoSection
