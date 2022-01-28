import React, { useRef } from 'react'

import Presenter from './Presenter'

const Options: React.VFC = () => {
  const addressRef = useRef<HTMLInputElement>(null)
  const priKeyRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  return (
    <Presenter
      addressRef={addressRef}
      priKeyRef={priKeyRef}
      passRef={passRef}
    />
  )
}

export default Options
