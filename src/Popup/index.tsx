import React, { useEffect, useState } from 'react'

import { Account, NetworkType } from 'symbol-sdk'

const Popup: React.VFC = () => {
  const [title, setTitle] = useState('')

  useEffect(() => {
    const acc = Account.createFromPrivateKey(
      'A060A9D4A1D45395004C7CDF533B88B54343EE4AEA902103CDCFE63EB3742D56',
      NetworkType.TEST_NET
    )

    setTitle(acc.address.plain())
  }, [])

  return (
    <div style={{ width: '600px' }}>
      <div>{title}</div>
    </div>
  )
}

export default Popup
