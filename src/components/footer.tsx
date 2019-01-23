import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
  width: 100%;
  text-align: center;
  min-height: 3rem;
  background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  bottom: 0;
`

export default () => (
  <Footer>
    <div>
      © {new Date().getFullYear()}, Built by
      {` `}
      <a href="https://github.com/hitochan777">hitochan777</a> with love♡
    </div>
  </Footer>
)
