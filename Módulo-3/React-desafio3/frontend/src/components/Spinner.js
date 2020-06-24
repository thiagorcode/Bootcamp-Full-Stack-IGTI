import React from 'react'

export default function Spinner({ description }) {
  return (
    <div>
      <div className="preloader-wrapper active">
        <div className="spinner-layer spinner-red-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <dir>{description}</dir>
    </div>
  )
}
