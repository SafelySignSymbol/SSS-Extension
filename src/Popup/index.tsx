import React, { useEffect, useState } from 'react'

import { getActiveAccount } from '../_general/lib/Storage'

type PopupStatus = 'LOGIN' | 'MAIN'

const Popup: React.VFC = () => {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<PopupStatus>('LOGIN')
  useEffect(() => {
    getActiveAccount().then((acc) => {
      setTitle(acc.address)
    })
  }, [])

  return (
    <div style={{ width: '600px' }}>
      <div>{title}</div>
    </div>
  )
}

export default Popup
