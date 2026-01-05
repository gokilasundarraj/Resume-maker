import React from "react";
import "./App.css";
import logo from './img/logo.png'

export default function Loading() {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
        <div className="platform" aria-hidden="true">
       
        <div className="stack" aria-hidden="true">
          <div
            className="sheet"
            style={{ "--tx": "-7px", "--ty": "-10px", "--tz": "-18px" }}
          ></div>
          <div
            className="sheet"
            style={{ "--tx": "-3px", "--ty": "-6px", "--tz": "-8px" }}
          ></div>
          <div
            className="sheet"
            style={{ "--tx": "0px", "--ty": "0px", "--tz": "0px" }}
          ></div>
        </div>

        <div className="logo">
          <div className="glow" aria-hidden="true"></div>

         <img src={logo} alt="logo"/>
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="rgba(255,255,255,0.18)" />
                <stop offset="0.2" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="0.6" stopColor="rgba(0,0,0,0.06)" />
                <stop offset="1" stopColor="rgba(0,0,0,0.12)" />
              </linearGradient>
              <linearGradient id="accent" x1="0" x2="1">
                <stop offset="0" stopColor="rgba(245,42,75,1)" />
                <stop offset="1" stopColor="rgba(200,32,60,1)" />
              </linearGradient>
              <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow
                  dx="0"
                  dy="18"
                  stdDeviation="22"
                  floodColor="#000"
                  floodOpacity="0.7"
                />
              </filter>
            </defs>

            <g transform="translate(10,8) scale(0.88)">
              <path
                d="M32 12 h42 a26 28 0 0 1 26 28 v4 a26 28 0 0 1 -26 28 h-12 l-22 36 v-96z"
                fill="rgba(0,0,0,0.42)"
                transform="translate(6,10) rotate(5)"
              />
              <path
                className="r-shape"
                d="M36 12 h40 a22 24 0 0 1 22 24 v1 a22 24 0 0 1 -22 24 h-12 l-20 34 v-83z"
                fill="url(#accent)"
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="1.5"
                filter="url(#softShadow)"
              />
              <path
                d="M36 12 h40 a22 24 0 0 1 22 24 v1 a22 24 0 0 1 -22 24 h-12 l-20 34 v-83z"
                fill="url(#g1)"
                style={{ mixBlendMode: "overlay", opacity: 0.5 }}
              />
              <path
                d="M66 38 a10 10 0 1 0 0 20 h-8 v-20z"
                fill="rgba(0,0,0,0.18)"
              />
            </g>

          <div className="shine" aria-hidden="true"></div>
        </div>

        <div className="ring" aria-hidden="true">
          <div className="dots" role="img" aria-label="Loading">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>

      <div className="brand" aria-hidden="true">
        <h1>Resume Maker</h1>
        <p className="hint">Preparing your templates — almost ready</p>
      </div>
      
    </div>
  );
}
