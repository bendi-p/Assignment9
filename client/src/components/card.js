import React from 'react'

function Card({title, description, titleClass, descClass, style}) {
  return (
    <div className="row g-0 d-flex align-items-center justify-content-center" style={style}>
      <div className="col-6 bg-dark text-white p-3 rounded">
        <div className={titleClass}>
          {title}
        </div>
        <div className={descClass}>
          {description}
        </div>
      </div>
    </div>
  )
}

export default Card;